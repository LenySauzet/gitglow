import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useConfirm } from '@/hooks/use-confirm';
import { useCover } from '@/hooks/useCover';
import { createShortcutHandler } from '@/lib/keyboard-shortcut';
import { RefreshCcw } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

const RESET_PREVIEW_KEYBOARD_SHORTCUT = 'z';

const ResetPreviewBtn = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Reset to default values',
    'You are about to reset to default values',
  );
  const { reset } = useCover();

  const handleReset = useCallback(() => {
    confirm().then((ok) => {
      if (ok) {
        reset();
        toast.success('Reset to default values');
      }
    });
  }, [reset, confirm]);

  useEffect(() => {
    const handleKeyboardShortcut = createShortcutHandler((event) => {
      if (event.key === RESET_PREVIEW_KEYBOARD_SHORTCUT) {
        handleReset();
      }
    });
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleReset]);

  return (
    <>
      <ConfirmDialog />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" variant="secondary" onClick={handleReset}>
            <RefreshCcw size={16} />
            Reset
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex items-center gap-2">
            Reset <Kbd>{RESET_PREVIEW_KEYBOARD_SHORTCUT}</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default ResetPreviewBtn;
