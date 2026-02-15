'use client';

import { categories, templates as templatesData } from '@/data/templates';
import { useCover } from '@/hooks/useCover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const Templates = () => {
  const { template, setTemplate } = useCover();
  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <div className="sticky top-4 z-1 mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <category.icon size={16} /> {category.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-7 items-start mt-2 mb-7">
            {templatesData
              .filter((templateData) => templateData.categoryId === category.id)
              .map((templateData) => (
                <div
                  key={templateData.id}
                  className={cn(
                    'flex flex-col gap-2 border rounded-md p-1 cursor-pointer hover:bg-muted/50 opacity-75 hover:opacity-100 transition-all group text-muted-foreground/75',
                    templateData.id === template?.id &&
                      'bg-muted/50 opacity-100 border-primary/75 text-primary'
                  )}
                  onClick={() => setTemplate(templateData.id)}
                >
                  <Image
                    src={`/templates/${templateData.id}.svg`}
                    alt={templateData.name}
                    width={1280}
                    height={720}
                    className="w-full rounded-md"
                  />
                  <span className="text-sm font-medium group-hover:text-foreground pl-1">
                    {templateData.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Templates;
