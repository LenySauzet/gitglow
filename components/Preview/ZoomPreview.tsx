import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Kbd } from '@/components/ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCover } from '@/hooks/useCover';
import { createShortcutHandler } from '@/lib/keyboard-shortcut';
import NumberFlow from '@number-flow/react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect } from 'react';

const ZOOM_IN_KEYBOARD_SHORTCUT = '+';
const ZOOM_OUT_KEYBOARD_SHORTCUT = '-';
const ZOOM_RESET_KEYBOARD_SHORTCUT = '0';

const ZoomPreview = () => {
  const { zoom, setZoom } = useCover();

  const handleZoomReset = useCallback(() => {
    setZoom(100);
  }, [setZoom]);

  const handleZoomIn = useCallback(() => {
    setZoom(Math.min(zoom + 10, 150));
  }, [zoom, setZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom(Math.max(zoom - 10, 50));
  }, [zoom, setZoom]);

  useEffect(() => {
    const handleKeyboardShortcut = createShortcutHandler((event) => {
      if (event.key === ZOOM_OUT_KEYBOARD_SHORTCUT) {
        handleZoomOut();
      } else if (event.key === ZOOM_IN_KEYBOARD_SHORTCUT) {
        handleZoomIn();
      } else if (event.key === ZOOM_RESET_KEYBOARD_SHORTCUT) {
        handleZoomReset();
      }
    });
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleZoomIn, handleZoomOut, handleZoomReset]);

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex items-center gap-2">
            Zoom Out <Kbd>{ZOOM_OUT_KEYBOARD_SHORTCUT}</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={handleZoomReset}>
            <NumberFlow value={zoom} suffix="%" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex items-center gap-2">
            Zoom Reset <Kbd>{ZOOM_RESET_KEYBOARD_SHORTCUT}</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex items-center gap-2">
            Zoom In <Kbd>{ZOOM_IN_KEYBOARD_SHORTCUT}</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
};

export default ZoomPreview;
