import ExampleForm from './ExampleForm';
import Templates from './templates';

const SettingsContent = () => {
  return (
    <aside className="flex flex-1 flex-col gap-4 overflow-hidden">
      <p className="text-sm text-muted-foreground/50 uppercase shrink-0 font-departure">
        Templates
      </p>
      <Templates />
      <div className="shrink-0">
        <p className="text-sm text-muted-foreground/50 uppercase shrink-0 font-departure">
          Form
        </p>
        <ExampleForm />
      </div>
    </aside>
  );
};

export default SettingsContent;
