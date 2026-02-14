import { useCover } from '@/features/cover/hook/useCover';
import NumberFlow from '@number-flow/react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';
import { ButtonGroup, ButtonGroupText } from './ui/button-group';

const ZoomPreview = () => {
  const { zoom, setZoom } = useCover();

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50));
  };

  return (
    <ButtonGroup>
      <Button size="icon" variant="outline" onClick={handleZoomOut}>
        <ZoomOut size={16} />
      </Button>
      <ButtonGroupText>
        <NumberFlow value={zoom} suffix="%" />
      </ButtonGroupText>
      <Button size="icon" variant="outline" onClick={handleZoomIn}>
        <ZoomIn size={16} />
      </Button>
    </ButtonGroup>
  );
};

export default ZoomPreview;
