import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { useCover } from '@/hooks/useCover';
import { createShortcutHandler } from '@/lib/keyboard-shortcut';
import { useCallback, useEffect } from 'react';

const PREVIEW_THEME_MODE_TOGGLE_KEYBOARD_SHORTCUT = 'd';

const PreviewThemeModeToggle = () => {
  const { theme, setTheme } = useCover();

  const handleToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    const handleKeyboardShortcut = createShortcutHandler((event) => {
      if (event.key === PREVIEW_THEME_MODE_TOGGLE_KEYBOARD_SHORTCUT) {
        handleToggle();
      }
    });
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [handleToggle]);

  return (
    <FieldGroup className="w-full">
      <FieldLabel htmlFor="switch-light-mode" className="cursor-pointer">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Light Mode</FieldTitle>
            <FieldDescription>
              Switch to light theme appearance
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-light-mode" />
        </Field>
      </FieldLabel>
    </FieldGroup>
  );
};

export default PreviewThemeModeToggle;
