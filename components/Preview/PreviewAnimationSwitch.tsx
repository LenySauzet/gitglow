import { Field, FieldLabel } from '@/components/ui/field';
import { Kbd } from '@/components/ui/kbd';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCover } from '@/hooks/useCover';
import { createShortcutHandler } from '@/lib/keyboard-shortcut';
import { MousePointer2, MousePointer2Off } from 'lucide-react';
import { useEffect } from 'react';

const DISABLE_ANIMATION_KEYBOARD_SHORTCUT = 'a';

const PreviewAnimationSwitch = () => {
  const { animation, setAnimation } = useCover();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyboardShortcut = createShortcutHandler((event) => {
      if (event.key === DISABLE_ANIMATION_KEYBOARD_SHORTCUT) {
        setAnimation(!animation);
      }
    });
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [animation, setAnimation]);

  if (isMobile) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Field orientation="horizontal" className="cursor-pointer">
          <Switch
            id="switch-disable-animation"
            checked={animation}
            onCheckedChange={setAnimation}
          />
          <FieldLabel htmlFor="switch-disable-animation">
            {animation ? (
              <MousePointer2 size={16} />
            ) : (
              <MousePointer2Off size={16} />
            )}
          </FieldLabel>
        </Field>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-2">
          {animation ? 'Disable Animation' : 'Enable Animation'}{' '}
          <Kbd>{DISABLE_ANIMATION_KEYBOARD_SHORTCUT}</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default PreviewAnimationSwitch;
