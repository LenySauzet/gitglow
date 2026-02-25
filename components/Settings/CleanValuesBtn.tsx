import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCover } from '@/hooks/useCover';
import { BrushCleaning } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const CleanValuesBtn = () => {
  const { setValues } = useCover();

  const handleCleanValues = () => {
    setValues({});
    toast.success('Values cleaned');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground/50 hover:text-muted-foreground"
          onClick={handleCleanValues}
        >
          <BrushCleaning size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Clean values</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CleanValuesBtn;
