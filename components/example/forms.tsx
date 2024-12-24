'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import InputField from '../forms/fields/InputField';
import SelectField from '../forms/fields/SelectField';
import ComboboxField from '../forms/fields/ComboBoxField';
import CheckBoxField from '../forms/fields/CheckBoxField';
import DatePickerField from '../forms/fields/DatePickerField';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

export function ExampleForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [], // required for CheckBoxField
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <InputField form={form} fieldId="username" fieldName="Username" placeholder="shadcn" />
        <ComboboxField
          form={form}
          options={languages}
          fieldId="language"
          fieldName="Language"
          placeholder="Select a language"
          inputPlaceholder="Search a language..."
          formDescription="This is the language you want to use."
        />
        <SelectField
          form={form}
          options={emails}
          fieldId="email"
          fieldName="Email"
          placeholder="Select an email"
          formDescription="This is the email you want to use."
        />
        <DatePickerField
          form={form}
          fieldId="dob"
          fieldName="Date of birth"
          placeholder="Pick a date"
          formDescription="This is the date of birth you want to use."
        />
        <CheckBoxField form={form} options={items} fieldId="items" fieldName="Items" />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const items = [
  { value: 'recents', label: 'Recents' },
  { value: 'home', label: 'Home' },
  { value: 'applications', label: 'Applications' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'downloads', label: 'Downloads' },
  { value: 'documents', label: 'Documents' },
] as const;
const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;
const emails = [
  { label: 'm@example.com', value: 'm@example.com' },
  { label: 'm@google.com', value: 'm@google.com' },
  { label: 'm@support.com', value: 'm@support.com' },
] as const;
