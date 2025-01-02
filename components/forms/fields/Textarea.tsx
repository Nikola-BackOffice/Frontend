import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils/cn';

interface TextAreaFieldProps {
  form: UseFormReturn<any>;
  fieldId: string;
  fieldName: string;
  placeholder?: string;
  formDescription?: string;
  containerClassName?: string;
  className?: string;
}

export const TextareaField = ({
  form,
  fieldId,
  fieldName,
  placeholder,
  formDescription,
  containerClassName,
  className = 'w-[254px]',
}: TextAreaFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>

          <FormControl>
            <Textarea placeholder={placeholder} className={className} {...field} />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
