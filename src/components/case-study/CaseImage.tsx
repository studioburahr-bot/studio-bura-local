import { cn } from "@/lib/utils";

interface CaseImageProps {
  src: string;
  alt: string;
  // Intrinsic size of the file, so the browser reserves the space before it loads.
  width: number;
  height: number;
  // Optional caption (annotation style, ink-muted), 12px below the image, or 12px above it with
  // captionPosition "top".
  caption?: string;
  captionPosition?: "top" | "bottom";
  // Grid placement of the figure (e.g. "col-span-12 md:col-span-7 md:col-start-6").
  className?: string;
  // Placement of the caption. To offset it inside the image's columns, make the figure a subgrid
  // (className "md:grid md:grid-cols-subgrid") and place the caption on those columns.
  captionClassName?: string;
  // Extra classes for the image itself (e.g. a radius and shadow).
  imgClassName?: string;
}

// A screenshot on grid spans: <figure> with the image at the full width of its columns.
const CaseImage = ({
  src,
  alt,
  width,
  height,
  caption,
  captionPosition = "bottom",
  className,
  captionClassName,
  imgClassName,
}: CaseImageProps) => {
  const top = captionPosition === "top";
  const figcaption = caption && (
    <figcaption className={cn(top ? "mb-3" : "mt-3", "text-annotation text-ink-muted", captionClassName)}>
      {caption}
    </figcaption>
  );
  return (
    <figure className={className}>
      {top && figcaption}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn("col-span-full h-auto w-full", imgClassName)}
      />
      {!top && figcaption}
    </figure>
  );
};

export default CaseImage;
