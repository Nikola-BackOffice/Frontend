'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDetailedProject } from '@/api/project/getDetailedProject';
import { EditProjectClientForm } from '@/components/forms/editProject/Client';
import { EditProjectContractorPaymentsForm } from '@/components/forms/editProject/ContractorPayments';
import { EditProjectPaymentsForm } from '@/components/forms/editProject/Payments';
import { EditProjectDetailsForm } from '@/components/forms/editProject/Project';
import { EditProjectSECForm } from '@/components/forms/editProject/SecProcess';
import { ProjectDetail, ProjectDetailGroup } from '@/types/Projects';
import { formatPhoneNumber } from '@/utils/phone';

interface Coordinates {
  lat: number;
  lng: number;
}

export default function ProjectShowPage() {
  const { projectId } = useParams() as { projectId: string };

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const triggerRefetch = () => setReloadKey((prev) => prev + 1);

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getDetailedProject(projectId);
      setProject(projectData);
    };
    fetchProject();
  }, [projectId, reloadKey]);

  if (!project) return <div className="py-10 text-center text-xl">Cargando información...</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-8 rounded-lg bg-gray-50 dark:bg-gray-900 p-8 shadow-md">
      {/* Título del Proyecto */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-grey-900 text-center text-4xl font-extrabold">
          {project.titulo || 'N/A'}
        </h1>
        <p className="text-example text-center text-2xl font-bold">
          {project.direccion || ''}
        </p>
        <p className=" text-center text-xl font-bold">
          {project.coordenadas || ''}
          {project.coordenadas && (
            <ProjectLocationLinks 
              coordinates={{
                lat: -33.2130539961841,
                lng: -70.7288208725082
              }} 
            />
          )}
        </p>
      </div>

      {/* Información del Proyecto */}
      <div className="col-span-3 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <EditProjectDetailsForm data={project} triggerRefetch={triggerRefetch} />
        </div>
        <div className="grid grid-cols-2 gap-6 text-lg">
          <div>
            <h3 className="font-semibold text-indigo-950">Key</h3>
            <p>{project.key || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Sector</h3>
            <p>{project.comuna_sector || ''}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Direccion</h3>
            <p>{project.direccion || ''}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Fecha de Firma del Contrato</h3>
            <p>{project.fecha_firma_contrato || ''}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Fecha de Inicio de Obra</h3>
            <p>{project.fecha_inicio_obra || ''}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Fecha de Termino de Obra</h3>
            <p>{project.fecha_termino_obra || ''}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Estado del Proyecto</h3>
            <p>{project.estado_proyecto || 'N/A'}</p>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-950">Etapa del Proyecto</h3>
            <p>{project.etapa_proyecto || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Información de la planta */}
      <div className="col-span-3 space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-grey-900 text-2xl font-bold">Planta</h2>
        <div className="grid grid-cols-2 gap-6 text-lg">
          <div>
            <h3 className="font-semibold text-indigo-950">Potencia (kW)</h3>
            <p>{project.plantas[0]?.potencia_kw || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Peak (kWp)</h3>
            <p>{project.plantas[0]?.peak_kwp || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Número de Baterías</h3>
            <p>{project.plantas[0]?.numero_baterias || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Sistema de Respaldo</h3>
            <p>{project.plantas[0]?.sistema_respaldo || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Baterías (kWh)</h3>
            <p>{project.plantas[0]?.baterias_kwh || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Tipo de Empalme</h3>
            <p>{project.plantas[0]?.tipo_empalme || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Modelo de Panel</h3>
            <p>{project.plantas[0]?.modelo_panel || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Tipo de Proyecto</h3>
            <p>{project.plantas[0]?.tipo_proyecto || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Tipo de Instalación</h3>
            <p>{project.plantas[0]?.tipo_instalacion || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-950">Potencia Conectada a Casa</h3>
            <p>{project.plantas[0]?.potenci_conectada_casa || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Información del Cliente */}
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <EditProjectClientForm data={project} triggerRefetch={triggerRefetch} />
        </div>
        <h2 className="text-grey-900 text-2xl font-bold">Cliente</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem title="Nombre del Cliente" value={project.client?.nombre_completo || 'N/A'} />
          <InfoItem title="Teléfono" value={project.client?.telefono} />
          <InfoItem title="Email" value={project.client?.mail} />
          <InfoItem title="Rut" value={project.client?.rut} />
        </div>
      </div>

      {/* Proceso SEC del Proyecto */}
      <div className="col-span-3 mt-6 overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          {project.procesos_sec.map((proceso) => (
            <EditProjectSECForm data={proceso} key={proceso.id} triggerRefetch={triggerRefetch} />
          ))}
        </div>
        <h2 className="text-grey-900 mb-4 rounded-lg text-center text-2xl font-bold">
          Proceso SEC del Proyecto
        </h2>
        <table className="min-w-full bg-white text-lg">
          <thead className="bg-indigo-500">
            <tr className="text-white">
              <th className="py-2">Proceso</th>
              <th className="py-2">Solicitud F3</th>
              <th className="py-2">Solicitud F5</th>
              <th className="py-2">Ingreso F3</th>
              <th className="py-2">Aprobación F3</th>
              <th className="py-2">Ingreso F5</th>
              <th className="py-2">Aprobación F5</th>
            </tr>
          </thead>
          <tbody>
            {project.procesos_sec.map((proceso) => (
              <tr key={proceso.id} className="text-center hover:bg-gray-200">
                <td className="py-2">{proceso.numero_proceso_sec}</td>
                <td className="py-2">{proceso.numero_solicitud_f3}</td>
                <td className="py-2">{proceso.numero_solicitud_f5}</td>
                <td className="py-2">{proceso.fecha_ingreso_f3 || 'N/A'}</td>
                <td className="py-2">{proceso.fecha_aprobacion_f3 || 'N/A'}</td>
                <td className="py-2">{proceso.fecha_ingreso_f5 || 'N/A'}</td>
                <td className="py-2">{proceso.fecha_aprobacion_f5 || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hitos de Pago */}
      <SectionTable
        title="Hitos de Pago del Proyecto"
        project={project}
        headers={['Número de Hito', 'Valor', 'Descripción', ' ']}
        group="Hitos de Pago Proyecto"
        triggerRefetch={triggerRefetch}
      />

      {/* Pagos Contratistas */}
      <SectionTable
        title="Pagos Contratistas"
        project={project}
        headers={['Instalador', 'Valor', 'Descripción', ' ']}
        group="Pago Contratista"
        triggerRefetch={triggerRefetch}
      />
    </div>
  );
}

function InfoItem({ title, value }: { title: string; value: string | null }) {
  const formattedValue = title === 'Teléfono' ? formatPhoneNumber(value) : value;

  return (
    <div>
      <h3 className="font-semibold text-indigo-600">{title}</h3>
      <p className="text-gray-700">{formattedValue || ' '}</p>
    </div>
  );
}

function SectionTable({
  title,
  project,
  headers,
  group,
  triggerRefetch,
}: {
  title: string;
  project: ProjectDetail;
  headers: string[];
  group: ProjectDetailGroup;
  triggerRefetch: () => void;
}) {
  const data: any =
    group === 'Hitos de Pago Proyecto' ? project.hitos_pago_proyecto : project.pago_contratistas;

  const formatCurrency = (value: number | string) => {
    // Convert to number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Check if the value is a valid number
    if (isNaN(numericValue)) {
      console.error('Invalid number:', value);
      return ' ';
    }

    // Format the number as currency without decimal places
    return `$${numericValue.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-grey-900 text-2xl font-bold">{title}</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-indigo-500 text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr
              key={item.id}
              className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
            >
              <td className="px-4 py-3">{item.instalador_name || item.numero_hito}</td>
              <td className="px-4 py-3">{formatCurrency(item.valor_pago || item.valor_hito)}</td>
              <td className="px-4 py-3">{item.descripcion_pago || item.descripcion_hito || ' '}</td>
              <td className="w-24">
                {group === 'Hitos de Pago Proyecto' ? (
                  <EditProjectPaymentsForm
                    data={project.hitos_pago_proyecto[index]}
                    triggerRefetch={triggerRefetch}
                  />
                ) : (
                  <EditProjectContractorPaymentsForm
                    data={project.pago_contratistas[index]}
                    triggerRefetch={triggerRefetch}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ProjectLocationLinks = ({ coordinates }: { coordinates: Coordinates }) => {
  const { lat, lng } = coordinates;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <div className="flex justify-center mt-2 space-x-6">
      <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        <i className="fab fa-google text-2xl ml-2"></i>
      </a>
      <a 
        href={wazeUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        <i className="fab fa-waze text-2xl ml-2"></i>
      </a>
    </div>
  );
};

const parseCoordinates = (coordString: string): Coordinates | null => {
  try {
    const [lat, lng] = coordString.split(',').map(coord => parseFloat(coord.trim()));
    return { lat, lng };
  } catch {
    return null;
  }
};
