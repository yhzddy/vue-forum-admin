import axios from "../utils/request";

export function post(url, data) {
  return axios({
    method: "post",
    url: url,
    data: data
  });
}
