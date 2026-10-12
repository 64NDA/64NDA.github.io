import type { Publication } from "./types";

export const publications: Publication[] = [
  {
    title: "Computational Pathology in the Era of Emerging Foundation and Agentic AI",
    venue: "Med (Cell Press)",
    year: "Accepted",
    role: "Co-author",
    href: "https://arxiv.org/abs/2603.05884",
    summary:
      "A review of foundation, vision-language and agentic models in pathology and how ready they are for the clinic, " +
      "including failure modes in real labs: slide artefacts, sampling limits, rare high-risk subtypes and variation between hospitals.",
  },
  {
    title: "Answering the Call to ARMs with PACER: Power-Efficiency in Storage Servers",
    venue: "MSST 2024",
    year: "2024",
    role: "Co-author",
    href: "https://www.msstconference.org/MSST-history/2024/Papers/msst24-4.2.pdf",
    summary:
      "Power consumption and I/O behaviour of ARM-based flash storage servers. I analysed the measurements, " +
      "evaluated PACER's benchmarks and helped write the paper.",
  },
];
