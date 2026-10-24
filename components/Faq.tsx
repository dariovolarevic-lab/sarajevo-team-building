type Item = { q: string; a: string };

export default function Faq({
  items,
  tone = "light",
}: {
  items: Item[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={`divide-y ${dark ? "divide-white/15 border-y border-white/15" : "divide-charcoal/15 border-y border-charcoal/15"}`}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary
            className={`flex cursor-pointer items-start justify-between gap-6 py-5 text-left font-display text-lg transition-colors sm:text-xl ${dark ? "text-white hover:text-ember-light" : "text-slate-deep hover:text-ember"}`}
          >
            {item.q}
            <span
              aria-hidden
              className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-sm leading-none transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className={`faq-body max-w-3xl pb-6 leading-relaxed ${dark ? "text-white/75" : "text-charcoal-soft"}`}>
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
