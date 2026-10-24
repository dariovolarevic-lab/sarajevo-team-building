import { NextResponse } from "next/server";
import { mailConfigured, sendProposalEmail } from "@/lib/mailer";
import { site } from "@/lib/site";
import { validateProposal } from "@/lib/validation";

export const runtime = "nodejs";

// In-memory limiter: resets on restart and is per instance. Use a shared store at scale.
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 3;
const MAX_TRACKED_IPS = 5000;
const MAX_BODY_CHARS = 20_000;

const SPAM_KEYWORDS = [
  "casino", "viagra", "cialis", "crypto", "bitcoin", "ethereum",
  "forex", "loan", "prize", "winner", "click here", "buy now",
  "free money", "make money", "work from home", "seo service",
  "link building", "backlink", "unsecured credit", "weight loss",
  "diet pill", "enlargement", "adult", "xxx",
];

function limited(ip: string) {
  const now = Date.now();
  if (hits.size >= MAX_TRACKED_IPS && !hits.has(ip)) {
    for (const [key, entry] of hits) {
      if (now >= entry.resetAt) hits.delete(key);
    }
    if (hits.size >= MAX_TRACKED_IPS) {
      const oldestIp = hits.keys().next().value;
      if (oldestIp !== undefined) hits.delete(oldestIp);
    }
  }
  const entry = hits.get(ip);
  if (!entry || now >= entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_HITS) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_CHARS) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success and drop the request.
  if (typeof body._hp === "string" && body._hp.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = validateProposal(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the required fields and try again.", fields: errors },
      { status: 400 },
    );
  }

  const combined = `${values.fullName} ${values.company} ${values.details}`.toLowerCase();
  if (SPAM_KEYWORDS.some((keyword) => combined.includes(keyword))) {
    return NextResponse.json(
      { error: "Your request was rejected by the spam filter. Please review it and try again." },
      { status: 400 },
    );
  }

  const urlCount = values.details.match(/https?:\/\//gi)?.length ?? 0;
  if (urlCount > 2) {
    return NextResponse.json(
      { error: "Your request contains too many links." },
      { status: 400 },
    );
  }

  // Rate-limit only valid, non-spam requests so typos do not use up the user's allowance.
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before sending again." },
      { status: 429 },
    );
  }

  if (!mailConfigured()) {
    console.error("SMTP configuration is incomplete; proposal request not delivered.");
    return NextResponse.json(
      {
        error: `We could not send your request right now. Please email us at ${site.email}.`,
        debug: `config missing: host=${!!process.env.SMTP_HOST} user=${!!process.env.SMTP_USER} pass=${!!process.env.SMTP_PASS}`, // TEMP diagnostic, remove
      },
      { status: 500 },
    );
  }

  try {
    await sendProposalEmail(values);
  } catch (err) {
    console.error("Failed to send proposal email", err);
    const e = err as { code?: string; message?: string };
    return NextResponse.json(
      {
        error: `We could not send your request right now. Please email us at ${site.email}.`,
        debug: `${e.code ?? "ERR"}: ${e.message ?? String(err)}`, // TEMP diagnostic, remove
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
