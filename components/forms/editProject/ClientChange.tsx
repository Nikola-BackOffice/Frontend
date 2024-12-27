'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { ComboboxField } from '../fields/ComboBoxField';

import { getClients } from '@/api/getClients';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/Clients';
import { ProjectDetail } from '@/types/Projects';

const FormSchema = z.object({
  id: z.string().optional(),
});

export const ChangeClientForm = ({
  data,
  onClose,
}: {
  data: ProjectDetail;
  onClose: () => void;
}) => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data.client.id.toString(),
    },
  });

  function onSubmit() {
    try {
      console.log(selectedClient);
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{selectedClient?.nombre_completo}</code>
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

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      setClients(clients);
      const client = clients?.find((client) => client.id === data.client.id);
      setSelectedClient(client);
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
              value: client.id.toString(),
              label: client.nombre_completo,
            })) ?? []
          }
          fieldId="id"
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
