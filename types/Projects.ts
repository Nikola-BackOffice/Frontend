import { Client } from './Clients';
import { ProcesoSec } from './ProcesoSEC';
import { PagoContratista } from './PagoContratista';
import { HitosPagoProyecto } from './HitosPago';

export interface ProjectBase {
  id: number;
  key: string;
  titulo: string;
  centro_costo: string;
  etapa_proyecto: string;
  estado_proyecto: any;

  client: number;
  vendedor: number;
  ingeniero: number;

  direccion: string;
  coordenadas: string;
  comuna_sector: string;

  rut_cdv: any;
  titular_cdv: any;
  distribuidora: string;
  numero_medidor: any;
  empresa_titular: string;
  num_cliente_distribuidora: string;

  opcion_tarifa: string;
  financiamiento: string;
  precio_venta_neto: number;
  facturacion_naturaleza: string;

  fecha_inicio_obra: any;
  fecha_termino_obra: any;
  fecha_firma_contrato: any;

  created_at: string;
  updated_at: string;
}

export interface Project extends ProjectBase {
  client_name: string;
  vendedor_name: string;
  ingeniero_name: string;
}

export interface ProjectDetail {
  id: number;
  key: string;
  titulo: string;
  centro_costo: string;
  etapa_proyecto: string;
  estado_proyecto: any;

  vendedor: number;
  ingeniero: number;

  direccion: string;
  coordenadas: string;
  comuna_sector: string;

  rut_cdv: any;
  titular_cdv: any;
  distribuidora: string;
  numero_medidor: any;
  empresa_titular: string;
  num_cliente_distribuidora: string;

  opcion_tarifa: string;
  financiamiento: string;
  precio_venta_neto: number;
  facturacion_naturaleza: string;

  fecha_inicio_obra: any;
  fecha_termino_obra: any;
  fecha_firma_contrato: any;

  created_at: string;
  updated_at: string;

  client_name: string;
  vendedor_name: string;
  ingeniero_name: string;

  client: Client;
  hitos_pago_proyecto: HitosPagoProyecto[];
  plantas: any[];
  procesos_sec: ProcesoSec[];
  pago_contratistas: PagoContratista[];
}

export type ProjectDetailGroup =
  | 'Proyecto'
  | 'Cliente'
  | 'Proceso SEC'
  | 'Pago Contratista'
  | 'Hitos de Pago Proyecto';
