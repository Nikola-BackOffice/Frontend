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

      if (projectData.client_id) {
        const clientData = await getClientName(projectData.client_id.toString());
        setClientName(clientData[0]?.nombre_completo);
        setClientPhone(clientData[0]?.telefono);
        setClientEmail(clientData[0]?.mail);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Detalles del Proyecto</h1>
      
      {/* Informacion del Proyecto */}
      <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Información del Proyecto</h2>
        <div className="grid grid-cols-2 gap-4">

          <div>
            <h3 className="font-semibold">Titulo</h3>
            <p>{project.titulo || 'N/A'}</p>
          </div>

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

      {/* Informacion del Cliente */}
      <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Información del Cliente</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Client ID</h3>
            <p>{project.client_id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Nombre del Cliente</h3>
            <p>{clientName || 'N/A'}</p>
          </div>


          <div>
            <h3 className="font-semibold">Telefono</h3>
            <p>{clientPhone || 'N/A'}</p>
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

      {/* Informacion de la Planta */}
      <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Información de la Planta</h2>
        <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
