import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useCover } from '@/hooks/useCover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

const TemplateForm = () => {
  const { template, values, setValues } = useCover();

  if (!template) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground/50 uppercase font-departure">
        {template?.name}
      </p>
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
                value={values[field.name] || ''}
              />
            )}
            {field.type === 'textarea' && (
              <Textarea
                id={field.name}
                placeholder={field.placeholder}
                onChange={(e) =>
                  setValues({ ...values, [field.name]: e.target.value })
                }
                value={values[field.name] || ''}
              />
            )}
            {field.type === 'select' && (
              <Select
                onValueChange={(value) =>
                  setValues({ ...values, [field.name]: value })
                }
                value={values[field.name] || ''}
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
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
};

export default TemplateForm;
