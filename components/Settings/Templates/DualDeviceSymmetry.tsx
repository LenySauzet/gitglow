import { DEFAULT_COLOR } from '@/components/Input/ColorInput';
import Iphone from '@/components/Preview/Iphone';
import { useCover } from '@/hooks/useCover';
import { cn, convertIconTitleToIcon } from '@/lib/utils';

const theme = (values: Record<string, string | string[] | boolean>) =>
  (values.themeColor as string) || DEFAULT_COLOR;

const GlowSpotlight = () => {
  const { values, font } = useCover();
  const year = new Date().getFullYear();
  const iconTitles = Array.isArray(values.icons) ? values.icons : [];
  const themeColor = theme(values);
  return (
    <div
      className="w-full h-full relative p-15 overflow-hidden bg-preview-background"
      style={font ? { fontFamily: font } : undefined}
    >
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-linear-to-t from-preview-background via-transparent to-transparent" />

      <div
        className={cn(
          'w-full h-full z-1 absolute inset-0',
          values.gridOrDot === 'grid' ? 'opacity-30' : 'opacity-60',
        )}
        style={{
          ...(values.gridOrDot === 'grid'
            ? {
                backgroundImage: `linear-gradient(to right, ${themeColor} 1px, transparent 0), linear-gradient(to bottom, ${themeColor} 1px, transparent 0)`,
              }
            : {
                backgroundImage: `radial-gradient(${themeColor} 1px, transparent 0)`,
              }),
          backgroundSize: '20px 20px',
          WebkitMaskImage: `radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%)`,
          maskImage: `radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%)`,
        }}
      />

      <Iphone
        width={350}
        src={(values.image as string) ?? undefined}
        className="absolute bottom-[-300px] left-[100px] z-10 -rotate-12"
      />
      <Iphone
        width={350}
        src={(values.imageSecondary as string) ?? undefined}
        className="absolute bottom-[-300px] right-[100px] z-10 rotate-12"
      />

      <div className="flex justify-between items-center">
        <div className="text-[3rem] font-bold z-20 text-preview-foreground">
          {year}
        </div>
        {values.label && (
          <div className="text-[3rem] font-bold z-20 text-preview-foreground">
            {values.label}
          </div>
        )}
      </div>

      <div className="z-20 flex flex-col items-center justify-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        {values.titleMain && (
          <p className="text-[6rem] leading-none font-bold text-preview-foreground">
            {values.titleMain}
          </p>
        )}
        {values.titleAccent && (
          <p
            className="text-[6rem] leading-none font-bold mt-3 text-preview-foreground"
            style={{ color: themeColor }}
          >
            {values.titleAccent}
          </p>
        )}
        {iconTitles.length > 0 && (
          <div className="flex flex-wrap gap-7 mt-10 justify-center">
            {iconTitles.map((title: string) => {
              const slug = convertIconTitleToIcon(title);
              return (
                <span
                  key={slug}
                  className="inline-block size-[75px] shrink-0 bg-preview-icon"
                  style={{
                    WebkitMask: `url(/icons/${slug}.svg) no-repeat center`,
                    WebkitMaskSize: 'contain',
                    mask: `url(/icons/${slug}.svg) no-repeat center`,
                    maskSize: 'contain',
                  }}
                  title={title}
                  role="img"
                  aria-label={title}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlowSpotlight;
