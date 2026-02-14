'use client';

import {
  categories,
  getTemplateImage,
  templates as templatesData,
} from '@/data/templates';
import { useCover } from '@/features/cover/hook/useCover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
const Templates = () => {
  const { templateId, setTemplateId } = useCover();
  return (
    <div className="overflow-hidden flex relative">
      <div className="absolute z-10 top-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute z-10 bottom-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
      <ScrollArea className="flex-1 pr-6">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="sticky top-4 z-1 mt-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <category.icon size={16} /> {category.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-7 items-start mt-2 mb-7">
              {templatesData
                .filter((template) => template.categoryId === category.id)
                .map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      'flex flex-col gap-2 border rounded-md p-1 cursor-pointer hover:bg-muted/50 opacity-75 hover:opacity-100 transition-all group text-muted-foreground/75',
                      templateId === template.id &&
                        'bg-muted/50 opacity-100 border-primary/75 text-primary'
                    )}
                    onClick={() => setTemplateId(template.id)}
                  >
                    <Image
                      src={getTemplateImage(template.id)}
                      alt={template.name}
                      width={1280}
                      height={720}
                      className="w-full rounded-md"
                    />
                    <span className="text-sm font-medium group-hover:text-foreground pl-1">
                      {template.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Templates;
