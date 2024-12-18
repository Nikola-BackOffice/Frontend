import { Client } from '@/types/Clients';
import axios from 'axios';

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/clients/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
