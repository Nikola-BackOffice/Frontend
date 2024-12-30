'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { getProject } from '@/api/project/getProyectDetails';
import { EditProjectSECForm } from '@/components/forms/editProject/SecProcess';
import { EditProjectClientForm } from '@/components/forms/editProject/Client';
import { EditProjectDetailsForm } from '@/components/forms/editProject/Project';
import { EditProjectPaymentsForm } from '@/components/forms/editProject/Payments';
import { EditProjectContractorPaymentsForm } from '@/components/forms/editProject/ContractorPayments';
import { formatPhoneNumber } from '@/utils/phone';
import { ProjectDetail, ProjectDetailGroup } from '@/types/Projects';

export default function ProjectShowPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(projectId as string);
      setProject(projectData);
    };
    fetchProject();
  }, [projectId]);

  if (!project) return <div className="py-10 text-center text-xl">Cargando información...</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-8 rounded-lg bg-gray-50 p-8 shadow-md">
      {/* Título del Proyecto */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-grey-900 text-center text-4xl font-extrabold">
          {project.titulo || 'N/A'}
        </h1>
      </div>

      {/* Información del Proyecto */}
      <div className="col-span-3 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <EditProjectDetailsForm data={project} />
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

      {/* Información del Cliente */}
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <EditProjectClientForm data={project} />
        </div>
        <h2 className="text-grey-900 text-2xl font-bold">Información del Cliente</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem title="Nombre del Cliente" value={project.client?.nombre_completo || 'N/A'} />
          <InfoItem title="Teléfono" value={project.client?.telefono} />
          <InfoItem title="Email" value={project.client?.mail} />
        </div>
      </div>

      {/* Proceso SEC del Proyecto */}
      <div className="col-span-3 mt-6 overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          {project.procesos_sec.map((proceso) => (
            <EditProjectSECForm data={proceso} key={proceso.id} />
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
      />

      {/* Pagos Contratistas */}
      <SectionTable
        title="Pagos Contratistas"
        project={project}
        headers={['Instalador', 'Valor', 'Descripción', ' ']}
        group="Pago Contratista"
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
}: {
  title: string;
  project: ProjectDetail;
  headers: string[];
  group: ProjectDetailGroup;
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
                  <EditProjectPaymentsForm data={project.hitos_pago_proyecto[index]} />
                ) : (
                  <EditProjectContractorPaymentsForm data={project.pago_contratistas[index]} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
