'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ComboboxField } from '../fields/ComboBoxField';

import { patchProject } from '@/api/project/patchProject';
import { getClients } from '@/api/client/getClients';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { areValuesEqual } from '@/utils/comparison';
import { ProjectDetail } from '@/types/Projects';
import { Client } from '@/types/Clients';

const FormSchema = z.object({
  id: z.number(),
  client: z.number(),
});

export const ChangeClientForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const [clients, setClients] = useState<Client[] | null>(null);

  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    client: data.client.id,
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
    }
  }

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    console.log('1. data', data);
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }

    const updatedProject = await patchProject(data);
    console.log('2. updatedProject', updatedProject);
    triggerRefetch();

    toast({
      title: 'Se enviaron los siguientes cambios',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {clients?.find((client) => client.id === data.id)?.nombre_completo}
          </code>
        </pre>
      ),
    });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      setClients(clients);
    };
    fetchClients();
  }, [data.client.id]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start justify-evenly gap-4 space-y-5"
      >
        <ComboboxField
          form={form}
          options={
            clients?.map((client) => ({
              value: client.id,
              label: client.nombre_completo,
            })) ?? []
          }
          fieldId="client"
          fieldName="Cambiar Cliente"
          inputPlaceholder="Buscar id..."
          formDescription="Seleccione el nuevo cliente para este proyecto"
        />
        <Button type="submit" className="mt-1">
          Cambiar Cliente
        </Button>
      </form>
    </Form>
  );
};
