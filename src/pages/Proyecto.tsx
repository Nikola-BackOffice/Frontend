import { useEffect } from 'react';

const Proyecto = () => {
  const proyecto = {
    id: 1,
    client: 'Kisco Valdes',
    key: 'ABC123',
    titulo: 'ON 120 - Valle alegre',
    num_cliente_distribuidora: '456789',
    comuna_sector: 'Providencia',
    direccion: 'Av. Siempre Viva 742',
    facturacion_naturaleza: 'Persona Natural',
    empresa_titular: 'Solar Corp',
    centro_costo: '12345',
    fecha_firma_contrato: '2023-10-15',
    potencia_kw: 5.25,
    peak_kwp: 6.5,
    baterias_kwh: 12.75,
    backupbox: true,
    vendedor: 'Sebastián Goza',
    ingeniero: 'Nicolás Espinoza',
    financiamiento: 'Webpay',
    coordenadas: '-33.4489, -70.6693',

    distribuidora: 'ENEL',
    opcion_tarifa: 'BT1',
    cobrable_duem: false,
    numero_proceso_sec: 'SEC12345',
    numero_solicitud_f3: 'F312345',
    numero_solicitud_f5: 'F512345',
    fecha_ingreso_f3: '2023-11-01',
    fecha_aprobacion_f3: '2023-11-10',
    diferencial_tipo: 'Tipo A',
    diferencial_presenta_caidas: true,
    instalador: 'Pedro Pérez',
    presupuesto_instalador: 15000.0,
    pago_avance_50: 7500.0,
    pago_termino_obras: 7500.0,
    descripcion_extra_instaladores: 'Additional setup work.',
    titular_cdv: 'Jane Smith',
    numero_medidor: 'MED45678',
  };

  useEffect(() => {
    const loadMap = () => {
      const [lat, lng] = proyecto.coordenadas.split(',').map((coord) => parseFloat(coord.trim()));
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 15,
      });
      new window.google.maps.Marker({
        position: { lat, lng },
        map,
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [proyecto.coordenadas]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{proyecto.titulo}</h1>
            <p className="text-gray-500">
              Key: <span className="text-gray-700">{proyecto.key}</span>
            </p>
            <p className="text-sm text-gray-400">Cliente: {proyecto.client}</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>ID: {proyecto.id}</p>
            <p>Firmado: {proyecto.fecha_firma_contrato}</p>
          </div>
        </div>
      </div>

      {/* General Information */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">General Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400">Dirección</p>
            <p className="text-gray-700">{proyecto.direccion}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Sector</p>
            <p className="text-gray-700">{proyecto.comuna_sector}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Tipo de facturación</p>
            <p className="text-gray-700">{proyecto.facturacion_naturaleza}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Compañía titular</p>
            <p className="text-gray-700">{proyecto.empresa_titular}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Potencia (kW)</p>
            <p className="text-gray-700">{proyecto.potencia_kw}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Baterías (kWh)</p>
            <p className="text-gray-700">{proyecto.baterias_kwh}</p>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Instalador</p>
            <p className="text-gray-700">{proyecto.instalador}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Presupuesto</p>
            <p className="text-gray-700">${proyecto.presupuesto_instalador.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Backup Box</p>
            <p className="text-gray-700">{proyecto.backupbox ? 'Si ' : 'No'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Opción de tarifa</p>
            <p className="text-gray-700">{proyecto.opcion_tarifa}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Distribuidora</p>
            <p className="text-gray-700">{proyecto.distribuidora}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Coordenadas</p>
            <p className="text-gray-700">{proyecto.coordenadas}</p>
            <button
              className="text-blue-500 underline"
              onClick={() => navigator.clipboard.writeText(proyecto.coordenadas)}
            >
              Copiar Coordenadas
            </button>
          </div>
          <div className="col-span-2">
            <div id="map" style={{ height: '300px', width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
