import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/utils/cn';
import { InputForm } from '../forms/example';

const DialogDemo = ({
  className,
  trigger,
  title,
  description,
  close,
  children,
}: {
  className?: string;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  close?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      {trigger}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <Dialog.Content className={cn("fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className)}>
      <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
        <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </Dialog.Title>
        <Dialog.Description className="text-sm text-muted-foreground">
          {description}
        </Dialog.Description>
        </div>
        {children}
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            {close}
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            aria-label="Close"
          >
            <X />
            <span className="sr-only">Close</span>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;