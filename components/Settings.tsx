import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import Icon from './Icon';
import SettingsContent from './SettingsContent';
import { Button } from './ui/button';
const Settings = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary">
          <PanelLeft size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetHeader className="shrink-0 px-4 py-4">
          <SheetTitle className="flex items-center gap-2">
            <Icon width={25} height={25} />
            <span className="text-lg font-medium font-instrument tracking-wider">
              GitGlow
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-4 py-4">
          <SettingsContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
