import axios from 'axios';
const baseURL = 'http://localhost:7001';
let config = {
  baseURL,
  timeout: 8000,
  // 跨域请求携带cookie
  withCredential: true,
}
export function get (url) {
 return axios({
    ...config,
    method: 'get',
    url
  }).then(res => res.data);
}
export function post (url, data) {
  return axios({
    ...config,
    method: 'post',
    url,
    data
  }).then(res => res.data);
}
export function put (url, data) {
  return axios({
    ...config,
    method: 'put',
    url,
    data
  }).then(res => res.data);
}
export function del (url, data=[]) {
  return axios({
    ...config,
    method: 'delete',
    data,
    url
  }).then(res => res.data);
}