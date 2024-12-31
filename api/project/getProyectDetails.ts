import axios from 'axios';

import { ProjectDetail } from '@/types/Projects';

export const getProject = async (id: string): Promise<ProjectDetail | null> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}projects/details/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
