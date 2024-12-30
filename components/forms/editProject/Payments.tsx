'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../fields/InputField';
import { SelectField } from '../fields/SelectField';
import { TextareaField } from '../fields/Textarea';

import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { paymentMilestonesChoices } from '@/const';
import { areValuesEqual } from '@/utils/comparison';
import { HitosPagoProyecto } from '@/types/HitosPago';

const FormSchema = z.object({
  numero_hito: z.string(),
  valor_hito: z.number().optional(),
  descripcion_hito: z.string().optional(),
});

export const EditProjectPaymentsForm = ({ data }: { data: HitosPagoProyecto }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar campo Hitos de Pago</DialogTitle>
          <DialogDescription>
            Edita los campos del grupo hitos de pago y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditProjectForm data={data} onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

function EditProjectForm({ data, onClose }: { data: HitosPagoProyecto; onClose: () => void }) {
  const { toast } = useToast();

  const defaultValues = {
    numero_hito: data.numero_hito,
    valor_hito: data.valor_hito ? Number(data.valor_hito.slice(0,-2)) : undefined, // TODO: Fix value return from backend
    descripcion_hito: data.descripcion_hito,
  };

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
            <SelectField
              form={form}
              options={paymentMilestonesChoices}
              fieldId="numero_hito"
              fieldName="Numero de hito"
            />
            <InputField form={form} fieldId="valor_hito" fieldName="Valor" className="" />
          </div>
          <TextareaField
            form={form}
            fieldId="descripcion_hito"
            fieldName="Descripción"
            className="h-[120px] w-[400px]"
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
