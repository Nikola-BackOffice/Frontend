import { Staff } from '@/types/Staff';
import axios from 'axios';

export const getStaff = async (): Promise<Staff[]> => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/staff_nikola/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
