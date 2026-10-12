import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogImage, profile } from "@/content/profile";

// The link-preview card (LinkedIn, Slack, iMessage…), rendered to `out/og.png` at build time.
// A route handler rather than the `opengraph-image` convention, because that emits a file with no
// extension, which GitHub Pages would serve as application/octet-stream.
export const dynamic = "force-static";

export async function GET() {
  const fonts = join(process.cwd(), "node_modules/@fontsource/newsreader/files");
  const serif = await readFile(join(fonts, "newsreader-latin-500-normal.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: "#fbfaf7",
          color: "#1c1b19",
          fontFamily: "Newsreader",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, color: "#5d5a53" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#b4441f" }} />
          {profile.role} · {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 104, letterSpacing: "-0.03em", lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 40, lineHeight: 1.3, color: "#5d5a53", maxWidth: 980 }}>{profile.headline}</div>
        </div>
      </div>
    ),
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: [{ name: "Newsreader", data: serif, style: "normal", weight: 500 }],
    },
  );
}
