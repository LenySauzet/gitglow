import { useCover } from '@/hooks/useCover';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { RefObject, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type ExportProps = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const Export = ({ previewRef }: ExportProps) => {
  const { template } = useCover();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (!previewRef.current || !template) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `${template.name}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Export failed');
    } finally {
      setIsExporting(false);
      toast.success('Export successful');
    }
  }, [previewRef, template]);

  return (
    <Button
      size="sm"
      onClick={handleExport}
      disabled={isExporting || !template}
    >
      <Download size={16} />
      {isExporting ? 'Export…' : 'Export'}
    </Button>
  );
};

export default Export;
