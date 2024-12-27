import { UseFormReturn } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/cn';
import { formatDateToString } from '@/utils/dates';

interface DatePickerFieldProps {
  form: UseFormReturn<any>;
  fieldId: string;
  fieldName: string;
  placeholder?: string;
  formDescription?: string;
  className?: string;
}

export const DatePickerField = ({
  form,
  fieldId,
  fieldName,
  placeholder = 'Selecciona una fecha',
  formDescription,
  className,
}: DatePickerFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{fieldName}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn('text-left font-normal', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? formatDateToString(field.value) : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
