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
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Export from './Export';
import Reset from './Reset';
import ZoomPreview from './ZoomPreview';

const TILT_SPRING = { damping: 45, stiffness: 100, mass: 1 };
const HOVER_SPRING = { damping: 35, stiffness: 300, mass: 0.3 };
const ZOOM_SPRING = { damping: 40, stiffness: 200, mass: 0.5 };
const HOVER_SCALE = 1;
const IDLE_SCALE = 0.95;
const TILT = 7;
const DESIGN = { w: 1280, h: 720 };

const Preview = () => {
  const isMobile = useIsMobile();
  const { zoom, template } = useCover();
  const ref = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentScale, setContentScale] = useState(1);
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

  const updateScale = () => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w > 0 && h > 0) {
      setContentScale(Math.min(w / DESIGN.w, h / DESIGN.h));
    }
  };

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScale();
    requestAnimationFrame(updateScale);
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [template]);

  const scale = useTransform(
    [hoverScale, zoomMotion],
    ([s, z]: number[]) => (z / 100) * s,
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
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
        Preview
      </p>

      <div
        ref={ref}
        className={
          'border rounded-lg flex-1 flex flex-col items-center justify-center relative bg-card/50 p-4 overflow-hidden cursor-crosshair'
        }
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
          className="will-change-transform flex flex-col gap-5 relative w-full max-w-full min-h-0 min-w-0 flex-1 overflow-hidden"
          style={{ scale, rotateX, rotateY }}
        >
          <div className="flex-1 min-h-0 flex items-center justify-center @container-[size]">
            <div className="flex w-full flex-col items-center gap-5">
              <div
                ref={containerRef}
                className={cn(
                  'bg-card border rounded-lg aspect-video shadow-lg relative max-w-2xl overflow-hidden shrink-0',
                  'min-w-0 min-h-0 max-h-full',
                  'w-[min(100%,42rem,calc(100cqh*16/9))]',
                  !template && 'border-dashed',
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div
                    ref={exportRef}
                    className={cn('origin-center', template && 'shrink-0')}
                    style={
                      template
                        ? {
                            width: DESIGN.w,
                            height: DESIGN.h,
                            transform: `scale(${contentScale})`,
                          }
                        : { width: '100%', height: '100%' }
                    }
                  >
                    {template ? (
                      template.component
                    ) : (
                      <Empty className="h-full w-full flex items-center justify-center">
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
              </div>
              <div className="w-full flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  <span>{template?.name ?? 'No template selected'}</span>
                </div>
                <span className="font-departure text-muted-foreground/50">
                  {DESIGN.w} &times; {DESIGN.h}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;
