import * as dateFns from 'date-fns';
import { es } from 'date-fns/locale';

dateFns.setDefaultOptions({ locale: es });

export const formatDateToString = (date: Date) => {
  const day = dateFns.format(date, 'd');
  const month = dateFns.format(date, 'MMM');
  const year = dateFns.format(date, 'yyyy');

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} de ${capitalizedMonth}, ${year}`;
};

export const formatStrToDate = (date: string | undefined) => { // "24-07-2024"
  if (!date) return undefined;
  return dateFns.parse(date, "dd-MM-yyyy", new Date())
};

export function formatDateToISO(date: Date): string {
  return dateFns.format(date, 'yyyy-MM-dd');
}