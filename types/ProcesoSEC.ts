export interface ProcesoSec {
  id: number;
  numero_proceso_sec: string;
  numero_solicitud_f3: string;
  numero_solicitud_f5: string;
  folio_presentacion_te4: string;
  codigo_verif_te4: string;
  folio_inscripcion_te4: string;
  fecha_ingreso_f3?: string;
  fecha_ingreso_f5?: string;
  fecha_aprobacion_f3?: string;
  fecha_aprobacion_f5?: string;
  fecha_ingreso_te4?: string;
  fecha_aprobacion_te4?: string;
  fecha_ingreso_te6?: string;
  fecha_aprobacion_te6?: string;
  manifestacion_conformidad: any;
  proyecto: number;

  created_at: string;
  updated_at: string;
}
