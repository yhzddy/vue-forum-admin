import axios from "../utils/request";

export function post(url, data) {
  return axios({
    method: "post",
    url: url,
    data: data
  });
}

export function get(url) {
  return axios({
    method: "get",
    url: url
  });
}

export function getWithParams(url, params) {
  return axios({
    method: "get",
    url: url,
    params: params
  });
}
