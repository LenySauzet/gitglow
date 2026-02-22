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

const PREVIEW_THEME_MODE_TOGGLE_KEYBOARD_SHORTCUT = 'f';

const PreviewThemeModeToggle = () => {
  const { lightMode, setLightMode } = useCover();

  const handleToggle = useCallback(() => {
    setLightMode(!lightMode);
  }, [lightMode, setLightMode]);

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
              Change the preview to light theme
            </FieldDescription>
          </FieldContent>
          <Switch
            id="switch-light-mode"
            checked={lightMode}
            onCheckedChange={setLightMode}
          />
        </Field>
      </FieldLabel>
    </FieldGroup>
  );
};

export default PreviewThemeModeToggle;
