import TemplateForm from './TemplateForm';
import Templates from './templates';
import { ScrollArea } from './ui/scroll-area';

const SettingsContent = () => {
  return (
    <aside className="flex flex-1 flex-col overflow-hidden">
      <p className="text-sm text-muted-foreground/50 uppercase font-departure">
        Templates
      </p>
      <ScrollArea className="h-full pr-6 flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="absolute z-10 top-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute z-10 bottom-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="pb-8">
          <Templates />
          {/* <ExampleForm /> */}
          <TemplateForm />
        </div>
      </ScrollArea>
    </aside>
  );
};

export default SettingsContent;
