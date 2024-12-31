import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '../fields/InputField';

import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { areValuesEqual } from '@/utils/comparison';
import { ProjectDetail } from '@/types/Projects';
import { patchClient } from '@/api/client/patchClient';

const FormSchema = z.object({
  id: z.number(),
  nombre_completo: z.string().optional(),
  mail: z.string().email().optional(),
  telefono: z.string().optional(),
  rut: z.string().optional(),
});

export const EditClientForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.client.id,
    nombre_completo: data.client.nombre_completo,
    mail: data.client.mail,
    telefono: data.client.telefono,
    rut: data.client.rut,
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

    await patchClient(data);
    triggerRefetch();

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap justify-around gap-4">
        <InputField form={form} fieldId="nombre_completo" fieldName="Nombre Completo" />
        <InputField form={form} fieldId="mail" fieldName="Correo" />
        <InputField form={form} fieldId="telefono" fieldName="Teléfono" />
        <InputField form={form} fieldId="rut" fieldName="Rut" />
        <Button type="submit" className="mt-4">
          Guardar Cambios
        </Button>
      </form>
    </Form>
  );
};
