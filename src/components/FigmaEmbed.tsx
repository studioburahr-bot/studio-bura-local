import { cn } from "@/lib/utils";

type FigmaEmbedProps = {
  src: string;
  title: string;
  aspectRatio: string;
  align?: "center" | "right";
  frame?: "screen" | "none";
  // Px of Figma player padding hidden on each side (left/right and top/bottom).
  cropX?: number;
  cropY?: number;
};

// Thin, even black frame from md up (9px border, 16px outer radius); the screen inside
// uses 16 - 9 = 7px so the inner corners follow the outer ones.
// Below md there is no frame, just a 1px border so the embed reads on white.
const SCREEN_FRAME_CLASSES = "border border-[#e5e5e5] md:rounded-[16px] md:border-[9px] md:border-[#0f0f0f]";
const SCREEN_INNER_CLASSES = "md:rounded-[7px]";

// Default params for prototype embeds; only added when missing, so values in src win.
const REQUIRED_PARAMS: Record<string, string> = {
  "hide-ui": "1",
  "hotspot-hints": "0",
  scaling: "contain",
  "content-scaling": "fixed",
};

const withRequiredParams = (src: string) => {
  try {
    const url = new URL(src);
    Object.entries(REQUIRED_PARAMS).forEach(([key, value]) => {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    return src;
  }
};

const FigmaEmbed = ({
  src,
  title,
  aspectRatio,
  align = "center",
  frame = "none",
  cropX = 48,
  cropY = 60,
}: FigmaEmbedProps) => {
  const alignClasses = cn("w-full md:w-[72%]", align === "right" ? "md:ml-auto" : "mx-auto");

  // The iframe is oversized by the player padding and shifted back, so the padding
  // falls outside the overflow-hidden screen and the design fills it edge to edge.
  const screen = (
    <div
      className={cn(
        "relative overflow-hidden bg-white",
        frame === "none" ? alignClasses : SCREEN_INNER_CLASSES,
      )}
      style={{ aspectRatio }}
    >
      <iframe
        src={withRequiredParams(src)}
        title={title}
        className="absolute max-w-none border-0 bg-white"
        style={{
          left: -cropX,
          top: -cropY,
          width: `calc(100% + ${cropX * 2}px)`,
          height: `calc(100% + ${cropY * 2}px)`,
        }}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );

  if (frame === "none") return screen;

  return <div className={cn(alignClasses, SCREEN_FRAME_CLASSES)}>{screen}</div>;
};

export default FigmaEmbed;
