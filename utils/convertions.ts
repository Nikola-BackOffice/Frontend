import { Client } from '@/types/Clients';
import { OptionsArray } from '@/types/Forms';
import { ProjectBase, ProjectDetail } from '@/types/Projects';

export function parseJsonToTypedObject(json: string): OptionsArray {
  const parsed = JSON.parse(json);

  // Ensure the parsed JSON is properly typed
  if (
    !Array.isArray(parsed) ||
    !parsed.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'label' in item &&
        'value' in item &&
        typeof item.label === 'string' &&
        typeof item.value === 'string'
    )
  ) {
    throw new Error('Invalid JSON format. Expected an array of { label: string; value: string }');
  }

  return parsed as OptionsArray;
}

// // Example usage:
// const jsonInput = `[
//   {
//     "value": "sebastián goza",
//     "label": "Sebastián Goza"
//   },
//   {
//     "value": "nicolás espinoza",
//     "label": "Nicolás Espinoza"
//   },
//   {
//     "value": "carlos taiba",
//     "label": "Carlos Taiba"
//   },
//   {
//     "value": "ignacio correa",
//     "label": "Ignacio Correa"
//   },
//   {
//     "value": "samuel clavel",
//     "label": "Samuel Clavel"
//   },
//   {
//     "value": "pedro popelka",
//     "label": "Pedro Popelka"
//   },
//   {
//     "value": "killian cooreman",
//     "label": "Killian Cooreman"
//   }
// ]`;

// const ingenieroChoices = parseJsonToTypedObject(jsonInput);
// console.log(ingenieroChoices);

export const removeEmptyValues = (obj: any) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== '' && value !== null
    )
  );

export function mapToProject(data: ProjectDetail): Partial<ProjectBase> {
  const projectPartial: Partial<ProjectBase> = removeEmptyValues({
    id: data.id,
    key: data.key,
    titulo: data.titulo,
    centro_costo: data.centro_costo,
    etapa_proyecto: data.etapa_proyecto,
    estado_proyecto: data.estado_proyecto,

    vendedor: data.vendedor,
    ingeniero: data.ingeniero,

    direccion: data.direccion,
    coordenadas: data.coordenadas,
    comuna_sector: data.comuna_sector,

    rut_cdv: data.rut_cdv,
    titular_cdv: data.titular_cdv,
    distribuidora: data.distribuidora,
    numero_medidor: data.numero_medidor,
    empresa_titular: data.empresa_titular,
    num_cliente_distribuidora: data.num_cliente_distribuidora,

    opcion_tarifa: data.opcion_tarifa,
    financiamiento: data.financiamiento,
    precio_venta_neto: data.precio_venta_neto,
    facturacion_naturaleza: data.facturacion_naturaleza,

    // fecha_inicio_obra: data.fecha_inicio_obra,
    // fecha_termino_obra: data.fecha_termino_obra,
    // fecha_firma_contrato: data.fecha_firma_contrato,
  });

  return projectPartial;
}

export function mapToClient(data: Client): Partial<Client> {
  const clientPartial: Partial<Client> = removeEmptyValues({
    id: data.id,
    nombre_completo: data.nombre_completo,
    mail: data.mail,
    telefono: data.telefono,
    rut: data.rut,
  });

  return clientPartial;
}
