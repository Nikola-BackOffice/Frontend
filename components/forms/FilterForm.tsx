'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import SelectField from './fields/SelectField';
import ComboboxField from './fields/ComboBoxField';
import DatePickerField from './fields/DatePickerField';
import {
  bancosChoices,
  booleanChoices,
  comunasChoices,
  estadosChoices,
  etapasChoices,
  financiamientoChoices,
  ingenieroChoices,
  vendedorChoices,
} from '@/const';

const FormSchema = z.object({
  etapa: z.string({
    required_error: 'Seleccione una etapa.',
  }),
  estado: z.string({
    required_error: 'Seleccione un estado.',
  }),
  comuna: z.string({
    required_error: 'Seleccione una comuna.',
  }),
  vendedor: z.string({
    required_error: 'Seleccione un vendedor.',
  }),
  ingeniero: z.string({
    required_error: 'Seleccione un ingeniero.',
  }),
  contratista: z.string({
    required_error: 'Seleccione un contratista.',
  }),
  financiamiento: z.string({
    required_error: 'Seleccione un tipo de financiamiento.',
  }),
  banco: z.string({
    required_error: 'Seleccione un banco.',
  }),
  diferencial_tiene_caidas: z.string({
    required_error: 'Seleccione si el diferencial presenta caídas.',
  }),
  traspaso_hecho: z.string({
    required_error: 'Seleccione si el traspaso ya fue hecho.',
  }),
  sistema_tiene_respaldo: z.string({
    required_error: 'Seleccione si el sistema tiene respaldo.',
  }),
  fecha_firma_contrato: z.date().optional(),
  fecha_inicio_obra: z.date().optional(),
  fecha_termino_obra: z.date().optional(),
});
// "2020-01-01" -> date

export function FilterForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      etapa: '',
      estado: '',
      comuna: '',
      vendedor: '',
      ingeniero: '',
      contratista: '',
      financiamiento: '',
      banco: '',
      diferencial_tiene_caidas: '',
      traspaso_hecho: '',
      sistema_tiene_respaldo: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4 space-y-6 justify-around items-center">
        <ComboboxField
          form={form}
          options={etapasChoices}
          fieldId="etapa"
          fieldName="Etapas"
          inputPlaceholder="Buscar etapa..."
          className="min-w-[150px] justify-center pt-6"
        />
        <SelectField
          form={form}
          options={estadosChoices}
          fieldId="estado"
          fieldName="Estados"
          className="min-w-[150px]"
        />
        <ComboboxField
          form={form}
          options={comunasChoices}
          fieldId="comuna"
          fieldName="Comunas"
          inputPlaceholder="Buscar comuna..."
          className="min-w-[150px]"
        />
        <ComboboxField
          form={form}
          options={vendedorChoices}
          fieldId="vededor"
          fieldName="Vededores"
          inputPlaceholder="Buscar vededor..."
          className="min-w-[150px]"
        />
        <ComboboxField
          form={form}
          options={ingenieroChoices}
          fieldId="ingeniero"
          fieldName="Ingenieros"
          inputPlaceholder="Buscar ingeniero..."
          className="min-w-[150px]"
        />
        <ComboboxField
          form={form}
          options={ingenieroChoices}
          fieldId="contratista"
          fieldName="Contratistas"
          inputPlaceholder="Buscar contratista..."
          className="min-w-[150px]"
        />
        <SelectField
          form={form}
          options={financiamientoChoices}
          fieldId="financiamiento"
          fieldName="Financiamientos"
          placeholder="Seleccione"
          className="min-w-[150px]"
        />
        <ComboboxField
          form={form}
          options={bancosChoices}
          fieldId="banco"
          fieldName="Bancos"
          inputPlaceholder="Buscar banco..."
          className="min-w-[150px]"
        />
        <SelectField
          form={form}
          options={booleanChoices}
          fieldId="traspaso_hecho"
          fieldName="¿Traspaso hecho?"
          className="min-w-[150px]"
        />
        <SelectField
          form={form}
          options={booleanChoices}
          fieldId="sistema_tiene_respaldo"
          fieldName="¿Sistema tiene respaldo?"
          className="min-w-[150px]"
        />
        <SelectField
          form={form}
          options={booleanChoices}
          fieldId="diferencial_tiene_caidas"
          fieldName="¿Diferencial presenta caidas?"
          className="min-w-[150px]"
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
          fieldName="Fecha firma contrato"
          className="min-w-[250px]"
        />
        <DatePickerField
          form={form}
          fieldId="fecha_termino_obra"
          fieldName="Fecha firma contrato"
          className="flex-shrink min-w-[250px]"
        />
        <div className="col-span-12 flex items-center justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
