const github = "https://github.com/crustates/crustates";
// Community health files (code of conduct, security policy…) shared by every repo in the org.
const orgFiles = "https://github.com/crustates/.github/blob/HEAD";

// External destinations used across the site. HEAD is each repo's default branch.
export const links = {
  docs: "https://docs.crustates.eu",
  github,
  brandRepo: "https://github.com/crustates/brand",
  brandRelease: "https://github.com/crustates/brand/releases/latest",
  releases: `${github}/releases`,
  discussions: `${github}/discussions`,
  goodFirstIssues: `${github}/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22`,
  contributing: `${github}/blob/HEAD/CONTRIBUTING.md`,
  adr: `${github}/tree/HEAD/docs/adr`,
  reportVulnerability: `${github}/security/advisories/new`,
  advisories: `${github}/security/advisories`,
  codeOfConduct: `${orgFiles}/CODE_OF_CONDUCT.md`,
  governance: `${orgFiles}/GOVERNANCE.md`,
  securityPolicy: `${orgFiles}/SECURITY.md`,
} as const;

/** Addresses from the design and the org's SECURITY.md and TRADEMARK.md. */
export const email = {
  hello: "hello@crustates.eu",
  security: "security@crustates.eu",
  privacy: "privacy@crustates.eu",
  press: "press@crustates.eu",
} as const;
