'use client';
import { MouseFollowCaption } from '@/components/cover';
import Preview from '@/components/Preview';
import Reset from '@/components/Reset';
import SettingsContent from '@/components/SettingsContent';
import { Button } from '@/components/ui/button';
import ZoomPreview from '@/components/ZoomPreview';
import { useCover } from '@/features/cover/hook/useCover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Download } from 'lucide-react';

export default function Home() {
  const { templateId, zoom } = useCover();
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');
  return (
    <main className="flex gap-5 overflow-hidden h-full">
      {!isSmallScreen && (
        <div className="max-w-sm shrink-0 flex flex-col overflow-hidden">
          <SettingsContent />
        </div>
      )}

      <Preview />
    </main>
  );
}
