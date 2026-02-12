import NumberFlow from '@number-flow/react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { ButtonGroup, ButtonGroupText } from './ui/button-group';

const ZoomPreview = () => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 50));
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
