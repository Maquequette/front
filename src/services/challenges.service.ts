import { axios } from "./useful";

export const getChallenges = ({
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
  query.append(`order[${orderBy}]`, order.toUpperCase());
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

  const headers: any = {
    Accept: "application/ld+json"
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  return axios.get(`/api/challenges`, {
    headers,
    params: query
  });
};

export const getChallengeTypes = ({
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

export const getCategories = ({
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

export const getDifficulties = ({
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

export const getTags = ({
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

export const getTagFamilies = ({
  pageParam = 1,
  itemsPerPage = 16,
  paginate = true,
  categories = []
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
  categories?: Array<any>;
}) => {
  const query = new URLSearchParams();
  query.append("itemsPerPage", itemsPerPage.toString());
  query.append("paginate", paginate.toString());
  query.append("page", pageParam.toString());

  categories?.map((item) => {
    query.append("category.id[]", item.id);
  });

  return axios.get(`/api/tag_families`, {
    params: query
  });
};

export const getChallenge = ({ id }: { id: number }) => {

  const headers: any = {
    Accept: "application/ld+json"
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  return axios.get(`/api/challenges/${id}`, { headers });
};

export const postChallenge = (challenge: FormData) => {
  return axios.post("/api/challenges", challenge, {
    headers: {
      "Content-Type": "'multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};

export const likeChallenge: Function = (challengeId: number) => {
  return axios.post(`/api/challenges/${challengeId}/like`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};

export const unlikeChallenge = (challengeId: number) => {
  return axios.delete(`/api/challenges/${challengeId}/like`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};

export const getLikedChallenges = ({
  pageParam = 1,
  itemsPerPage = 9,
  paginate = false,
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
  query.append(`order[${orderBy}]`, order.toUpperCase());
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

  return axios.get(`/api/challenges/liked`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      Accept: "application/ld+json"
    },
    params: query
  });
};

export const getCreatedChallenge = ({
  pageParam = 1,
  itemsPerPage = 9,
  paginate = false,
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
  query.append(`order[${orderBy}]`, order.toUpperCase());
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

  return axios.get(`/api/challenges/created`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      Accept: "application/ld+json"
    },
    params: query
  });
};

export const searchChallenges = (params: any) => {
  const query = new URLSearchParams(params);
  query.append("search", params);
  return axios.get("/api/challenges", { params: query });
};
