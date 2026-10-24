import nodemailer from "nodemailer";
import { activities } from "./activities";
import { site } from "./site";
import type { ProposalValues } from "./validation";

export function mailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.TO_EMAIL,
  );
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function buildHtml(rows: [string, string][], details: string, v: ProposalValues) {
  const rowHtml = rows
    .map(([label, value], i) => {
      const border = i === rows.length - 1 ? "" : "border-bottom:1px solid #eee6dd;";
      return `<tr>
        <td style="padding:14px 0;${border}width:36%;vertical-align:top;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8a7a6b;">${escapeHtml(label)}</td>
        <td style="padding:14px 0;${border}vertical-align:top;font-size:16px;color:#1f2733;">${value}</td>
      </tr>`;
    })
    .join("");

  const detailsHtml = details
    ? escapeHtml(details).replace(/\r?\n/g, "<br>")
    : `<span style="color:#8a7a6b;">No additional requirements provided.</span>`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4efe9;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#1f2733;padding:28px 32px;">
            <div style="font-size:12px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#e6a46d;">${escapeHtml(site.name)}</div>
            <div style="margin-top:8px;font-size:24px;font-weight:600;color:#ffffff;">New proposal request</div>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 32px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowHtml}</table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 8px;">
            <div style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8a7a6b;">Additional event requirements</div>
            <div style="margin-top:10px;padding:16px 18px;background:#faf6f1;border-left:3px solid #a85a24;font-size:15px;line-height:1.6;color:#1f2733;">${detailsHtml}</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:28px 32px 32px;">
            <a href="mailto:${encodeURIComponent(v.email)}?subject=${encodeURIComponent(`Your proposal request, ${site.name}`)}"
               style="display:inline-block;background:#a85a24;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:6px;">Reply to ${escapeHtml(v.fullName)}</a>
          </td>
        </tr>
      </table>
      <div style="max-width:600px;padding:16px 12px 0;font-size:12px;color:#8a7a6b;text-align:center;">Sent from the request form at ${escapeHtml(site.url)}</div>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendProposalEmail(v: ProposalValues) {
  const experience =
    activities.find((a) => a.slug === v.experience)?.title ?? "Not sure yet / combination";

  const plainRows: [string, string][] = [
    ["Name", v.fullName],
    ["Email", v.email],
    ["Company", v.company],
    ["Group size", v.groupSize],
    ["Experience", experience],
  ];

  const text = [
    ...plainRows.map(([l, val]) => `${l}: ${val}`),
    "",
    "Additional event requirements:",
    v.details || "(none)",
  ].join("\n");

  const htmlRows: [string, string][] = [
    ["Name", escapeHtml(v.fullName)],
    ["Email", `<a href="mailto:${encodeURIComponent(v.email)}" style="color:#a85a24;text-decoration:none;">${escapeHtml(v.email)}</a>`],
    ["Company", escapeHtml(v.company)],
    ["Group size", escapeHtml(v.groupSize)],
    ["Experience", escapeHtml(experience)],
  ];

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transport.sendMail({
    from: process.env.SMTP_FROM ?? `${site.name} <${process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL,
    replyTo: { name: v.fullName.replace(/[\r\n"<>]/g, " "), address: v.email },
    subject: `New proposal request: ${v.company} (${v.groupSize})`.replace(/[\r\n]/g, " "),
    text,
    html: buildHtml(htmlRows, v.details, v),
  });
}
