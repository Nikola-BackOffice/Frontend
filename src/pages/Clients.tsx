import axios from "axios";
import { useEffect, useState } from "react";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 border">ID</th>
            <th className="py-2 border">Key</th>
            <th className="py-2 border">Nombre</th>
            <th className="py-2 border">Apellido</th>
            <th className="py-2 border">Mail</th>
            <th className="py-2 border">Telefono</th>
            <th className="py-2 border">RUT</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="text-center">
              <td className="border px-4 py-2">{client.id}</td>
              <td className="border px-4 py-2">{client.key}</td>
              <td className="border px-4 py-2">{client.nombre}</td>
              <td className="border px-4 py-2">{client.apellido}</td>
              <td className="border px-4 py-2">{client.mail}</td>
              <td className="border px-4 py-2">{client.telefono}</td>
              <td className="border px-4 py-2">{client.rut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
