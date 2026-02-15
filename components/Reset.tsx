import { useCover } from '@/hooks/useCover';
import { RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';

const Reset = () => {
  const { reset } = useCover();
  return (
    <Button size="sm" variant="secondary" onClick={reset}>
      <RefreshCcw size={16} />
      Reset
    </Button>
  );
};

export default Reset;
