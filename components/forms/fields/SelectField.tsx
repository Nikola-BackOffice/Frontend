import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OptionsArray } from '@/types/Forms';
import { cn } from '@/utils/cn';

interface SelectFieldProps {
  form: UseFormReturn<any>;
  options: OptionsArray;
  fieldId: string;
  fieldName: string;
  placeholder?: string;
  formDescription?: string;
  className?: string;
}

export default function SelectField({
  form,
  options,
  fieldId,
  fieldName,
  placeholder = 'Seleccionar',
  formDescription,
  className,
}: SelectFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('xs:w-min flex w-52 shrink-0 flex-col', className)}>
          <FormLabel>{fieldName}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={(!field.value || field.value === "all") ? 'text-muted-foreground' : ''}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
