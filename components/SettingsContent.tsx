import Templates from './templates';
import { ScrollArea } from './ui/scroll-area';

const SettingsContent = () => {
  return (
    <aside className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <p className="text-sm text-muted-foreground/50 uppercase shrink-0 font-departure">
        Templates
      </p>
      <ScrollArea className="flex-1 min-h-0 relative pr-6">
        <Templates />
        <div className="absolute bottom-0 w-full h-6 pointer-events-none bg-background to-transparent backdrop-blur-md [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
      </ScrollArea>
      <div className="shrink-0 mt-8 pt-4">
        <p className="text-sm text-muted-foreground/50 uppercase shrink-0 font-departure">
          Form
        </p>
        <form className="flex flex-col gap-3 mt-3">
          <label
            className="text-xs text-muted-foreground"
            htmlFor="input-example"
          >
            Champ Exemple
          </label>
          <input
            id="input-example"
            type="text"
            className="border rounded-md px-2 py-1"
            placeholder="Entrez quelque chose..."
          />
        </form>
      </div>
    </aside>
  );
};

export default SettingsContent;
