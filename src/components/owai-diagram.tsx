// OWAI's pipeline, drawn in place of a screenshot. Colours come from the theme tokens, so it
// follows light/dark mode. Flow: footage → vision modules → timeline → RAG + LLM → coaching.

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
};

function Box({ x, y, w, h, title, sub, accent }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        fill={accent ? "var(--accent-soft)" : "var(--paper)"}
        stroke={accent ? "var(--accent)" : "var(--rule)"}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sub ? -6 : 7)}
        textAnchor="middle"
        fill="var(--ink)"
        style={{ font: "500 21px var(--font-geist-sans), sans-serif" }}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 22}
          textAnchor="middle"
          fill="var(--muted)"
          style={{ font: "15px var(--font-geist-mono), monospace" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Chip({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={196} height={44} rx={22} fill="var(--surface)" stroke="var(--rule)" />
      <text
        x={x + 98}
        y={y + 28}
        textAnchor="middle"
        fill="var(--ink)"
        style={{ font: "16px var(--font-geist-sans), sans-serif" }}
      >
        {label}
      </text>
    </g>
  );
}

export function OwaiDiagram() {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-labelledby="owai-diagram-title"
      className="block h-full w-full bg-surface"
    >
      <title id="owai-diagram-title">
        OWAI pipeline: gameplay footage goes through computer-vision modules (hero detection, team
        classification, kill feed, HUD reading), which build an event timeline; a retrieval-augmented
        LLM turns the timeline into coaching advice linked to timestamps.
      </title>
      <defs>
        <marker id="owai-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="var(--faint)" />
        </marker>
      </defs>

      {/* Row 1: footage → vision modules */}
      <Box x={40} y={95} w={170} h={120} title="Gameplay" sub="video" />
      <line x1={214} y1={155} x2={272} y2={155} stroke="var(--faint)" strokeWidth={2} markerEnd="url(#owai-arrow)" />
      <rect x={280} y={50} width={480} height={210} rx={18} fill="var(--paper)" stroke="var(--rule)" strokeWidth={1.5} />
      <text x={304} y={86} fill="var(--muted)" style={{ font: "15px var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}>
        VISION MODULES · YOLO + OCR
      </text>
      <Chip x={304} y={110} label="Hero detection" />
      <Chip x={540} y={110} label="Team classification" />
      <Chip x={304} y={180} label="Kill feed" />
      <Chip x={540} y={180} label="HUD reading" />

      {/* Down, then row 2 runs right to left: timeline → RAG + LLM → coaching */}
      <line x1={650} y1={264} x2={650} y2={318} stroke="var(--faint)" strokeWidth={2} markerEnd="url(#owai-arrow)" />
      <Box x={560} y={326} w={200} h={120} title="Event timeline" sub="structured" />
      <line x1={556} y1={386} x2={498} y2={386} stroke="var(--faint)" strokeWidth={2} markerEnd="url(#owai-arrow)" />
      <Box x={290} y={326} w={200} h={120} title="RAG + LLM" sub="FAISS knowledge" />
      <line x1={286} y1={386} x2={228} y2={386} stroke="var(--faint)" strokeWidth={2} markerEnd="url(#owai-arrow)" />
      <Box x={40} y={326} w={180} h={120} title="Coaching" sub="+ timestamps" accent />
    </svg>
  );
}
