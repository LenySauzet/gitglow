import { DEFAULT_COLOR } from '@/components/ColorInput';
import { useCover } from '@/hooks/useCover';

const convertIconTitleToIcon = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\./g, 'dot')
    .replace(/\+/g, 'plus')
    .replace(/\&/g, 'and')
    .replace(/\+/g, 'plus')

    .replace(/[^a-z0-9]/g, '');
};

const ExempleTemplate = () => {
  const { values } = useCover();
  const year = new Date().getFullYear();
  const iconTitles = Array.isArray(values.icons) ? values.icons : [];
  return (
    <div className="w-full h-full relative flex flex-col justify-between p-15">
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: `linear-gradient(to bottom, ${values.accentColor || DEFAULT_COLOR} 0%, transparent 100%)`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black" />

      <div className="flex justify-between items-center">
        <div className="text-[3rem] font-bold z-20 text-white">{year}</div>
        {values.label && (
          <div className="text-[3rem] font-bold z-20 text-white">{values.label}</div>
        )}
      </div>

      <div className="z-20">
        {values.titleMain && (
          <p className="text-[6rem] leading-none font-bold text-white">
            {values.titleMain}
          </p>
        )}
        {values.titleAccent && (
          <p className="text-[6rem] leading-none font-bold mt-3 text-white" style={{ color: values.accentColor as string || DEFAULT_COLOR }}>
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
                  className="inline-block size-[75px] shrink-0"
                  style={{
                    backgroundColor: 'currentColor',
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

export default ExempleTemplate;
