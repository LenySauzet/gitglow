'use client';

import { categories, templates as templatesData } from '@/data/templates';
import { useCover } from '@/hooks/useCover';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const TemplateList = () => {
  const { templateId, setTemplate, setShowSettings } = useCover();

  const handleTemplateClick = (templateId: string) => {
    setTemplate(templateId);
    setShowSettings(true);
  };
  return (
    <div className="flex flex-col gap-2 mt-4 h-full">
      <p
        className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure flex items-center gap-1 cursor-pointer group"
        onClick={() => setShowSettings(true)}
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Go back
      </p>
      {categories.map((category) => (
        <div key={category.id}>
          <div className="sticky top-4 z-1 mt-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <category.icon size={16} /> {category.name}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-7 items-start mt-2 mb-7">
            {templatesData
              .filter((templateData) => templateData.categoryId === category.id)
              .map((templateData) => (
                <div
                  key={templateData.id}
                  className={cn(
                    'flex flex-col gap-2 border rounded-md p-1 cursor-pointer hover:bg-muted/50 transition-all group text-muted-foreground/75',
                    templateData.id === templateId &&
                      'bg-muted/50 border-primary/75 text-primary opacity-25 cursor-default',
                  )}
                  onClick={() =>
                    templateData.id === templateId
                      ? undefined
                      : handleTemplateClick(templateData.id)
                  }
                >
                  <Image
                    src={`/templates/dark/${templateData.id}.svg`}
                    alt={templateData.name}
                    width={1280}
                    height={720}
                    className="w-full rounded-md hidden dark:block"
                  />
                  <Image
                    src={`/templates/light/${templateData.id}.svg`}
                    alt={templateData.name}
                    width={1280}
                    height={720}
                    className="w-full rounded-md dark:hidden"
                  />
                  <span className="text-sm font-medium group-hover:text-foreground pl-1">
                    {templateData.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
