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

export function put(url) {
  return axios({
    method: "put",
    url: url
  });
}

export function putWithData(url, data) {
  return axios({
    method: "put",
    url: url,
    data: data
  });
}

export function del(url) {
  return axios({
    method: "delete",
    url: url
  });
}
