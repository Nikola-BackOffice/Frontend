import { UseFormReturn } from 'react-hook-form';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { OptionsArray } from '@/types/Forms';

interface ComboboxFieldProps {
  form: UseFormReturn<any>;
  options: OptionsArray;
  fieldId: string;
  fieldName: string;
  placeholder?: string;
  inputPlaceholder?: string;
  formDescription?: string;
  className?: string;
}

export default function ComboboxField({
  form,
  options,
  fieldId,
  fieldName,
  placeholder = 'Seleccionar',
  inputPlaceholder,
  formDescription,
  className,
}: ComboboxFieldProps) {
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
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[254px] justify-between',
                    (!field.value || field.value === 'all') && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[254px] p-0">
              <Command className="relative">
                <CommandInput placeholder={inputPlaceholder} className="h-9" />
                <CommandList className="relative">
                  <CommandEmpty>No se encontraron resultados</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          form.setValue(fieldId, option.value);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            option.value === field.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
