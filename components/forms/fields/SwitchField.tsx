import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/utils/cn';

interface SwitchFieldProps {
  form: UseFormReturn<any>;
  fieldId: string;
  fieldName: string;
  formDescription?: string;
  containerClassName?: string;
  className?: string;
}

export const SwitchField = ({
  form,
  fieldId,
  fieldName,
  formDescription,
  containerClassName,
  className,
}: SwitchFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm',
            containerClassName
          )}
        >
          <div className="flex flex-col">
            <FormLabel>{fieldName}</FormLabel>

            <FormDescription>{formDescription}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} className={className} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
