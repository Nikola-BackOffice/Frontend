import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';

interface InputFieldProps {
  form: UseFormReturn<any>;
  fieldId: string;
  fieldName: string;
  placeholder?: string;
  formDescription?: string;
  className?: string;
}

export const InputField = ({
  form,
  fieldId,
  fieldName,
  placeholder,
  formDescription,
  className,
}: InputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{fieldName}</FormLabel>

          <FormControl>
            <Input placeholder={placeholder} className="w-[254px]" {...field} />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
