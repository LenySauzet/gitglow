import { useThumbnail } from '@/context/thumbnail-context';
import { getIconComponent } from '@/lib/icons';
import imageDark from '@/public/dark.png';
import imageLight from '@/public/light.png';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import SplitTitle from './SplitTitle';

const inter = Inter({ subsets: ['latin'] });
const year = new Date().getFullYear();

interface DefaultThumbnailProps {
  elementRef?: React.RefObject<HTMLDivElement>;
}

export default function DefaultThumbnail({
  elementRef,
}: DefaultThumbnailProps) {
  const { thumbnail } = useThumbnail();

  return (
    <div
      className="rounded-md overflow-hidden"
      style={{ filter: `drop-shadow(0px 0px 100px ${thumbnail.hexColor}22)` }}
    >
      <div
        ref={elementRef}
        className={`${inter.className} aspect-video relative h-full w-full ${
          thumbnail.darkMode ? 'bg-black text-white' : 'bg-white text-black'
        } flex flex-col justify-between p-5 font-semibold overflow-hidden`}
      >
        <div
          style={{ backgroundColor: thumbnail.hexColor }}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[20rem] rounded-full opacity-70 filter blur-[100px]"
        ></div>
        <div
          style={{ backgroundColor: thumbnail.hexColor }}
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[30rem] h-[10rem] rounded-full opacity-70 filter blur-[100px] z-10"
        ></div>
        <Image
          width={1280}
          height={720}
          src={
            thumbnail.selectedImage ??
            (thumbnail.darkMode ? imageDark : imageLight)
          }
          alt={`${thumbnail.title}-${year}`}
          className="absolute top-10 left-1/3 object-cover rounded-md"
        />
        <span className="absolute right-[1.25rem] text-4xl font-extrabold ">
          {thumbnail.info}
        </span>

        <div className="z-20">
          <p className="text-3xl font-extrabold">{year}</p>
        </div>
        <div className="text-6xl z-20 flex flex-col gap-3">
          <p>
            <SplitTitle title={thumbnail.title} />
          </p>

          <div className="flex gap-2 flex-wrap">
            {thumbnail.features.map((feature, index) => {
              if (!feature.checked) return null;
              const IconComponent = getIconComponent(feature.iconId);
              const iconColor = thumbnail.useDefaultIconColor
                ? 'default'
                : thumbnail.darkMode
                ? '#fff'
                : '#000';
              return IconComponent ? (
                <IconComponent key={index} size={30} color={iconColor} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
