import axios from 'axios';

import { Project } from '@/types/Projects';

export const getProjects = async (
  table: boolean = false,
  queryParams?: Record<string, any>
): Promise<Project[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}projects/${table && 'details/'}`,
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
