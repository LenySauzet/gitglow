'use client';
import { Preview } from '@/components/Preview';
import SettingsContent from '@/components/Settings/SettingsContent';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function Home() {
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');
  return (
    <div className="flex gap-5 overflow-hidden h-full">
      {!isSmallScreen && (
        <aside className="max-w-sm shrink-0 flex flex-col overflow-hidden">
          <SettingsContent />
        </aside>
      )}
      <Preview />
    </div>
  );
}
