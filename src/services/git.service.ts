import axios from "axios";

export const getAccessToken = (code: string) => {
  return axios.post("https://github.com/login/oauth/access_token", {});
};
