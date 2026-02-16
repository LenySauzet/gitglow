import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCover } from '@/hooks/useCover';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SquircleDashed } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Export from './Export';
import Reset from './Reset';
import ZoomPreview from './ZoomPreview';

const TILT_SPRING = { damping: 45, stiffness: 100, mass: 1 };
const HOVER_SPRING = { damping: 35, stiffness: 300, mass: 0.3 };
const ZOOM_SPRING = { damping: 40, stiffness: 200, mass: 0.5 };
const HOVER_SCALE = 1;
const IDLE_SCALE = 0.95;
const TILT = 7;

const Preview = () => {
  const isMobile = useIsMobile();
  const { zoom, template } = useCover();
  const ref = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), TILT_SPRING);
  const rotateY = useSpring(useMotionValue(0), TILT_SPRING);
  const hoverScale = useSpring(IDLE_SCALE, HOVER_SPRING);
  const zoomMotion = useSpring(zoom, ZOOM_SPRING);

  useEffect(() => {
    zoomMotion.set(zoom);
    if (isMobile) {
      hoverScale.set(1);
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [zoom, isMobile, zoomMotion, hoverScale, rotateX, rotateY]);

  const scale = useTransform(
    [hoverScale, zoomMotion],
    ([s, z]: number[]) => (z / 100) * s
  );

  const setHover = (entered: boolean) => {
    if (isMobile) return;
    hoverScale.set(entered ? HOVER_SCALE : IDLE_SCALE);
    if (!entered) {
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    rotateX.set(y * -TILT);
    rotateY.set(x * TILT);
  };

  return (
    <div className="flex-1 flex flex-col gap-2">
      <p className="text-sm text-muted-foreground/50 uppercase font-departure">
        Preview
      </p>

      <div
        ref={ref}
        className={`border rounded-lg flex-1 flex flex-col items-center justify-center relative bg-card/50 p-4 overflow-hidden ${
          !isMobile && 'cursor-crosshair'
        }`}
        style={{ perspective: '800px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="opacity-10 w-full h-full -z-10 absolute bg-[radial-gradient(var(--muted-foreground)_1px,transparent_0)] bg-size-[10px_10px]" />

        <div className="absolute top-5 right-5 flex items-center gap-4 z-10">
          <Reset />
          <Export previewRef={exportRef} />
        </div>

        <div className="absolute bottom-5 right-5 z-10">
          <ZoomPreview />
        </div>

        <motion.div
          className="will-change-transform flex flex-col gap-5 relative w-full max-w-full max-h-full min-h-0 min-w-0 flex-1 justify-center items-center"
          style={{ scale, rotateX, rotateY }}
        >
          <div
            className={cn(
              'bg-card border rounded-lg aspect-video shadow-lg relative w-full max-w-2xl overflow-hidden',
              !template && 'border-dashed'
            )}
          >
            <div ref={exportRef} className="h-full w-full">
              {template ? (
                template.component
              ) : (
                <Empty className="w-full h-full flex items-center justify-center">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SquircleDashed size={24} />
                    </EmptyMedia>
                    <EmptyTitle>Select a template</EmptyTitle>
                  </EmptyHeader>
                </Empty>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-primary" />

              <p className="text-sm text-muted-foreground">
                {template?.name || 'No template selected'}
              </p>
            </div>
            <span className="text-muted-foreground/50 text-sm font-departure">
              1280 x 720
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;
