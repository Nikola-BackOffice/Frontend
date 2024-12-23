"use client"

import { getClientName } from '@/api/getClientName';
import { getProject } from '@/api/getProyect';
import { Project } from '@/types/Projects';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';





export default function ProjectShowPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);
  const [clientPhone, setClientPhone] = useState<string | null>(null);
  const [clientEmail, setClientEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(projectId as string);
      setProject(projectData);
      console.log(projectData.client);
      

      if (projectData.client) {
        console.log("existe cliente");
        const clientData = await getClientName(projectData.client);
        setClientName(clientData.nombre_completo);
        setClientPhone(clientData.telefono);
        setClientEmail(clientData.mail);
      }

      
    };
    fetchProject();
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid-cols-3 grid-rows-2 gap-4">
      
      {/* Información del Proyecto */}
      <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-2 text-center">{project.titulo || 'N/A'}</h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div>
            <h3 className="font-semibold">Key</h3>
            <p>{project.key || 'N/A'}</p>
          </div>
          
          <div>
            <h3 className="font-semibold">Sector</h3>
            <p>{project.comuna_sector || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Direccion</h3>
            <p>{project.direccion || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Fecha de Firma del Contrato</h3>
            <p>{project.fecha_firma_contrato || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Fecha de Inicio de Obra</h3>
            <p>{project.fecha_inicio_obra || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Fecha de Termino de Obra</h3>
            <p>{project.fecha_termino_obra || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Estado del Proyecto</h3>
            <p>{project.estado_proyecto || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Información del Cliente */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Información del Cliente</h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          
          <div>
            <h3 className="font-semibold">Nombre del Cliente</h3>
            <p>{project.client_name || 'N/A'}</p>
          </div>


          <div>
            <h3 className="font-semibold">Telefono</h3>
            <p>{clientPhone || 'N/A'}</p>
          </div>

          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{clientEmail || 'N/A'}</p>
          </div>
          

          <div>
            <h3 className="font-semibold">Numero de Cliente</h3>
            <p>{project.num_cliente_distribuidora || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Empresa Titular</h3>
            <p>{project.empresa_titular || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Información de la Planta */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Información de la Planta</h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div>
            <h3 className="font-semibold">Centro de Costo</h3>
            <p>{project.centro_costo || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Financiamiento</h3>
            <p>{project.financiamiento || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Precio de Venta Neto</h3>
            <p>{project.precio_venta_neto || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Coordenadas</h3>
            <p>{project.coordenadas || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Distribuidora</h3>
            <p>{project.distribuidora || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Opcion de Tarifa</h3>
            <p>{project.opcion_tarifa || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">RUT CDV</h3>
            <p>{project.rut_cdv || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Titular CDV</h3>
            <p>{project.titular_cdv || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Numero de Medidor</h3>
            <p>{project.numero_medidor || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Hitos de Pago del Proyecto */}  
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-2">Hitos de Pago del Proyecto</h2>
        <table className="min-w-full bg-white text-lg">
          <thead className="bg-indigo-500">
            <tr className="text-white">
              <th className="py-2">Número de Hito</th>
              <th className="py-2">Valor</th>
              <th className="py-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {project.hitos_pago_proyecto.map((hito, index) => (
              <tr
                key={hito.id}
                className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                <td className="py-2">{hito.numero_hito}</td>
                <td className="py-2">{hito.valor_hito}</td>
                <td className="py-2">{hito.descripcion_hito || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Procesos SEC del Proyecto */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm overflow-auto">
        <h2 className="text-2xl font-semibold mb-2">Procesos SEC del Proyecto</h2>
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
              <tr key={proceso.id} className="text-center">
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
    </div>
  );
}
