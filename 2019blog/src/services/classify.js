// eslint-disable-next-line
import { get, post, put, del } from './index';
// qs是将对象转换成查询字符串的库
export function getClassifyList ({pageNum = 1, pageSize = 5, keyWord = ''}) {
  const url = '/api/classify/fenye';
  return get(`${url}?pageNum=${pageNum}&pageSize=${pageSize}&keyWord=${keyWord}`);
}
export function createClassify (data) {
  const url = '/api/classify/create';
  return post(url, data);
}
export function putClassify (id, data) {
  console.log(id);
  const url = `/api/classify/update/${id}`;
  return put(url, data);
}
export function delClassify (id, data) {
  const url = `/api/classify/delete/${id}`;
  console.log(arguments.length);
  console.log(id);
  console.log(data);
  if (arguments.length > 1) {
      return del(url, data);
  }
  return del(url);
}
export function getAllClassify () {
  const url = `/api/classify/findAll`;
  return get(url);
}