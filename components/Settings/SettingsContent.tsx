import { SettingsForm, TemplateList } from '@/components/Settings';
import { Tabs, TabsContent, TabsContents } from '@/components/ui/motion-tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCover } from '@/hooks/useCover';

const SettingsContent = () => {
  const { showSettings } = useCover();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <h3 className="text-sm uppercase tracking-wider text-muted-foreground/50 font-departure">
        Templates
      </h3>
      <div className="pb-8 h-full">
        <Tabs
          value={showSettings ? 'settings' : 'templates'}
          className="gap-4 h-full"
        >
          <TabsContents className="h-full">
            <TabsContent value="settings" className="h-full min-h-0">
              <div className="relative h-full min-h-0">
                <ScrollArea className="h-full px-1 pr-3">
                  <div className="pb-6">
                    <SettingsForm />
                  </div>
                </ScrollArea>
                <div
                  className={
                    'absolute z-10 w-full h-6 pointer-events-none bg-background backdrop-blur-md top-0 mask-[linear-gradient(to_bottom,black,transparent)]'
                  }
                />
                <div
                  className={
                    'absolute z-10 w-full h-6 pointer-events-none bg-background backdrop-blur-md bottom-0 mask-[linear-gradient(to_top,black,transparent)]'
                  }
                />
              </div>
            </TabsContent>
            <TabsContent value="templates" className="h-full min-h-0">
              <div className="relative h-full min-h-0">
                <ScrollArea className="h-full px-1 pr-3">
                  <div className="pb-6">
                    <TemplateList />
                  </div>
                </ScrollArea>
                <div
                  className={
                    'absolute z-10 w-full h-6 pointer-events-none bg-background backdrop-blur-md top-0 mask-[linear-gradient(to_bottom,black,transparent)]'
                  }
                />
                <div
                  className={
                    'absolute z-10 w-full h-6 pointer-events-none bg-background backdrop-blur-md bottom-0 mask-[linear-gradient(to_top,black,transparent)]'
                  }
                />
              </div>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsContent;
