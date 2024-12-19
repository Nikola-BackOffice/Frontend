
import { Client } from "@/types/Clients";
import axios from "axios";

export const getClientName = async (id: string): Promise<Client[]> => {
  const response = await axios.get(`http://127.0.0.1:8000/api/clients/${id}`);
  return response.data;
};
