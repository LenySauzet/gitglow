import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Kbd } from '@/components/ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCover } from '@/hooks/useCover';
import { useCurrentTemplate } from '@/hooks/useCurrentTemplate';
import { getFontEmbedCSS } from '@/lib/fonts';
import { createShortcutHandler } from '@/lib/keyboard-shortcut';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import {
  ChevronDownIcon,
  Download,
  FileImageIcon,
  FileTypeIcon,
} from 'lucide-react';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const EXPORT_KEYBOARD_SHORTCUT = 'e';

const EXPORT_SIZE = { width: 1280, height: 720 };

const baseOptions = {
  width: EXPORT_SIZE.width,
  height: EXPORT_SIZE.height,
  cacheBust: true,
  style: {
    transform: 'scale(1)',
    left: '0',
    top: '0',
    margin: '0',
  },
} as const;

type ExportFormatId = 'png' | 'jpeg' | 'svg';

const EXPORT_FORMATS: Array<{
  id: ExportFormatId;
  label: string;
  extension: string;
  Icon: typeof FileImageIcon;
}> = [
  { id: 'png', label: 'PNG', extension: 'png', Icon: FileImageIcon },
  { id: 'jpeg', label: 'JPEG', extension: 'jpg', Icon: FileImageIcon },
  { id: 'svg', label: 'SVG', extension: 'svg', Icon: FileTypeIcon },
];

type ExportProps = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const ExportCoverBtn = ({ previewRef }: ExportProps) => {
  const template = useCurrentTemplate();
  const { font } = useCover();
  const [isExporting, setIsExporting] = useState(false);
  const [format, setFormat] = useState<ExportFormatId>('png');

  const handleExport = useCallback(
    async (exportFormat?: ExportFormatId) => {
      if (!previewRef.current || !template) return;
      const currentFormat = exportFormat ?? format;
      setIsExporting(true);

      try {
        let fontEmbedCSS: string | undefined;
        if (font) {
          try {
            fontEmbedCSS = await getFontEmbedCSS(font);
          } catch (e) {
            console.warn('Export: font embed failed, using fallback', e);
          }
        }
        const opts = {
          ...baseOptions,
          canvasWidth: EXPORT_SIZE.width,
          canvasHeight: EXPORT_SIZE.height,
          ...(fontEmbedCSS && { fontEmbedCSS }),
          ...(!fontEmbedCSS && { skipFonts: true }),
        };

        let dataUrl: string;
        switch (currentFormat) {
          case 'jpeg':
            dataUrl = await toJpeg(previewRef.current, {
              ...opts,
              quality: 0.95,
              backgroundColor: '#ffffff',
            });
            break;
          case 'svg':
            dataUrl = await toSvg(previewRef.current, opts);
            break;
          default:
            dataUrl = await toPng(previewRef.current, opts);
        }

        const fmt = EXPORT_FORMATS.find((f) => f.id === currentFormat)!;
        const link = document.createElement('a');
        link.download = `${template.name}-${Date.now()}.${fmt.extension}`;
        link.href = dataUrl;
        link.click();

        toast.success(`Successfully exported in ${fmt.label}`);
      } catch (err) {
        console.error('Export failed:', err);
        toast.error('Export failed');
      } finally {
        setIsExporting(false);
      }
    },
    [previewRef, template, format, font],
  );

  useEffect(() => {
    const handleKeyboardShortcut = createShortcutHandler((event) => {
      if (event.key === EXPORT_KEYBOARD_SHORTCUT) {
        handleExport();
      }
    });
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleExport]);

  const currentFormatLabel =
    EXPORT_FORMATS.find((f) => f.id === format)?.label ?? 'PNG';

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            onClick={() => handleExport()}
            disabled={isExporting || !template}
          >
            <Download size={16} />
            {isExporting ? 'Export...' : `Export ${currentFormatLabel}`}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex items-center gap-2">
            Export <Kbd>{EXPORT_KEYBOARD_SHORTCUT}</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            disabled={isExporting || !template}
            className="pl-2!"
          >
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            {EXPORT_FORMATS.map(({ id, label, Icon }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => setFormat(id)}
                className={format === id ? 'bg-accent' : ''}
              >
                <Icon size={16} />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};

export default ExportCoverBtn;
