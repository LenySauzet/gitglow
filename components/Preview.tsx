import { useCover } from '@/features/cover/hook/useCover';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Reset from './Reset';
import { Button } from './ui/button';
import ZoomPreview from './ZoomPreview';

const TILT_SPRING = { damping: 45, stiffness: 100, mass: 1 };
const HOVER_SPRING = { damping: 35, stiffness: 300, mass: 0.3 };
const ZOOM_SPRING = { damping: 40, stiffness: 200, mass: 0.5 };
const HOVER_SCALE = 1;
const IDLE_SCALE = 0.95;
const TILT = 7;

const Preview = () => {
  const isMobile = useIsMobile();
  const { zoom } = useCover();
  const ref = useRef<HTMLDivElement>(null);
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

  const shineX = useTransform(rotateY, (r) => 50 + r * 2.5);
  const shineY = useTransform(rotateX, (r) => 50 - r * 2.5);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 25%, transparent 50%)`
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
          <Button size="sm">
            <Download size={16} />
            Export
          </Button>
        </div>
        <div className="absolute bottom-5 right-5 z-10">
          <ZoomPreview />
        </div>
        <motion.div
          className="will-change-transform flex flex-col gap-5 relative w-full max-w-full max-h-full min-h-0 min-w-0 flex-1 justify-center items-center"
          style={{ scale, rotateX, rotateY }}
        >
          <div
            id="cover-preview"
            className="bg-card border rounded-lg aspect-video shadow-lg relative w-full max-w-2xl overflow-hidden"
          >
            {/* <img
              src="https://i.scdn.co/image/ab67616d00001e02723eafa7603e125a59a43dcd"
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-lg"
              style={{ background: shineBackground }}
            /> */}
          </div>

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
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;
