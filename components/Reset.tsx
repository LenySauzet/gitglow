import { useCover } from '@/hooks/useCover';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const Reset = () => {
  const { reset } = useCover();
  const handleReset = () => {
    reset();
    toast.success('Reset to default values');
  };

  return (
    <Button size="sm" variant="secondary" onClick={handleReset}>
      <RefreshCcw size={16} />
      Reset
    </Button>
  );
};

export default Reset;
