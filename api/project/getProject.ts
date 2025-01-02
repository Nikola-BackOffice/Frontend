import axios from 'axios';

import { Project } from '@/types/Projects';

export const getProject = async (
  id: number | null = null,
  queryParams?: Record<string, any>
): Promise<Project[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/${id ? `${id}/` : ''}`,
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
