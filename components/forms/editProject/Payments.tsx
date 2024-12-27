'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { InputField } from '../fields/InputField';
import { SelectField } from '../fields/SelectField';
import { paymentMilestonesChoices } from '@/const';
import { HitosPagoProyecto } from '@/types/HitosPago';

const FormSchema = z.object({
  numero_hito: z.string(),
  valor_hito: z.number(),
  descripcion_hito: z.string().optional(),
});

export const EditProjectPaymentsForm = ({ data }: { data: HitosPagoProyecto }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[900px]">
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numero_hito: data.numero_hito,
      valor_hito: data.valor_hito ? Number(data.numero_hito) : undefined,
      descripcion_hito: data.descripcion_hito,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-around gap-4"
      >
        <SelectField
          form={form}
          options={paymentMilestonesChoices}
          fieldId="numero_hito"
          fieldName="Numero_hito"
          className='w-[100px]'
        />
        <InputField form={form} fieldId="valor_hito" fieldName="Valor" containerClassName="min-w-[250px]" />
        <InputField
          form={form}
          fieldId="descripcion_hito"
          fieldName="Descripción"
          containerClassName="min-w-[250px]"
        />
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
