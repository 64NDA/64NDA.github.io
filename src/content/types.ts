export type Link = {
  label: string;
  href: string;
};

export type Experience = {
  organisation: string;
  role: string;
  location: string;
  start: string;
  end: string;
  kind: "industry" | "research";
  summary: string;
  highlights: string[];
  stack?: string[];
};

export type Education = {
  institution: string;
  qualification: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  role: string;
  href: string;
  summary: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  role: string;
  /** Shown on the home page card and in the page's metadata. */
  summary: string;
  metrics: Metric[];
  stack: string[];
  links: Link[];
  /** Either a screenshot or the name of a diagram component rendered in its place. */
  cover: ProjectImage | { diagram: "owai" };
  problem: string;
  approach: string[];
  results: string[];
  gallery?: ProjectImage[];
};

export type OtherWork = {
  title: string;
  period: string;
  description: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};
