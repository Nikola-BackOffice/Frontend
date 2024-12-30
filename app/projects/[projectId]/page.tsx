"use client";

import { getClientName } from "@/api/getClientName";
import { getProject } from "@/api/getProyect";
import { Project } from "@/types/Projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectShowPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(projectId as string);
      setProject(projectData);

      if (projectData.client) {
        const clientData = await getClientName(projectData.client);
        setClientName(clientData.nombre_completo);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) return <div className="text-center text-xl py-10">Cargando información...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 shadow-md rounded-lg space-y-8">
      {/* Título del Proyecto */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-grey-900">{project.titulo || "N/A"}</h1>
      </div>

      {/* Información del Proyecto */}
      <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg">
        
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
      <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg">
        
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
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-grey-900">Información del Cliente</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem title="Nombre del Cliente" value={project.client?.nombre_completo || 'N/A'} />
          <InfoItem title="Teléfono" value={project.client?.telefono} />
          <InfoItem title="Email" value={project.client?.mail} />
        </div>
      </div>

      {/* Proceso SEC del Proyecto */}
      <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg overflow-auto mt-6">
        <h2 className="text-2xl font-bold mb-4  rounded-lg text-grey-900 text-center">Proceso SEC del Proyecto</h2>
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
        headers={["Número de Hito", "Valor", "Descripción"]}
      />

      {/* Pagos Contratistas */}
      <SectionTable
        title="Pagos Contratistas"
        project={project}
        headers={["Instalador", "Valor", "Descripción"]}
      />
    </div>
  );
}

function formatPhoneNumber(phone: string | null): string {
  if (!phone) return " ";
  
  // Check if the phone number starts with '569' and format it
  if (phone.startsWith('569')) {
    return `+${phone.slice(0, 3)} ${phone.slice(3)}`;
  }
  
  return phone;
}

function InfoItem({ title, value }: { title: string; value: string | null }) {
  const formattedValue = title === "Teléfono" ? formatPhoneNumber(value) : value;
  
  return (
    <div>
      <h3 className="font-semibold text-indigo-600">{title}</h3>
      <p className="text-gray-700">{formattedValue || " "}</p>
    </div>
  );
}

function SectionTable({ title, project, headers }: { title: string; project: Project; headers: string[] }) {
  const data = title === "Hitos de Pago del Proyecto" ? project.hitos_pago_proyecto : project.pago_contratistas;

  const formatCurrency = (value: number | string) => {
    // Convert to number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Check if the value is a valid number
    if (isNaN(numericValue)) {
      console.error("Invalid number:", value);
      return " ";
    }

    // Format the number as currency without decimal places
    return `$${numericValue.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-grey-900">{title}</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-indigo-500 text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="py-2 px-4 border border-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
            >
              <td className="py-3 px-4">{item.instalador_name || item.numero_hito}</td>
              <td className="py-3 px-4">{formatCurrency(item.valor_pago || item.valor_hito)}</td>
              <td className="py-3 px-4">{item.descripcion_pago || item.descripcion_hito || ' '}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
