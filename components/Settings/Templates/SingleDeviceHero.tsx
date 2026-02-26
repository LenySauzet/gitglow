import { DEFAULT_COLOR } from '@/components/Input/ColorInput';
import Iphone from '@/components/Preview/Iphone';
import { useCover } from '@/hooks/useCover';
import { convertIconTitleToIcon } from '@/lib/utils';

const theme = (values: Record<string, string | string[] | boolean>) =>
  (values.themeColor as string) || DEFAULT_COLOR;

const SingleDeviceHero = () => {
  const { values, font } = useCover();
  const year = new Date().getFullYear();
  const iconTitles = Array.isArray(values.icons) ? values.icons : [];
  const themeColor = theme(values);
  return (
    <div
      className="w-full h-full relative flex flex-col justify-between p-15 overflow-hidden bg-preview-background"
      style={font ? { fontFamily: font } : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-75"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${themeColor} 0%, transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${themeColor} 0%, transparent 100%)`,
        }}
      />

      <Iphone
        width={500}
        src={(values.image as string) ?? undefined}
        className="absolute top-[175px] right-[125px] z-10"
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

      <div className="z-20">
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
          <div className="flex flex-wrap gap-7 mt-10">
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

export default SingleDeviceHero;
