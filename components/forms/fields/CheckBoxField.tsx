'use client';

import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { OptionsArray } from '@/types/Forms';

interface CheckBoxFieldProps {
  form: UseFormReturn<any>;
  options: OptionsArray;
  fieldId: string;
  fieldName: string;
  formDescription?: string;
  containerClassName?: string;
  className?: string;
}

export const CheckBoxField = ({
  form,
  options,
  fieldId,
  fieldName,
  formDescription,
  containerClassName,
  className,
}: CheckBoxFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={() => (
        <FormItem className={containerClassName}>
          <div className="mb-4">
            <FormLabel className="text-base">{fieldName}</FormLabel>
            <FormDescription>{formDescription}</FormDescription>
          </div>
          {options.map((option) => (
            <FormField
              key={option.value}
              control={form.control}
              name={fieldId}
              render={({ field }) => {
                return (
                  <FormItem
                    key={option.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.value])
                            : field.onChange(
                                field.value?.filter((value: string) => value !== option.value)
                              );
                        }}
                        className={className}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
