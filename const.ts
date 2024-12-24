export const ETAPAS = [
  'Llamado de Bienvenida',
  'Visita Técnica',
  'Diseño e Ingeniería',
  'Obras',
  'Tramitación TE4',
  'Tramitación F5',
  'Cambio de medidor y Protocolo de Conexión',
  'Proyecto Finalizado',
];

export const initialVisibleProjectIds = ['titulo', 'comuna_sector', 'direccion', 'estado_proyecto', 'actions'];

export const etapasChoices = [
  { value: 'all', label: 'Todos' },
  { value: '1', label: 'Llamado de Bienvenida' },
  { value: '2', label: 'Visita Técnica' },
  { value: '3', label: 'Diseño e Ingeniería' },
  { value: '4', label: 'Obras' },
  { value: '5', label: 'Tramitación TE4' },
  { value: '6', label: 'Tramitación F5' },
  { value: '7', label: 'Cambio de medidor y Protocolo de Conexión' },
  { value: '8', label: 'Proyecto Finalizado' },
] as const;

export const estadosChoices = [ // rojo, amarillo, verde
  { value: 'all', label: 'Todos' },
  { value: 'en proceso', label: 'En proceso' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'cancelado', label: 'Cancelado' },
] as const;

export const comunasChoices = [
  { value: 'all', label: 'Todas' },
  { value: 'cerrillos', label: 'Cerrillos' },
  { value: 'cerro navia', label: 'Cerro Navia' },
  { value: 'conchalí', label: 'Conchalí' },
  { value: 'el bosque', label: 'El Bosque' },
  { value: 'estación central', label: 'Estación Central' },
  { value: 'huechuraba', label: 'Huechuraba' },
  { value: 'independencia', label: 'Independencia' },
  { value: 'la cisterna', label: 'La Cisterna' },
  { value: 'la florida', label: 'La Florida' },
  { value: 'la granja', label: 'La Granja' },
  { value: 'la pintana', label: 'La Pintana' },
  { value: 'la reina', label: 'La Reina' },
  { value: 'las condes', label: 'Las Condes' },
  { value: 'lo barnechea', label: 'Lo Barnechea' },
  { value: 'lo espejo', label: 'Lo Espejo' },
  { value: 'lo prado', label: 'Lo Prado' },
  { value: 'macul', label: 'Macul' },
  { value: 'maipú', label: 'Maipú' },
  { value: 'ñuñoa', label: 'Ñuñoa' },
  { value: 'pedro aguirre cerda', label: 'Pedro Aguirre Cerda' },
  { value: 'peñalolén', label: 'Peñalolén' },
  { value: 'providencia', label: 'Providencia' },
  { value: 'pudahuel', label: 'Pudahuel' },
  { value: 'quilicura', label: 'Quilicura' },
  { value: 'quinta normal', label: 'Quinta Normal' },
  { value: 'recoleta', label: 'Recoleta' },
  { value: 'renca', label: 'Renca' },
  { value: 'san bernardo', label: 'San Bernardo' },
  { value: 'san joaquín', label: 'San Joaquín' },
  { value: 'san miguel', label: 'San Miguel' },
  { value: 'san ramón', label: 'San Ramón' },
  { value: 'santiago', label: 'Santiago' },
  { value: 'vitacura', label: 'Vitacura' },
] as const;


export const ingenieroChoices = [
  { value: 'all', label: 'Todos' },
  { value: 'sebastián goza', label: 'Sebastián Goza' },
  { value: 'nicolás espinoza', label: 'Nicolás Espinoza' },
  { value: 'carlos taiba', label: 'Carlos Taiba' },
  { value: 'ignacio correa', label: 'Ignacio Correa' },
  { value: 'samuel clavel', label: 'Samuel Clavel' },
  { value: 'pedro popelka', label: 'Pedro Popelka' },
  { value: 'killian cooreman', label: 'Killian Cooreman' },
] as const;

export const vendedorChoices = [
  { value: 'all', label: 'Todos' },
  { value: 'nicolás espinoza', label: 'Nicolás Espinoza' },
  { value: 'benjamín bittelman', label: 'Benjamín Bittelman' },
  { value: 'pedro infante', label: 'Pedro Infante' },
  { value: 'benjamín anrique', label: 'Benjamín Anrique' },
  { value: 'josefa obrecht', label: 'Josefa Obrecht' },
  { value: 'francisco valdés', label: 'Francisco Valdés' },
  { value: 'vicente castillo', label: 'Vicente Castillo' },
  { value: 'sebastián sánchez', label: 'Sebastián Sánchez' },
] as const;

export const financiamientoChoices = [
  { value: 'all', label: 'Todos' },
  { value: 'webpay', label: 'Webpay' },
  { value: 'leasing', label: 'Leasing' },
  { value: 'directo', label: 'Directo' },
] as const;

export const bancosChoices = [
  { value: 'all', label: 'Todos' },
  { value: 'banco de chile', label: 'Banco de Chile' },
  { value: 'banco santander', label: 'Banco Santander' },
  { value: 'banco estado', label: 'Banco Estado' },
  { value: 'banco itau', label: 'Banco Itaú' },
  { value: 'banco bci', label: 'Banco BCI' },
  { value: 'banco scotiabank', label: 'Banco Scotiabank' },
  { value: 'banco security', label: 'Banco Security' },
  { value: 'banco falabella', label: 'Banco Falabella' },
  { value: 'banco ripley', label: 'Banco Ripley' },
  { value: 'banco consorcio', label: 'Banco Consorcio' },
  { value: 'banco internacional', label: 'Banco Internacional' },
  { value: 'banco bice', label: 'Banco BICE' },
  { value: 'banco credichile', label: 'Banco CrediChile' },
] as const;

export const booleanChoices = [
  { value: 'all', label: 'Todos' },
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
] as const;