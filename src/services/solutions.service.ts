import { axios } from "./useful";

export const postSolution = (solution: FormData) => {
  return axios.post("/api/solutions", solution, {
    headers: {
      "Content-Type": "'multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};

export const getSolution = ({ id }: { id: number }) => {

  const headers: any = {
    Accept: "application/ld+json"
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  return axios.get(`/api/solutions/${id}`, { headers });
};

export const getSolutionsFrom = ({
  pageParam = 1,
  itemsPerPage = 3,
  paginate = true,
  order = "desc",
  orderBy = "CreatedAt",
  parent
}: {
  pageParam?: number;
  itemsPerPage?: number;
  paginate?: boolean;
  order?: "asc" | "desc";
  orderBy?: string;
  parent: number;
}) => {
  const query = new URLSearchParams();
  query.append(`order[${orderBy}]`, order.toUpperCase());
  query.append("page", pageParam.toString());
  query.append("itemsPerPage", itemsPerPage.toString());
  query.append("paginate", paginate.toString());
  query.append("challenge.id", parent.toString());

  const headers: any = {
    Accept: "application/ld+json"
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  return axios.get(`/api/solutions/from`, {
    headers,
    params: query
  });
};