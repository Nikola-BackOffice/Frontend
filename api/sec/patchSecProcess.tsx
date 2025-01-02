import axios from 'axios';

import { ProcesoSec } from '@/types/ProcesoSEC';

export const patchSecProcess = async (data: Partial<ProcesoSec>): Promise<ProcesoSec> => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}process/${data.id}/`,
      JSON.stringify({ ...data }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as ProcesoSec;
  }
};
