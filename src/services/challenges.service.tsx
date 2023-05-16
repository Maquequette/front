import { axios } from "./useful";

export const getChallenges = async (page: number) => {
  return axios.get("/api/challenges");
};
