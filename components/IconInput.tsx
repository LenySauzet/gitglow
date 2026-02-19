'use client';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import simpleIcons from '@/data/simple-icons.json';
import { useCover } from '@/hooks/useCover';
import React from 'react';
type IconInputProps = {
  name: string;
};

export function IconInput({ name }: IconInputProps) {
  const icons = simpleIcons.map((icon, index) => ({
    title: icon.title,
    index,
  }));
  const { values, setValues } = useCover();
  const anchor = useComboboxAnchor();

  return (
    <>
      <Combobox
        multiple
        autoHighlight
        items={icons}
        defaultValue={[]}
        value={values[name] as string[]}
        onValueChange={(value) => setValues({ ...values, [name]: value })}
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(values) => (
              <React.Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.index} value={item.title}>
                {item.title}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
