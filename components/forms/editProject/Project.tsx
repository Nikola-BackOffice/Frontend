'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import SelectField from '../fields/SelectField';
import ComboboxField from '../fields/ComboBoxField';
import { ProjectDetail } from '@/types/Projects';
import InputField from '../fields/InputField';
import { comunasChoices, estadosChoices, etapasChoices } from '@/const';
import DatePickerField from '../fields/DatePickerField';

const FormSchema = z.object({
  titulo: z.string().optional(),
  key: z.string().optional(),
  estado: z.string().optional(),
  etapa: z.string().optional(),
  comuna_sector: z.string().optional(),
  direccion: z.string().optional(),
  fecha_firma_contrato: z.date().optional(),
  fecha_inicio_obra: z.date().optional(),
  fecha_termino_obra: z.date().optional(),
});

export function EditProjectForm({ data, onClose }: { data: ProjectDetail; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      titulo: data.titulo,
      key: data.key,
      etapa: data.etapa_proyecto,
      estado: data.estado_proyecto,
      direccion: data.direccion,
      comuna_sector: data.comuna_sector,
      fecha_firma_contrato: data.fecha_firma_contrato
        ? new Date(data.fecha_firma_contrato)
        : undefined,
      fecha_inicio_obra: data.fecha_inicio_obra ? new Date(data.fecha_inicio_obra) : undefined,
      fecha_termino_obra: data.fecha_termino_obra ? new Date(data.fecha_termino_obra) : undefined,
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
        className="flex flex-wrap items-center justify-around gap-4 space-y-6"
      >
        <InputField
          form={form}
          fieldId="titulo"
          fieldName="Título"
          className="mt-6 min-w-[250px]"
        />
        <InputField form={form} fieldId="key" fieldName="Key" className="min-w-[250px]" />
        <ComboboxField
          form={form}
          options={etapasChoices}
          fieldId="etapa"
          fieldName="Etapas"
          inputPlaceholder="Buscar etapa..."
          className="min-w-[250px]"
        />
        <SelectField
          form={form}
          options={estadosChoices}
          fieldId="estado"
          fieldName="Estados"
          className="min-w-[250px]"
        />
        <InputField form={form} fieldId="direccion" fieldName="Dirección" />
        <ComboboxField
          form={form}
          options={comunasChoices}
          fieldId="comuna_sector"
          fieldName="Comunas"
          inputPlaceholder="Buscar comuna..."
          className="min-w-[250px]"
        />
        <DatePickerField
          form={form}
          fieldId="fecha_firma_contrato"
          fieldName="Fecha firma contrato"
          className="min-w-[250px]"
        />
        <DatePickerField
          form={form}
          fieldId="fecha_inicio_obra"
          fieldName="Fecha inicio obras"
          className="min-w-[250px]"
        />
        <DatePickerField
          form={form}
          fieldId="fecha_termino_obra"
          fieldName="Fecha término obras"
          className="min-w-[250px] flex-shrink"
        />
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
