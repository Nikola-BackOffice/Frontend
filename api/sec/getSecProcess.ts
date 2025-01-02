import axios from 'axios';

import { ProcesoSec } from '@/types/ProcesoSEC';

export const getSecProcess = async (
  id: number | null = null,
  queryParams?: Record<string, any>
): Promise<ProcesoSec[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}process/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: queryParams,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
