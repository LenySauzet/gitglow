import { DEFAULT_COLOR } from '@/components/Input/ColorInput';
import { useCover } from '@/hooks/useCover';
import { cn, convertIconTitleToIcon } from '@/lib/utils';

const theme = (values: Record<string, string | string[] | boolean>) =>
  (values.themeColor as string) || DEFAULT_COLOR;

const SplitGradient = () => {
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
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: `linear-gradient(to right, color-mix(in oklch, var(--preview-bg) 70%, transparent) 15%, ${themeColor} 100%)`,
        }}
      />

      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full blur-xs bg-cover bg-center',
          !values.image && 'bg-preview-placeholder',
        )}
        style={
          values.image ? { backgroundImage: `url(${values.image})` } : undefined
        }
      />

      <div className="absolute left-[67%] bottom-[-400px] z-20 w-[2000px]">
        <div className="relative aspect-video">
          <div
            className={cn(
              'absolute inset-0 overflow-hidden rounded-xl bg-cover bg-top-left shadow-xl/80 ring-1 ring-preview-foreground/10 rotate-10',
              !values.image && 'bg-preview-placeholder bg-center',
            )}
            style={{
              ...(values.image && {
                backgroundImage: `url(${values.image})`,
              }),
            }}
          />
        </div>
      </div>

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

export default SplitGradient;
