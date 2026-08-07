export const SITE = {
  name: "Systemine",
  tagline: "digital systems for real life",
  description:
    "Systemine makes thoughtfully designed digital products, templates and small tools for the parts of life nobody teaches you how to manage. No hustle. No hype. Just things that help.",
  url: "https://www.systemine.fyi",
  email: "systeminestore@gmail.com",
};

export const NAV_LINKS = [
  { href: "/shelves", label: "Browse the Shelves" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS = [
  {
    heading: "Find your way",
    links: [
      { href: "/shelves", label: "Browse the Shelves" },
      { href: "/articles", label: "Articles" },
      { href: "/about", label: "About" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "The fine print",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

// Add real social profiles here when they exist. We'd rather show one
// working link than several that go nowhere.
export const SOCIALS = [{ href: `mailto:${SITE.email}`, label: "Email" }];

// Bookshelves are listed in a deliberate order, not alphabetical —
// roughly the order someone tends to need them in.
export const CATEGORY_ORDER = [
  "Life Transitions",
  "Mental & Emotional",
  "Creative Survival",
  "Body & Health",
  "Hyper-Specific Human Experiences",
];
