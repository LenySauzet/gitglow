import {
  ColorInput,
  FontInput,
  IconInput,
  ImageInput,
} from '@/components/Input';
import { PreviewThemeModeToggle } from '@/components/Settings';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCover } from '@/hooks/useCover';
import { useCurrentTemplate } from '@/hooks/useCurrentTemplate';

const SettingsForm = () => {
  const template = useCurrentTemplate();
  const { values, setValues } = useCover();

  if (!template)
    return (
      <p className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
        No template selected
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
        {template?.name}
      </p>
      <PreviewThemeModeToggle />

      <FontInput />

      <FieldGroup>
        {template?.fields.map((field) => (
          <Field key={field.name}>
            <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
            {field.description && (
              <FieldDescription>{field.description}</FieldDescription>
            )}
            {field.type === 'text' && (
              <Input
                id={field.name}
                placeholder={field.placeholder}
                onChange={(e) =>
                  setValues({ ...values, [field.name]: e.target.value })
                }
                value={(values[field.name] as string) || ''}
              />
            )}
            {field.type === 'textarea' && (
              <Textarea
                id={field.name}
                placeholder={field.placeholder}
                onChange={(e) =>
                  setValues({ ...values, [field.name]: e.target.value })
                }
                value={(values[field.name] as string) || ''}
              />
            )}
            {field.type === 'select' && (
              <Select
                onValueChange={(value) =>
                  setValues({ ...values, [field.name]: value })
                }
                value={(values[field.name] as string) || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === 'combobox' && (
              <Combobox
                onValueChange={(value) =>
                  setValues({ ...values, [field.name]: value ?? '' })
                }
                value={(values[field.name] as string) ?? ''}
              >
                <ComboboxInput placeholder={field.placeholder} />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {field.options.map((option) => (
                      <ComboboxItem key={option} value={option}>
                        {option}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}

            {field.type === 'color' && <ColorInput name={field.name} />}
            {field.type === 'icon' && <IconInput name={field.name} />}
            {field.type === 'image' && <ImageInput name={field.name} />}
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default SettingsForm;
