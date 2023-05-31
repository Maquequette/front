import { axios } from "./useful";

export const getChallenges = async ({
  pageParam = 1,
  itemsPerPage = 9,
  paginate = true,
  order = "desc",
  orderBy = "createdAt",
  tags,
  difficulties,
  categories
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
  order?: "asc" | "desc";
  orderBy?: string;
  difficulties?: Array<any>;
  tags?: Array<any>;
  categories?: Array<any>;
}) => {
  const query = new URLSearchParams();
  query.append(`order[${orderBy}]`, order);
  query.append("page", pageParam.toString());
  query.append("itemsPerPage", itemsPerPage.toString());
  query.append("paginate", paginate.toString());
  difficulties?.map((item) => {
    query.append("difficulty.id[]", item.id);
  });

  tags?.map((item) => {
    query.append("tags.id[]", item.id);
  });

  categories?.map((item) => {
    query.append("type.category.id[]", item.id);
  });

  return axios.get(`/api/challenges`, {
    headers: { Accept: "application/ld+json" },
    params: query
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

export const getTags = async ({
  pageParam = 1,
  itemsPerPage,
  paginate = true
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
}) => {
  return axios.get(`/api/tags`, {
    params: { page: pageParam, itemsPerPage, paginate }
  });
};

export const getTagFamilies = async ({
  pageParam = 1,
  itemsPerPage=16,
  paginate = true
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
}) => {
  return axios.get(`/api/tag_families`, {
    params: { page: pageParam, itemsPerPage, paginate }
  });
};
