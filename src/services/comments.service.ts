import { axios } from "./useful";

export const postComment = ({ content, parent }: { content: any, parent: string}) => {
    
    return axios.post("/api/comments", { "content": content, "parent": parent }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
}

export const getCommentsFrom = ({
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
  query.append("parent.id", parent.toString());

  const headers: any = {
    Accept: "application/ld+json"
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  return axios.get(`/api/comments/from`, {
    headers,
    params: query
  });
};

export const likeComment: Function = (commentId: number) => {
  return axios.post(`/api/comments/${commentId}/like`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};

export const unlikeComment = (commentId: number) => {
  return axios.delete(`/api/comments/${commentId}/like`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  });
};