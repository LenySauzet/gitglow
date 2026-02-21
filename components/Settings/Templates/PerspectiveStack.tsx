import { DEFAULT_COLOR } from '@/components/Input/ColorInput';
import { useCover } from '@/hooks/useCover';
import { convertIconTitleToIcon } from '@/lib/utils';

const theme = (values: Record<string, string | string[] | boolean>) =>
  (values.themeColor as string) || DEFAULT_COLOR;

const PerspectiveStack = () => {
  const { values } = useCover();
  const year = new Date().getFullYear();
  const iconTitles = Array.isArray(values.icons) ? values.icons : [];
  const themeColor = theme(values);
  return (
    <div className="w-full h-full relative flex flex-col justify-between p-15 overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${themeColor} 0%, transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${themeColor} 0%, transparent 100%)`,
        }}
      />

      <div
        className="absolute bottom-0 right-0 z-10 w-[1280px] h-[720px] rounded-tl-[32px] bg-cover outline-6 outline-solid translate-x-[20%] translate-y-[20%]"
        style={{
          outlineColor: `${themeColor}20`,
          backgroundPosition: values.image ? 'top left' : 'center',
          backgroundImage: `url(${values.image || '/placeholder.svg'})`,
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

      <div className="z-20">
        {values.titleMain && (
          <p className="text-[6rem] leading-none font-bold text-white">
            {values.titleMain}
          </p>
        )}
        {values.titleAccent && (
          <p
            className="text-[6rem] leading-none font-bold mt-3 text-white"
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

export default PerspectiveStack;
