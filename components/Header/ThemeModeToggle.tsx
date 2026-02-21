import { createShortcutHandler } from '@/lib/keyboard-shortcut';
import { Kbd } from '@/components/ui/kbd';
import { Contrast } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const THEME_MODE_TOGGLE_KEYBOARD_SHORTCUT = 'd';

const ThemeModeToggle = () => {
  const { setTheme } = useTheme();

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleKeyboardShortcut = createShortcutHandler((event) => {
      if (event.key === THEME_MODE_TOGGLE_KEYBOARD_SHORTCUT) {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      }
    });
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [setTheme]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" onClick={handleToggle}>
          <Contrast size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-2">
          Toggle Mode <Kbd>{THEME_MODE_TOGGLE_KEYBOARD_SHORTCUT}</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeModeToggle;
