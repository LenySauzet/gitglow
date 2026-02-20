import { DEFAULT_COLOR } from '@/components/ColorInput';
import { useCover } from '@/hooks/useCover';
import { convertIconTitleToIcon } from '@/lib/utils';

const accent = (values: Record<string, string | string[] | boolean>) =>
  (values.accentColor as string) || DEFAULT_COLOR;

const GlowSpotlight = () => {
  const { values } = useCover();
  const year = new Date().getFullYear();
  const iconTitles = Array.isArray(values.icons) ? values.icons : [];
  const accentColor = accent(values);
  return (
    <div className="w-full h-full relative flex flex-col justify-between p-15 overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-linear-to-t from-black via-transparent to-transparent" />

      <div
        className="absolute bottom-0 left-1/2 z-10 w-[1280px] h-[720px] rounded-[32px] bg-black bg-cover bg-center -translate-x-1/2 translate-y-[20%] scale-[0.85]"
        style={{
          backgroundImage: `url(${values.image || '/placeholder.svg'})`,
          boxShadow: `0 0 100px 16px ${accentColor}, 0 0 0 10px ${accentColor}`,
        }}
      />

      <div className="flex justify-between items-center">
        <div className="text-[3rem] font-bold z-20 text-white">{year}</div>
        {values.label && (
          <div className="text-[3rem] font-bold z-20 text-white">
            {values.label}
          </div>
        )}
      </div>

      <div className="z-20 flex flex-col items-center justify-center text-center">
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
          <div className="flex flex-wrap gap-7 mt-10 justify-center">
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

export default GlowSpotlight;
