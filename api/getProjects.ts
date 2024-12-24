import axios from 'axios';

import { Project } from '@/types/Projects';

export const getProjects = async (queryParams?: Record<string, any>): Promise<Project[]> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/projects/table/`, {
      headers: { 'Content-Type': 'application/json' },
      params: queryParams,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
