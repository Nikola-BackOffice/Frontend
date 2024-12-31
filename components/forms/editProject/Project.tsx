'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../fields/InputField';
import { SelectField } from '../fields/SelectField';
import { ComboboxField } from '../fields/ComboBoxField';
import { DatePickerField } from '../fields/DatePickerField';

import { patchProject } from '@/api/project/patchProject';
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
import { comunasChoices, estadosChoices, etapasChoices } from '@/const';
import { areValuesEqual } from '@/utils/comparison';
import { mapToProject } from '@/utils/convertions';
import { ProjectDetail } from '@/types/Projects';

const FormSchema = z.object({
  id: z.number(),
  titulo: z.string().optional(),
  key: z.string().optional(),
  estado_proyecto: z.string().optional(),
  etapa_proyecto: z.string().optional(),
  comuna_sector: z.string().optional(),
  direccion: z.string().optional(),
  fecha_firma_contrato: z.date().optional(),
  fecha_inicio_obra: z.date().optional(),
  fecha_termino_obra: z.date().optional(),
});

export const EditProjectDetailsForm = ({
  data,
  triggerRefetch,
}: {
  data: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Editar campo Proyecto</DialogTitle>
          <DialogDescription>
            Edita los campos del grupo proyecto y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditProjectForm
            data={data}
            onClose={() => setOpen(false)}
            triggerRefetch={triggerRefetch}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

function EditProjectForm({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    titulo: data.titulo,
    key: data.key,
    etapa_proyecto: data.etapa_proyecto,
    estado_proyecto: data.estado_proyecto,
    direccion: data.direccion,
    comuna_sector: data.comuna_sector,
    fecha_firma_contrato: data.fecha_firma_contrato
      ? new Date(data.fecha_firma_contrato)
      : undefined,
    fecha_inicio_obra: data.fecha_inicio_obra ? new Date(data.fecha_inicio_obra) : undefined,
    fecha_termino_obra: data.fecha_termino_obra ? new Date(data.fecha_termino_obra) : undefined,
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

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }
    const dataMapped = mapToProject(data as ProjectDetail);
    console.log('1. dataMapped', dataMapped);
    const updatedProject = await patchProject(dataMapped);
    triggerRefetch();
    console.log('2. updatedProject', updatedProject);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-around gap-4 space-y-6"
      >
        <InputField
          form={form}
          fieldId="titulo"
          fieldName="Título"
          containerClassName="mt-6 min-w-[250px]"
        />
        <InputField form={form} fieldId="key" fieldName="Key" containerClassName="min-w-[250px]" />
        <ComboboxField
          form={form}
          options={etapasChoices}
          fieldId="etapa_proyecto"
          fieldName="Etapas"
          inputPlaceholder="Buscar etapa..."
        />
        <SelectField
          form={form}
          options={estadosChoices}
          fieldId="estado_proyecto"
          fieldName="Estados"
        />
        <InputField form={form} fieldId="direccion" fieldName="Dirección" />
        <ComboboxField
          form={form}
          options={comunasChoices}
          fieldId="comuna_sector"
          fieldName="Comunas"
          inputPlaceholder="Buscar comuna..."
        />
        <DatePickerField
          form={form}
          fieldId="fecha_firma_contrato"
          fieldName="Fecha firma contrato"
        />
        <DatePickerField form={form} fieldId="fecha_inicio_obra" fieldName="Fecha inicio obras" />
        <DatePickerField form={form} fieldId="fecha_termino_obra" fieldName="Fecha término obras" />
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
