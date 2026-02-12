'use client';
import { useMediaQuery } from '@/hooks/use-media-query';
import GitHubStarsButton from './GitHubStarsButton';
import Icon from './Icon';
import ModeToggle from './ModeToggle';
import Settings from './Settings';
import { Separator } from './ui/separator';

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');

  return (
    <header className="flex justify-between items-center pb-7">
      <div className="flex items-center gap-3">
        <Icon width={25} height={25} />
        <h1 className="text-2xl font-medium font-instrument tracking-wider">
          GitGlow
        </h1>
      </div>

      <div className="flex items-center gap-1 h-5">
        <GitHubStarsButton />

        <Separator orientation="vertical" />

        <ModeToggle />

        {isSmallScreen && <Settings />}
      </div>
    </header>
  );
};

export default Header;
