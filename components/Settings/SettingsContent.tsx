import { SettingsForm, TemplateList } from '@/components/Settings';
import { ScrollArea } from '@/components/ui/scroll-area';

const SettingsContent = () => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <h3 className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
        Templates
      </h3>
      <ScrollArea className="h-full pr-6 flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="absolute z-10 top-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute z-10 bottom-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="pb-8">
          <TemplateList />
          <SettingsForm />
        </div>
      </ScrollArea>
    </div>
  );
};

export default SettingsContent;
