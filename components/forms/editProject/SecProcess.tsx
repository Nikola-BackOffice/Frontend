'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../fields/InputField';
import { DatePickerField } from '../fields/DatePickerField';
import { SwitchField } from '../fields/SwitchField';

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
import { formatStrToDate } from '@/utils/dates';
import { areValuesEqual } from '@/utils/comparison';
import { ProcesoSec } from '@/types/ProcesoSEC';

interface ProcesoSecData extends ProcesoSec {
  proyecto: number;
}

const FormSchema = z.object({
  numero_proceso_sec: z.number().optional(),
  numero_solicitud_f3: z.number().optional(),
  numero_solicitud_f5: z.number().optional(),
  codigo_verif_te4: z.number().optional(),
  folio_presentacion_te4: z.number().optional(),
  folio_inscripcion_te4: z.number().optional(),
  fecha_ingreso_f3: z.date().optional(),
  fecha_ingreso_f5: z.date().optional(),
  fecha_ingreso_te4: z.date().optional(),
  fecha_ingreso_te6: z.date().optional(),
  fecha_aprobacion_f3: z.date().optional(),
  fecha_aprobacion_f5: z.date().optional(),
  fecha_aprobacion_te4: z.date().optional(),
  fecha_aprobacion_te6: z.date().optional(),
  manifestacion_conformidad: z.boolean().optional(),
});

export const EditProjectSECForm = ({ data, triggerRefetch }: { data: ProcesoSecData, triggerRefetch: () => void; }) => {
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
          <DialogTitle>Editar Procesos SEC</DialogTitle>
          <DialogDescription>
            Edita los campos del grupo procesos SEC y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SECForm data={data} onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SECForm = ({ data, onClose, triggerRefetch }: { data: ProcesoSecData; onClose: () => void, triggerRefetch: () => void; }) => {
  const { toast } = useToast();

  const defaultValues: z.infer<typeof FormSchema> = {
    numero_proceso_sec: data.numero_proceso_sec ? Number(data.numero_proceso_sec) : undefined,
    numero_solicitud_f3: data.numero_solicitud_f3 ? Number(data.numero_solicitud_f3) : undefined,
    numero_solicitud_f5: data.numero_solicitud_f5 ? Number(data.numero_solicitud_f5) : undefined,
    codigo_verif_te4: data.codigo_verif_te4 ? Number(data.codigo_verif_te4) : undefined,
    folio_presentacion_te4: data.folio_presentacion_te4
      ? Number(data.folio_presentacion_te4)
      : undefined,
    folio_inscripcion_te4: data.folio_inscripcion_te4
      ? Number(data.folio_inscripcion_te4)
      : undefined,
    fecha_ingreso_f3: formatStrToDate(data.fecha_ingreso_f3),
    fecha_ingreso_f5: formatStrToDate(data.fecha_ingreso_f5),
    fecha_ingreso_te4: formatStrToDate(data.fecha_ingreso_te4),
    fecha_ingreso_te6: formatStrToDate(data.fecha_ingreso_te6),
    fecha_aprobacion_f3: formatStrToDate(data.fecha_aprobacion_f3),
    fecha_aprobacion_f5: formatStrToDate(data.fecha_aprobacion_f5),
    fecha_aprobacion_te4: formatStrToDate(data.fecha_aprobacion_te4),
    fecha_aprobacion_te6: formatStrToDate(data.fecha_aprobacion_te6),
    manifestacion_conformidad: data.manifestacion_conformidad,
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-between gap-4 space-y-2 px-2"
      >
        <InputField form={form} fieldId="numero_proceso_sec" fieldName="Nº proceso SEC" />
        <InputField form={form} fieldId="numero_solicitud_f3" fieldName="Nº solicitud F3" />
        <InputField form={form} fieldId="numero_solicitud_f5" fieldName="Nº solicitud F5" />
        <InputField form={form} fieldId="codigo_verif_te4" fieldName="Código Verif. TE4" />
        <InputField
          form={form}
          fieldId="folio_presentacion_te4"
          fieldName="Folio Presentación TE4"
        />
        <InputField form={form} fieldId="folio_inscripcion_te4" fieldName="Folio Inscripción TE4" />

        <div className="h-2 w-full" />

        <DatePickerField
          form={form}
          fieldId="fecha_ingreso_f3"
          fieldName="Fecha Ingreso F3"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_f3"
          fieldName="Fecha Aprobación F3"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />

        <DatePickerField
          form={form}
          fieldId="fecha_ingreso_f5"
          fieldName="Fecha Ingreso F5"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_f5"
          fieldName="Fecha Aprobación F5"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />

        <DatePickerField
          form={form}
          fieldId="fecha_ingreso_te4"
          fieldName="Fecha Ingreso TE4"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_te4"
          fieldName="Fecha Aprobación TE4"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />

        <DatePickerField
          form={form}
          fieldId="fecha_ingreso_te6"
          fieldName="Fecha Ingreso TE6"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />
        <DatePickerField
          form={form}
          fieldId="fecha_aprobacion_te6"
          fieldName="Fecha Aprobación TE6"
          containerClassName="min-w-[250px]"
          placeholder=" "
        />

        <SwitchField
          form={form}
          fieldId="manifestacion_conformidad"
          fieldName="Manifest. Conformidad"
          containerClassName="w-[250px] justify-between"
        />
        <div className="flex w-1/2 items-center justify-center">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Form>
  );
};