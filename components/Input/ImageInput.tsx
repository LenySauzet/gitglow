'use client';

import { FileUp, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from '@/components/ui/file-upload';
import { useCover } from '@/hooks/useCover';

export const title = 'Compact Dropzone';

type ImageInputProps = {
  name: string;
};

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ImageInput = ({ name }: ImageInputProps) => {
  const { values, setValues } = useCover();
  const [files, setFiles] = React.useState<File[]>([]);
  const imageValue = values[name] as string | undefined;
  React.useEffect(() => {
    if (!imageValue) {
      setFiles([]);
    }
  }, [name, imageValue]);

  const handleValueChange = React.useCallback(
    async (newFiles: File[]) => {
      setFiles(newFiles);
      if (newFiles.length === 0) {
        setValues({ ...values, [name]: '' });
        return;
      }
      const dataUrl = await fileToDataUrl(newFiles[0]);
      setValues({ ...values, [name]: dataUrl });
    },
    [name, values, setValues],
  );

  return (
    <FileUpload
      maxFiles={1}
      //   maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      value={files}
      onValueChange={handleValueChange}
      disabled={!!imageValue}
      //   multiple
    >
      <FileUploadDropzone className="flex-row gap-3 px-4 py-3 cursor-pointer">
        <FileUp className="size-5 text-muted-foreground" />
        <div className="flex-1 text-left">
          <p className="text-sm font-medium">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-muted-foreground">Max 1 file</p>
        </div>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X className="size-4" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export default ImageInput;
