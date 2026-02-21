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
import React, { useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

type IconInputProps = {
  name: string;
};

function SortableChip({ value }: { value: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: value });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto',
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center">
      <ComboboxChip className="flex items-center gap-1 pr-1.5 cursor-grab active:cursor-grabbing">
        <span
          {...attributes}
          {...listeners}
          className="inline-flex items-center text-muted-foreground/60 hover:text-muted-foreground"
          aria-label={`Drag to reorder ${value}`}
        >
          <GripVertical className="size-3" />
        </span>
        {value}
      </ComboboxChip>
    </div>
  );
}

const IconInput = ({ name }: IconInputProps) => {
  const icons = simpleIcons.map((icon, index) => ({
    title: icon.title,
    index,
  }));
  const { values, setValues } = useCover();
  const anchor = useComboboxAnchor();

  const selectedValues = (values[name] as string[]) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = selectedValues.indexOf(active.id as string);
        const newIndex = selectedValues.indexOf(over.id as string);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newValues = [...selectedValues];
          const [removed] = newValues.splice(oldIndex, 1);
          newValues.splice(newIndex, 0, removed);
          setValues({ ...values, [name]: newValues });
        }
      }
    },
    [selectedValues, values, name, setValues]
  );

  return (
    <>
      <Combobox
        multiple
        autoHighlight
        items={icons}
        defaultValue={[]}
        value={selectedValues}
        onValueChange={(value) => setValues({ ...values, [name]: value })}
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(chipValues: string[]) => (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToParentElement]}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={chipValues}
                  strategy={horizontalListSortingStrategy}
                >
                  {chipValues.map((value: string) => (
                    <SortableChip key={value} value={value} />
                  ))}
                </SortableContext>
                <ComboboxChipsInput />
              </DndContext>
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
};

export default IconInput;