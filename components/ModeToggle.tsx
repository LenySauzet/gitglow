import { Kbd } from '@/components/ui/kbd';
import { Contrast } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const ModeToggle = () => {
  const { setTheme } = useTheme();

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
      if (event.key === 'd' && !isTyping) {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      }
    };
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
          Toggle Mode <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ModeToggle;
