import { DEFAULT_COLOR } from '@/components/ColorInput';
import { useCover } from '@/hooks/useCover';
import { convertIconTitleToIcon } from '@/lib/utils';

const accent = (values: Record<string, string | string[] | boolean>) =>
  (values.accentColor as string) || DEFAULT_COLOR;

const SplitGradient = () => {
  const { values } = useCover();
  const year = new Date().getFullYear();
  const iconTitles = Array.isArray(values.icons) ? values.icons : [];
  const accentColor = accent(values);
  return (
    <div className="w-full h-full relative flex flex-col justify-between p-15 overflow-hidden bg-black">
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,0.7) 15%, ${accentColor} 100%)`,
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-full blur-xs bg-cover bg-center"
        style={{
          backgroundImage: `url(${values.image || '/placeholder.svg'})`,
        }}
      />

      <div className="absolute left-[67%] bottom-[-400px] z-20 w-[2000px]">
        <div className="relative aspect-video">
          <div
            className="absolute inset-0 overflow-hidden rounded-xl bg-cover bg-center shadow-xl/80 ring-1 ring-white/10"
            style={{
              transform: 'rotate(10deg)',
              backgroundImage: `url(${values.image || '/placeholder.svg'})`,
              backgroundPosition: values.image ? 'top left' : 'center',
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-[3rem] font-bold z-20 text-white">{year}</div>
        {values.label && (
          <div className="text-[3rem] font-bold z-20 text-white">
            {values.label}
          </div>
        )}
      </div>

      <div className="z-20">
        {values.titleMain && (
          <p className="text-[6rem] leading-none font-bold text-white">
            {values.titleMain}
          </p>
        )}
        {values.titleAccent && (
          <p
            className="text-[6rem] leading-none font-bold mt-3 text-white"
            style={{ color: accentColor }}
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
                  className="inline-block size-[75px] shrink-0 bg-white"
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
