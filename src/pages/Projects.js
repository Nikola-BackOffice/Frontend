import React from 'react';

function Projects() {
    const projects = [
        {
            id: 1,
            key: 'key1',
            titulo: 'Project A',
            vendedor: 'Sebastián Goza',
            ingeniero: 'Nicolás Espinoza',
        },
        {
            id: 2,
            key: 'key2',
            titulo: 'Project B',
            vendedor: 'Carlos Taiba',
            ingeniero: 'Benjamín Bittelman',
        },
        
    ];
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
            <table className="min-w-full bg-gray-100">
                <thead>
                    <tr>
                        <th className="py-2 border">Key</th>
                        <th className="py-2 border">Título</th>
                        <th className="py-2 border">Vendedor</th>
                        <th className="py-2 border">Ingeniero</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td className="border px-4 py-2">{project.key}</td>
                            <td className="border px-4 py-2">{project.titulo}</td>
                            <td className="border px-4 py-2">{project.vendedor}</td>
                            <td className="border px-4 py-2">{project.ingeniero}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Projects;