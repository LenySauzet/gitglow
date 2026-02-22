import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { FontPicker } from '@/components/ui/font-picker';
import { useCover } from '@/hooks/useCover';

const FontInput = () => {
  const { font, setFont } = useCover();
  return (
    <Field>
      <FieldLabel>Font</FieldLabel>
      <FieldDescription>
        Customize the typography of the titles and texts of the template.
      </FieldDescription>
      <FontPicker
        onChange={(font) => setFont(font)}
        value={font}
        className="w-full!"
      />
    </Field>
  );
};

export default FontInput;
