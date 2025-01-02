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
  containerClassName?: string;
  className?: string;
}

export const SelectField = ({
  form,
  options,
  fieldId,
  fieldName,
  placeholder = 'Seleccionar',
  formDescription,
  containerClassName,
  className,
}: SelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col xs:w-min', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  className,
                  !field.value || field.value === 'all' ? 'text-muted-foreground' : ''
                )}
              >
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
};
