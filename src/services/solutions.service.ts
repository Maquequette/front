import { axios } from "./useful";

export const postSolution = (solution: FormData) => {
  return axios.post("/api/solutions", solution, {
    headers: {
      "Content-Type": "'multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};