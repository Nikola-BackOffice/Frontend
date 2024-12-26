import { Client } from './Clients';
import { HitosPagoProyecto } from './HitosPago';
import { PagoContratista } from './PagoContratista';
import { ProcesoSec } from './ProcesoSEC';

export interface Project {
  id: number;
  key: string;
  titulo: string;
  centro_costo: string;
  etapa_proyecto: string;
  estado_proyecto: any;

  client_name: string;
  vendedor_name: string;
  ingeniero_name: string;

  client_id: number;
  vendedor_id: number;
  ingeniero_id: number;

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
  fecha_firma_contrato: string;

  created_at: string;
  updated_at: string;
}

export interface ProjectDetail {
  id: number;
  key: string;
  titulo: string;
  centro_costo: string;
  etapa_proyecto: string;
  estado_proyecto: string;

  client_name: string;
  vendedor_name: string;
  ingeniero_name: string;

  vendedor: number;
  ingeniero: number;

  direccion: string;
  coordenadas: any;
  comuna_sector: string;

  rut_cdv: any;
  titular_cdv: any;
  distribuidora: any;
  numero_medidor: any;
  empresa_titular: string;
  num_cliente_distribuidora: string;

  opcion_tarifa: any;
  financiamiento: string;
  precio_venta_neto: string;
  facturacion_naturaleza: string;

  fecha_inicio_obra: any;
  fecha_termino_obra: any;
  fecha_firma_contrato: string;

  client: Client;
  hitos_pago_proyecto: HitosPagoProyecto[];
  plantas: any[];
  procesos_sec: ProcesoSec[];
  pago_contratistas: PagoContratista[];

  created_at: string;
  updated_at: string;
}

export type ProjectDetailGroup = 'Proyecto' | 'Cliente' | 'Proceso SEC' | 'Pago Contratista' | 'Hitos de Pago Proyecto';