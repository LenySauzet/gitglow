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
import { SquircleDashed } from 'lucide-react';
import Image from 'next/image';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty';
import CleanValuesBtn from './CleanValuesBtn';
import ResetToDefaultValuesBtn from './ResetToDefaultValuesBtn';

const SettingsForm = () => {
  const template = useCurrentTemplate();
  const { values, setValues, setShowSettings } = useCover();

  if (!template)
    return (
      <div className="flex flex-col gap-4 mt-4 h-full">
        <p className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
          No template selected
        </p>
        <div className="group" onClick={() => setShowSettings(false)}>
          <div className="group-hover:scale-95 group-hover:opacity-75 transition-all rounded-md  overflow-hidden cursor-pointer shadow-sm aspect-video bg-card border border-dashed">
            <Empty className="h-full w-full flex items-center justify-center">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SquircleDashed size={24} />
                </EmptyMedia>
                <EmptyTitle>Select a template</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 mt-4 relative">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
          {template?.name}
        </p>
        <div className="flex items-center gap-1">
          <ResetToDefaultValuesBtn />
          <CleanValuesBtn />
        </div>
      </div>

      <div
        key={template.id}
        className={'group'}
        onClick={() => setShowSettings(false)}
      >
        <div className="border-primary group-hover:scale-95 group-hover:opacity-75 transition-all border rounded-md  overflow-hidden cursor-pointer shadow-sm">
          <Image
            src={`/templates/dark/${template.id}.svg`}
            alt={template.name}
            width={1280}
            height={720}
            className="w-full rounded-md hidden dark:block"
          />
          <Image
            src={`/templates/light/${template.id}.svg`}
            alt={template.name}
            width={1280}
            height={720}
            className="w-full rounded-md dark:hidden"
          />
        </div>
      </div>

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
