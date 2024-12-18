export interface Project {
  id: number;
  created_at: string;
  updated_at: string;
  key: string;
  titulo: string;
  num_cliente_distribuidora: string;
  comuna_sector: string;
  direccion: string;
  facturacion_naturaleza: string;
  empresa_titular: string;
  centro_costo: string;
  fecha_firma_contrato: string;
  financiamiento: string;
  precio_venta_neto: number;
  coordenadas: string;
  distribuidora: string;
  opcion_tarifa: string;
  rut_cdv: any;
  titular_cdv: any;
  numero_medidor: any;
  fecha_inicio_obra: any;
  fecha_termino_obra: any;
  estado_proyecto: any;
  client_id: number;
  vendedor_id: number;
  ingeniero_id: number;
}
