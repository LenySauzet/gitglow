'use client';
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

      <div className="flex-1 flex flex-col gap-2">
        <p className="text-sm text-muted-foreground/50 uppercase font-departure">
          Preview
        </p>

        <div className="border rounded-lg flex-1 flex flex-col items-center justify-center relative bg-card/50 p-4 overflow-hidden">
          <div className="opacity-10 w-full h-full -z-10 absolute bg-[radial-gradient(var(--muted-foreground)_1px,transparent_0)] bg-size-[10px_10px]" />

          <div className="absolute top-5 right-5 flex items-center gap-4 z-10">
            <Reset />
            <Button size="sm">
              <Download size={16} />
              Export
            </Button>
          </div>

          <div className="absolute bottom-5 right-5 z-10">
            <ZoomPreview />
          </div>

          <div
            className="flex flex-col gap-5 relative w-full max-w-full max-h-full min-h-0 min-w-0 flex-1 justify-center items-center transition-transform duration-300"
            style={{
              transform: `scale(${zoom / 100})`,
            }}
          >
            <div className="bg-card border rounded-lg aspect-video shadow-lg relative w-full max-w-2xl"></div>

            <div className="flex items-center gap-5">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">
                  Dual Device Symmetry
                </p>
              </div>
              <span className="text-muted-foreground/50 text-sm font-departure">
                1280 x 720
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
