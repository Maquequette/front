import { axios } from "./useful";

export const getChallenges = async ({
  pageParam = 1,
  itemsPerPage = 9,
  paginate = true
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
}) => {
  return axios.get(`/api/challenges`, {
    headers: { Accept: "application/ld+json" },
    params: { page: pageParam, itemsPerPage, paginate }
  });
};

export const getChallengeTypes = async ({
  pageParam = 1,
  itemsPerPage,
  paginate = true
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
}) => {
  return axios.get(`/api/challenge_types`, {
    params: { page: pageParam, itemsPerPage, paginate }
  });
};

export const getCategories = async ({
  pageParam = 1,
  itemsPerPage,
  paginate = true
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
}) => {
  return axios.get(`/api/categories`, {
    params: { page: pageParam, itemsPerPage, paginate }
  });
};

export const getDifficulties = async ({
  pageParam,
  itemsPerPage,
  paginate = true
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
}) => {
  return axios.get(`/api/difficulties`, {
    params: { page: pageParam, itemsPerPage, paginate }
  });
};
