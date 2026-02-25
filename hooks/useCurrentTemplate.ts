import { templates } from '@/data/templates';
import { useCover } from '@/hooks/useCover';
import { useMemo } from 'react';

export function useCurrentTemplate() {
  const templateId = useCover((s) => s.templateId);
  
  return useMemo(
    () => templates.find((t) => t.id === templateId) ?? null,
    [templateId],
  );
}
