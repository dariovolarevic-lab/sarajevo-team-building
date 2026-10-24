import { activities } from "./activities";
import { groupSizes } from "./site";

export type ProposalField =
  | "fullName"
  | "email"
  | "company"
  | "groupSize"
  | "experience"
  | "details";

export type ProposalValues = Record<ProposalField, string>;
export type ProposalErrors = Partial<Record<ProposalField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Free-mail domains are allowed on purpose: some PAs and agencies book on behalf of a company.
export function validateProposal(input: Record<string, unknown>): {
  values: ProposalValues;
  errors: ProposalErrors;
} {
  const str = (k: string) =>
    typeof input[k] === "string" ? (input[k] as string).trim() : "";

  const values: ProposalValues = {
    fullName: str("fullName"),
    email: str("email"),
    company: str("company"),
    groupSize: str("groupSize"),
    experience: str("experience"),
    details: str("details"),
  };

  const errors: ProposalErrors = {};

  if (!values.fullName) errors.fullName = "Please enter your name.";
  else if (values.fullName.length < 2 || values.fullName.length > 100)
    errors.fullName = "Please enter a name between 2 and 100 characters.";

  if (!values.email) errors.email = "Please enter your work email.";
  else if (!emailPattern.test(values.email) || values.email.length > 200)
    errors.email = "That email address does not look right.";

  if (!values.company) errors.company = "Please enter your company name.";
  else if (values.company.length > 160) errors.company = "That name is too long.";

  if (!(groupSizes as readonly string[]).includes(values.groupSize))
    errors.groupSize = "Please choose an approximate group size.";

  const slugs: string[] = activities.map((a) => a.slug);
  if (values.experience !== "combination" && !slugs.includes(values.experience))
    errors.experience = "Please choose an experience, or tell us you are not sure yet.";

  if (values.details.length > 3000)
    errors.details = "Please keep this under 3,000 characters.";

  return { values, errors };
}
