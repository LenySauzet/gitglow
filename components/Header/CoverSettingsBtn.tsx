import { GitGlowLogo } from '@/components/Header';
import { SettingsContent } from '@/components/Settings';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
const CoverSettingsBtn = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary">
          <PanelLeft size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetHeader className="shrink-0 px-4 py-4">
          <SheetTitle>
            <GitGlowLogo />
          </SheetTitle>
        </SheetHeader>
        <aside className="flex-1 min-h-0 flex flex-col overflow-hidden px-4 py-4">
          <SettingsContent />
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export default CoverSettingsBtn;
