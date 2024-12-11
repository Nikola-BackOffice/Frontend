const Client = () => {
  const client = {
    name: 'Kisco Valdes',
    email: 'kisco@kisco.cl',
    phone: '+56912341234',
    address: 'Valle alegre 123',
    joinedDate: '2022-01-15',
    projects: [
      { id: 1, title: 'Instalación de paneles solares', status: 'Completado' },
      { id: 2, title: 'Prototocolo de conexión a red', status: 'En progreso' },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-600">
            {client.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
            <p className="text-gray-500">{client.email}</p>
            <p className="text-sm text-gray-400">Ingresado: {client.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Client Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-gray-600">{client.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Teléfono</p>
            <p className="text-gray-600">{client.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-gray-400">Dirección</p>
            <p className="text-gray-600">{client.address}</p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
        <div className="grid grid-cols-1 gap-4">
          {client.projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            >
              <div>
                <p className="text-gray-800 font-medium">{project.title}</p>
                <p className="text-sm text-gray-400">{project.status}</p>
              </div>
              <button className="text-indigo-600 font-semibold hover:underline">Ver</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
