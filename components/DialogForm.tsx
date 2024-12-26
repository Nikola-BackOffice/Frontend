"use client";

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditProjectForm } from './forms/editProject/Project';
import { ProjectDetail, ProjectDetailGroup } from '@/types/Projects';

export function DialogForm({ data, group }: { data: ProjectDetail; group: ProjectDetailGroup }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[900px] ">
        <DialogHeader>
          <DialogTitle>Editar campo {group}</DialogTitle>
          <DialogDescription>
            Edita los campos del grupo {group.toLocaleLowerCase()} y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditProjectForm data={data} onClose={() => setOpen(false)} />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
