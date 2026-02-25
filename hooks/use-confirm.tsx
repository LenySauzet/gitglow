import { Button } from '@/components/ui/button';
import {
  DIALOG_CLOSE_DURATION_MS,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { JSX, useCallback, useRef, useState } from 'react';

export const useConfirm = (
  title: string,
  message: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closingRef = useRef(false);

  const confirm = () =>
    new Promise<boolean>((resolve) => setPromise({ resolve }));

  const close = useCallback(
    (result: boolean) => {
      if (closingRef.current) return;
      closingRef.current = true;
      promise?.resolve(result);
      setIsClosing(true);
      setTimeout(() => {
        setPromise(null);
        setIsClosing(false);
        closingRef.current = false;
      }, DIALOG_CLOSE_DURATION_MS);
    },
    [promise],
  );

  const show = promise !== null || isClosing;
  const open = promise !== null && !isClosing;

  const ConfirmationDialog = () => (
    <>
      {show && (
        <Dialog open={open} onOpenChange={(o) => !o && close(false)}>
          <DialogContent
            forceMount
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2">
              <Button onClick={() => close(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => close(true)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );

  return [ConfirmationDialog, confirm];
};
