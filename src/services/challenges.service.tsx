import { axios } from "./useful";

export const getChallenges = async ({
  page,
  itemsPerPage
}: {
  page: number;
  itemsPerPage: number;
}) => {
  return axios.get(`/api/challenges`, {
    params: { page, itemsPerPage }
  });
};
