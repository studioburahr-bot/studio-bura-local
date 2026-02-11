type FigmaPrototypeDeviceProps = {
  embedSrc: string;
  figmaUrl: string;
  title?: string;
};

const FigmaPrototypeDevice = ({
  embedSrc,
  figmaUrl,
  title = "Figma prototype",
}: FigmaPrototypeDeviceProps) => {
  return (
    <div className="flex w-full max-w-[360px] flex-col items-center sm:max-w-[390px]">
      <div className="h-[720px] w-full overflow-hidden rounded-[40px] sm:h-[780px]">
        <div className="relative h-full w-full overflow-hidden">
          <iframe
            src={embedSrc}
            title={title}
            className="absolute left-0 top-0 h-[880px] w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

      <a
        href={figmaUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 text-sm text-white/80 transition-colors hover:text-white"
      >
        Open in Figma {"\u2197"}
      </a>
    </div>
  );
};

export default FigmaPrototypeDevice;

