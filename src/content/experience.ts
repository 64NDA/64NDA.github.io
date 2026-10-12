import type { Experience } from "./types";

// Newest first. `kind` splits industry roles from research on the resume page.
export const experience: Experience[] = [
  {
    organisation: "Amazon",
    role: "SDE Intern",
    location: "London, UK",
    start: "Jun 2025",
    end: "Sep 2025",
    kind: "industry",
    summary:
      "Built an agentic AI assistant for the AWS Billing team that troubleshoots service tickets on its own. " +
      "The team adopted it into their triage workflow.",
    highlights: [
      "Integrated the agent with the existing ticketing system, so it acts on tickets without engineers switching tools.",
      "Designed automated root-cause analysis: the agent queries metrics, logs and observability tools through internal APIs.",
      "Built interactive chat so engineers can investigate incidents together with the agent.",
      "Deployed on AWS (Lambda, CloudWatch, S3, EC2, IAM) and aligned integration, data access and deployment with several owning teams.",
    ],
    stack: ["Agentic AI", "AWS Lambda", "CloudWatch", "S3", "EC2", "IAM"],
  },
  {
    organisation: "Ruijin Hospital R&D",
    role: "Research Intern",
    location: "Shanghai, China",
    start: "Jul 2024",
    end: "Oct 2024",
    kind: "research",
    summary: "Foundation models and their use in histopathology.",
    highlights: [
      "Prepared training data and wrote a program to format and process whole-slide image data.",
      "Evaluated foundation models for diagnostic assistance and education, analysing report generation and text-to-image recall.",
      "Co-authored a review of foundation models in computational pathology, accepted in Med (Cell Press).",
    ],
    stack: ["Foundation models", "Vision-language models", "Python"],
  },
  {
    organisation: "National Grid ESO",
    role: "Intern",
    location: "Wokingham, UK",
    start: "Mar 2024",
    end: "Apr 2024",
    kind: "industry",
    summary: "Energy data processing and battery-efficiency modelling for the electricity system operator.",
    highlights: [
      "Wrote a program to process battery data: state of charge, metered MW and energy available (MWh).",
      "Built a model to measure efficiency by comparing estimated against metered MWh.",
      "Worked with databases and Microsoft Azure in a project-managed team.",
    ],
    stack: ["Python", "Azure", "SQL"],
  },
  {
    organisation: "SAFARI Research Group, ETH Zürich",
    role: "Junior Research Intern",
    location: "Zürich, Switzerland",
    start: "Aug 2023",
    end: "Sep 2023",
    kind: "research",
    summary: "DRAM retention failures, supervised by Prof. Onur Mutlu.",
    highlights: [
      "Designed and ran experiments on how refresh interval and temperature affect DRAM retention failure rates.",
      "Ran the experiments on Linux through DRAM-Bender, an FPGA-based memory controller.",
      "Worked alongside researchers in DRAM, flash memory, storage, bioinformatics and AI/ML.",
    ],
    stack: ["DRAM-Bender", "FPGA", "Linux"],
  },
];
