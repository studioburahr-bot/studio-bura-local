import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScreenRecordingProps = {
  src: string;
  // Describes what the recording shows, for screen readers (there is no audio or caption).
  label: string;
  // Shape of the frame. Defaults to the original recording's pixel size, so nothing is cropped or letterboxed.
  aspectRatio?: string;
  className?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// True while the visitor's system asks for reduced motion; follows changes while the page is open.
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

// A short, silent, looping screen recording in a rounded, bordered frame.
// It fills the width of whatever it is placed in, so it lines up with the images around it.
// Plays only while on screen. Under reduced motion it never autoplays: it shows the first
// frame with the browser's own controls instead.
const ScreenRecording = ({ src, label, aspectRatio = "2932 / 1664", className }: ScreenRecordingProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // Some browsers refuse to start a video on their own (e.g. iOS Low Power Mode).
  // If that happens, show the controls so the visitor can start it.
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    // Start when at least a third of the frame is on screen, pause when it leaves
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setAutoplayBlocked(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      // 16px radius matches the site's other framed visual (the Figma embed frame);
      // the 1px light border keeps the white UI from blending into the page.
      className={cn("w-full overflow-hidden rounded-[16px] border border-border bg-background", className)}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        // "#t=0.001" makes browsers paint the first frame when the video is not playing
        src={reducedMotion ? `${src}#t=0.001` : src}
        aria-label={label}
        // No autoPlay attribute on purpose: that could start the video off screen.
        // The observer above starts it when it scrolls into view.
        muted
        loop
        playsInline
        controls={reducedMotion || autoplayBlocked}
        preload="metadata"
        className="block h-full w-full object-cover"
      />
    </div>
  );
};

export default ScreenRecording;
