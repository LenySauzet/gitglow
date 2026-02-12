'use client';

import {
  categories,
  getTemplateImage,
  TemplateId,
  templates as templatesData,
} from '@/app/data/templates';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(
    null
  );
  const handleTemplateClick = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
  };
  return (
    <div className="flex flex-col gap-8 mb-4">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-4">
          <div className="sticky top-0 z-1 left-0 w-full h-12 pointer-events-none">
            <div className="absolute inset-0 h-full w-full bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />
            <h3 className="relative text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 h-12 pl-0 pointer-events-auto bg-transparent">
              <category.icon size={16} /> {category.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-7 items-start">
            {templatesData
              .filter((template) => template.categoryId === category.id)
              .map((template) => (
                <div
                  key={template.id}
                  className={cn(
                    'flex flex-col gap-2 border rounded-md p-1 cursor-pointer hover:bg-muted/50 opacity-75 hover:opacity-100 transition-all group text-muted-foreground/75',
                    selectedTemplate === template.id &&
                      'bg-muted/50 opacity-100 border-primary/75 text-primary'
                  )}
                  onClick={() => handleTemplateClick(template.id)}
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
    </div>
  );
};

export default Templates;
