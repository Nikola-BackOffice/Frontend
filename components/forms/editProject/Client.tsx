'use client';

import { useState } from 'react';

import { NewClientForm } from './ClientNew';
import { EditClientForm } from './ClientEdit';
import { ChangeClientForm } from './ClientChange';

import { Divider } from '@/components/Divider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProjectDetail } from '@/types/Projects';

export const EditProjectClientForm = ({ data }: { data: ProjectDetail }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Edita los campos del grupo cliente y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditClientForm data={data} onClose={() => setOpen(false)} />
          <Divider className="my-6" />

          <DialogTitle>Cambiar Cliente</DialogTitle>
          <ChangeClientForm data={data} onClose={() => setOpen(false)} />
          <Divider className="my-6" />

          <DialogTitle>Crear nuevo Cliente</DialogTitle>
          <NewClientForm data={data} onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
