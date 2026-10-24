"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { activities } from "@/lib/activities";
import { groupSizes } from "@/lib/site";
import {
  validateProposal,
  type ProposalErrors,
  type ProposalField,
} from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

const base =
  "mt-2 block w-full rounded-sm border bg-white/70 px-4 py-3 text-charcoal shadow-sm transition-all duration-300 ease-in-out placeholder:text-charcoal/35 hover:border-charcoal/40 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:shadow-lg focus:shadow-ember/10";
const ok = "border-charcoal/20 focus:border-ember focus:ring-ember/20";
const bad = "border-ember-dark bg-ember/[0.04] focus:border-ember-dark focus:ring-ember-dark/20";
const label = "block text-sm font-semibold text-slate-deep";
const select =
  "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%2316233a' stroke-width='1.5'/%3E%3C/svg%3E\")] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-ember-dark">
      {message}
    </p>
  );
}

export default function ProposalForm() {
  const defaultExperience = useSearchParams().get("experience") ?? undefined;
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<ProposalErrors>({});
  const [count, setCount] = useState(0);
  const thanksRef = useRef<HTMLDivElement>(null);

  const initial = activities.some((a) => a.slug === defaultExperience) ? defaultExperience : "";

  useEffect(() => {
    if (status === "sent") thanksRef.current?.focus();
  }, [status]);

  const cls = (f: ProposalField, extra = "") => `${base} ${errors[f] ? bad : ok} ${extra}`;
  const aria = (f: ProposalField) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${f}-error` : undefined,
  });

  function clear(f: ProposalField) {
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const { errors: found } = validateProposal(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={thanksRef}
        tabIndex={-1}
        role="status"
        className="border-l-4 border-ember bg-white p-8 shadow-2xl shadow-slate-deep/10 outline-none sm:p-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Request received</p>
        <h2 className="mt-3 font-display text-3xl text-slate-deep">Thank you. A planner will be in touch.</h2>
        <p className="mt-4 leading-relaxed text-charcoal-soft">
          Your inquiry has been received. A planner will review your group
          size, objectives and itinerary, and you will receive a customized
          proposal tailored to your event requirements. If your dates are
          tight, email us and we will start straight away.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-white shadow-2xl shadow-slate-deep/15 ring-1 ring-charcoal/5"
    >
      <div className="border-b border-white/10 bg-slate-deep px-7 py-7 text-white sm:px-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-white/95">Corporate booking request</h2>
        <ul className="mt-3 flex flex-col gap-1.5 text-sm text-white/70 sm:flex-row sm:gap-6">
          <li><span className="text-ember-light">✓</span> Customized proposal for your event</li>
          <li><span className="text-ember-light">✓</span> Itemised per-participant pricing</li>
          <li><span className="text-ember-light">✓</span> No obligation</li>
        </ul>
      </div>

      <div className="p-7 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={label}>Full name <span className="text-ember">*</span></label>
            <input id="fullName" name="fullName" autoComplete="name" maxLength={100} onChange={() => clear("fullName")} className={cls("fullName")} {...aria("fullName")} />
            <FieldError id="fullName-error" message={errors.fullName} />
          </div>
          <div>
            <label htmlFor="email" className={label}>Work email <span className="text-ember">*</span></label>
            <input id="email" name="email" type="email" autoComplete="email" inputMode="email" onChange={() => clear("email")} className={cls("email")} {...aria("email")} />
            <FieldError id="email-error" message={errors.email} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className={label}>Company name <span className="text-ember">*</span></label>
            <input id="company" name="company" autoComplete="organization" onChange={() => clear("company")} className={cls("company")} {...aria("company")} />
            <FieldError id="company-error" message={errors.company} />
          </div>
          <div>
            <label htmlFor="groupSize" className={label}>Estimated group size <span className="text-ember">*</span></label>
            <select id="groupSize" name="groupSize" defaultValue="" onChange={() => clear("groupSize")} className={cls("groupSize", select)} {...aria("groupSize")}>
              <option value="" disabled>Select a range</option>
              {groupSizes.map((g) => (<option key={g} value={g}>{g}</option>))}
            </select>
            <FieldError id="groupSize-error" message={errors.groupSize} />
          </div>
          <div>
            <label htmlFor="experience" className={label}>Preferred experience <span className="text-ember">*</span></label>
            <select id="experience" name="experience" defaultValue={initial} onChange={() => clear("experience")} className={cls("experience", select)} {...aria("experience")}>
              <option value="" disabled>Select an experience</option>
              {activities.map((a) => (<option key={a.slug} value={a.slug}>{a.title}</option>))}
              <option value="combination">A combination, or not sure yet</option>
            </select>
            <FieldError id="experience-error" message={errors.experience} />
          </div>
          <div className="sm:col-span-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor="details" className={label}>Additional event requirements</label>
              <span className="text-xs text-charcoal-soft/70">Optional</span>
            </div>
            <textarea
              id="details"
              name="details"
              rows={5}
              maxLength={3000}
              onChange={(e) => { setCount(e.target.value.length); clear("details"); }}
              placeholder="Dates or date range, your existing itinerary and any fixed start and end times, dietary needs, languages, accessibility, your goals for the session."
              className={cls("details", "resize-y")}
              {...aria("details")}
            />
            <div className="flex justify-between">
              <FieldError id="details-error" message={errors.details} />
              <span className="ml-auto mt-1.5 text-xs text-charcoal-soft/60">{count} / 3000</span>
            </div>
          </div>

          {/* Honeypot for bots; hidden from people and assistive tech */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label htmlFor="_hp">Website</label>
            <input id="_hp" name="_hp" tabIndex={-1} autoComplete="off" />
          </div>
        </div>

        {status === "error" && (
          <p role="alert" className="mt-6 border-l-4 border-ember-dark bg-ember/5 px-4 py-3 text-sm font-medium text-ember-dark">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ember px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-ember/25 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-ember-dark hover:shadow-xl hover:shadow-ember/40 focus-visible:outline-slate-deep disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              Request a Proposal
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-charcoal-soft">
          We use your details only to prepare your proposal and never share them with third parties.
        </p>
      </div>
    </form>
  );
}
