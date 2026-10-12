import type { OtherWork, Project } from "./types";

// Order here is the order on the home page.
export const projects: Project[] = [
  {
    slug: "owai",
    title: "OWAI",
    tagline: "AI coaching from raw Overwatch gameplay footage",
    period: "Sep 2025 – Jun 2026",
    role: "Final-year dissertation",
    summary:
      "Computer vision turns match footage into a timeline of game events. A retrieval-augmented LLM then " +
      "coaches the player on what actually happened in that match.",
    metrics: [
      { value: "87%", label: "of player ratings preferred it over a baseline LLM" },
      { value: "4.8/5", label: "average rating in user testing" },
      { value: "First", label: "class mark for the dissertation" },
    ],
    stack: ["Python", "YOLO (Ultralytics)", "OCR", "RAG", "FAISS", "LLM APIs", "Streamlit"],
    links: [{ label: "Source on GitHub", href: "https://github.com/64NDA/OWAI" }],
    cover: { diagram: "owai" },
    problem:
      "Reviewing your own footage is the most useful thing a competitive player can do, and the most tedious. " +
      "General-purpose chatbots can talk about the game, but they haven't seen your match, so their advice is generic.",
    approach: [
      "Computer-vision modules read the footage frame by frame: YOLO models detect heroes and classify teams, and a mix of detection and OCR reads the kill feed and HUD (health, ultimate charge, ability cooldowns).",
      "A video processor runs the modules, and a data aggregator turns their raw output into a structured timeline of in-game events.",
      "A retrieval-augmented pipeline grounds the LLM in that timeline and a game-knowledge vector store (FAISS), so its advice refers to specific moments in the match.",
      "User testing led to clickable timestamps and captions that link each piece of advice to the footage it refers to.",
    ],
    results: [
      "In player ratings, its coaching was preferred over a baseline LLM 87% of the time.",
      "It averaged 4.8/5 in user testing.",
      "The dissertation received a First-Class mark.",
    ],
  },
  {
    slug: "nba-match-predictor",
    title: "NBA Match Predictor",
    tagline: "Win probabilities from who's actually playing tonight",
    period: "Jul 2024 – Sep 2026",
    role: "Personal project",
    summary:
      "Player impact ratings from 423k on-court stints, combined with a learned model of the official injury report " +
      "and Elo. It beats an Elo baseline over four seasons and serves daily predictions in a Streamlit app.",
    metrics: [
      { value: "67.1%", label: "accuracy over four walk-forward seasons" },
      { value: "64.8%", label: "Elo baseline over the same games" },
      { value: "423k", label: "on-court stints behind the player ratings" },
    ],
    stack: ["Python", "pandas", "scikit-learn", "LightGBM", "nba_api", "Streamlit", "Plotly", "pytest"],
    links: [{ label: "Source on GitHub", href: "https://github.com/64NDA/NBA_Match_Predictor" }],
    cover: {
      src: "/projects/nba-matchup.webp",
      alt: "Matchup explorer: Boston at the LA Lakers, with a 57% win chance for Boston, a predicted 111–109 score and Elo history.",
    },
    problem:
      "Most game predictors work from team-level form and miss what matters most on the night: who is actually " +
      "playing. A team without its star is a different team, and the official injury report says so before tip-off.",
    approach: [
      "Player impact: a ridge regression (RAPM) over about 423k ten-man stints rebuilt from play-by-play substitutions. Low-minute players are shrunk toward a box-score prior, and ratings are refit weekly using only earlier games.",
      "Availability: a LightGBM model turns the official injury report, as it stood an hour before tip-off, into each player's chance of playing.",
      "Team strength: ratings are weighted by expected minutes, with absent players' minutes redistributed. Rosters are time-correct, rebuilt from the NBA's dated trades, signings and waivers.",
      "A ridge combiner blends the player projection with Elo, home court, rest and travel to predict margin and total, so the predicted score always agrees with the pick.",
    ],
    results: [
      "67.1% accuracy and 0.606 log-loss across 2021-22 to 2024-25, against 64.8% for Elo alone.",
      "69.0% on the held-out 2025-26 season.",
      "The log-loss gain over the previous version is 8 standard errors on the walk-forward. A change was kept only if it beat 2 SE.",
      "34 automated tests, including look-ahead checks that rebuild every feature from truncated data, and train/serve parity.",
      "Ideas that didn't help (style matchups, recent form, neural-net second opinions) are reported, not hidden.",
    ],
    gallery: [
      {
        src: "/projects/nba-track-record.webp",
        alt: "Track record page: per-season out-of-sample accuracy and log-loss for v3, v2, Elo and home-team baselines.",
        caption: "Track record: every season predicted by a model trained only on earlier seasons.",
      },
    ],
  },
  {
    slug: "obsidian-theme-builder",
    title: "Obsidian Theme Builder",
    tagline: "Design an Obsidian theme visually and install it straight into your vault",
    period: "Sep 2026",
    role: "Personal project",
    summary:
      "A single-file web app that previews a mock Obsidian window live as you edit colours, then exports a " +
      "ready-to-use theme or writes it straight into your vault.",
    metrics: [
      { value: "1 file", label: "no dependencies, no build step" },
      { value: "Live", label: "sync into your vault as you edit" },
    ],
    stack: ["HTML", "CSS custom properties", "JavaScript", "File System Access API"],
    links: [{ label: "Try it live", href: "/demos/obsidian-theme-builder/" }],
    cover: {
      src: "/projects/theme-builder.webp",
      alt: "Theme builder: colour controls on the left and a live mock Obsidian window on the right.",
    },
    problem:
      "An Obsidian theme is a set of CSS variables, but tuning them by hand means editing, reloading and hunting " +
      "for which variable controls which part of the interface.",
    approach: [
      "A faithful mock of the Obsidian window re-renders as every variable changes. Click any element in the preview to jump to the colour that controls it.",
      "Start from a preset or generate a palette from a base and accent colour. Dark and light modes are edited separately.",
      "Export theme.css and manifest.json, or use the File System Access API to write the theme into your vault, with optional live sync on every change.",
      "Import an existing theme.css to keep editing it. Work in progress survives in browser storage.",
    ],
    results: [
      "It runs entirely in the browser from one HTML file, with no dependencies.",
      "Vault install works in Chromium browsers. Elsewhere it falls back to a download.",
    ],
  },
];

export const otherWork: OtherWork[] = [
  {
    title: "Traffic Flow Predictor",
    period: "Feb – Apr 2025",
    description:
      "Led a university team building a traffic-flow simulator and desktop application for a four-way junction, " +
      "run with agile practices.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
