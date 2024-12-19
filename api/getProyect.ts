 
import { Project } from "@/types/Projects";
import axios from "axios";

export const getProject = async (id: string): Promise<Project[]> => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/projects/${id}`,
      {
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
