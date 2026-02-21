'use client';
import {
  GitGlowLogo,
  GitHubStarsButton,
  ThemeModeToggle,
  CoverSettingsBtn,
} from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { useMediaQuery } from '@/hooks/use-media-query';

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');

  return (
    <header className="flex justify-between items-center">
      <GitGlowLogo />

      <div className="flex items-center gap-1 h-5">
        <GitHubStarsButton />
        <Separator orientation="vertical" />
        <ThemeModeToggle />
        {isSmallScreen && <CoverSettingsBtn />}
      </div>
    </header>
  );
};

export default Header;
