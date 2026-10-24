export const site = {
  name: "Sarajevo Team Building",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarajevoteambuilding.com").replace(/\/+$/, ""),
  // Preview and staging deployments set NEXT_PUBLIC_SITE_ENV=staging to stay out of search results.
  indexable: process.env.NEXT_PUBLIC_SITE_ENV !== "staging",
  email: "info@sarajevoteambuilding.com",
  description:
    "Corporate team building activities in Sarajevo for international companies. We run the activity only, in English, and fit it around your existing event itinerary.",
};

export const groupSizes = [
  "10 – 50 guests",
  "51 – 100 guests",
  "101 – 250 guests",
  "251 – 500 guests",
] as const;

export const mainNav = [
  { href: "/#faq", label: "FAQ" },
] as const;
