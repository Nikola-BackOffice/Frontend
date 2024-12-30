'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../fields/InputField';
import { TextareaField } from '../fields/Textarea';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { areValuesEqual } from '@/utils/comparison';
import { PagoContratista } from '@/types/PagoContratista';

const FormSchema = z.object({
  instalador_name: z.string(),
  valor_pago: z.number().optional(),
  descripcion_pago: z.string().optional(),
});

export const EditProjectContractorPaymentsForm = ({ data }: { data: PagoContratista }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar campo Pago Contratistas</DialogTitle>
          <DialogDescription>
            Edita los campos del grupo pago contratistas y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditProjectForm data={data} onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

function EditProjectForm({ data, onClose }: { data: PagoContratista; onClose: () => void }) {
  const { toast } = useToast();

  const defaultValues = {
    instalador_name: data.instalador_name,
    valor_pago: data.valor_pago ? Number(data.valor_pago.slice(0,-3)) : undefined, // TODO: Fix value return from backend
    descripcion_pago: data.descripcion_pago,
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
      try {
        handleSubmit(data);
      } catch (error) {
        console.error('Submission failed:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: String(error),
        });
      }
    }
  
    function handleSubmit(data: z.infer<typeof FormSchema>) {
      if (areValuesEqual(defaultValues, data)) {
        toast({
          title: 'No hay cambios',
          description: 'No se realizaron cambios en el formulario.',
        });
        return;
      }
      toast({
        title: 'Se enviaron los siguientes cambios',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex items-center justify-around gap-4">
          <div className="flex flex-col gap-4">
            <InputField
              form={form}
              fieldId="instalador_name"
              fieldName="Instalador"
              className="w-[180px]"
            />
            <InputField form={form} fieldId="valor_pago" fieldName="Valor" className="" />
          </div>
          <TextareaField
            form={form}
            fieldId="descripcion_pago"
            fieldName="Descripción"
            className="h-[120px] w-[400px] text-start"
          />
        </div>
        <div className="flex w-full justify-center">
          <Button className="" type="submit">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Form>
  );
}
