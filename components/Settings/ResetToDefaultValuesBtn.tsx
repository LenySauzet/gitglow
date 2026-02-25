import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCover } from '@/hooks/useCover';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const ResetToDefaultValuesBtn = () => {
  const { resetValuesToTemplateDefaults } = useCover();

  const handleResetToDefaultValues = () => {
    resetValuesToTemplateDefaults();
    toast.success('Reset to default values');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground/50 hover:text-muted-foreground"
          onClick={handleResetToDefaultValues}
        >
          <RotateCcw size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Reset to template defaults</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ResetToDefaultValuesBtn;
