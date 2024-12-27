import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { InputField } from '../fields/InputField';

import { useToast } from '@/hooks/use-toast';
import { ProjectDetail } from '@/types/Projects';

const FormSchema = z.object({
  nombre_completo: z.string(),
  mail: z.string().email(),
  telefono: z.string(),
  rut: z.string(),
});

export const NewClientForm = ({ data, onClose }: { data: ProjectDetail; onClose: () => void }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const projectId = data.id;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(projectId, data);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap justify-around gap-4">
        <InputField
          form={form}
          fieldId="nombre_completo"
          fieldName="Nombre Completo"
          placeholder="John Doe"
        />
        <InputField form={form} fieldId="mail" fieldName="Correo" placeholder="john@gmail.com" />
        <InputField form={form} fieldId="telefono" fieldName="Teléfono" placeholder="56912345678" />
        <InputField form={form} fieldId="rut" fieldName="Rut" placeholder="12.345.678-9" />
        <Button type="submit" className="mt-4">
          Crear y asignar
        </Button>
      </form>
    </Form>
  );
};
