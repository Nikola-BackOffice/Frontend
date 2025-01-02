import axios from 'axios';

import { ProjectDetail } from '@/types/Projects';

export const getDetailedProject = async (
  id: string | null = null,
  queryParams?: Record<string, any>
): Promise<ProjectDetail | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/${id ? `${id}/` : ''}detail/`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: queryParams,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
