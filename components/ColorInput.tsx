import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCover } from '@/hooks/useCover';

export const DEFAULT_COLOR = '#a1a1a1';

const COLORS = [
  {
    color: DEFAULT_COLOR,
    label: 'Neutral',
  },
  {
    color: '#f49f1e',
    label: 'Amber',
  },
  {
    color: '#1e3fad',
    label: 'Blue',
  },
  {
    color: '#00b5d4',
    label: 'Cyan',
  },
  {
    color: '#17bb81',
    label: 'Emerald',
  },
  {
    color: '#b43dc6',
    label: 'Fuchsia',
  },
  {
    color: '#5da600',
    label: 'Green',
  },
  {
    color: '#6469f0',
    label: 'Indigo',
  },
  {
    color: '#85cd22',
    label: 'Lime',
  },
  {
    color: '#ff6900',
    label: 'Orange',
  },
  {
    color: '#ed4a9b',
    label: 'Pink',
  },
  {
    color: '#a856f7',
    label: 'Purple',
  },
  {
    color: '#ce2931',
    label: 'Red',
  },
  {
    color: '#ff2157',
    label: 'Rose',
  },
  {
    color: '#00a3e9',
    label: 'Sky',
  },
  {
    color: '#1bb6a6',
    label: 'Teal',
  },
  {
    color: '#8e51ff',
    label: 'Violet',
  },
  {
    color: '#f0b100',
    label: 'Yellow',
  },
] as const;

type ColorInputProps = {
  name: string;
  placeholder?: string;
};

export function ColorInput({ name }: ColorInputProps) {
  const { values, setValues } = useCover();
  const value = (values[name] as string) || DEFAULT_COLOR;
  return (
    <Select
      value={value}
      onValueChange={(value) => setValues({ ...values, [name]: value })}
    >
      <SelectTrigger className="cursor-pointer">
        <SelectValue placeholder="select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {COLORS.map((color) => (
            <SelectItem key={color.color} value={color.color}>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color.color }}
              />
              {color.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
