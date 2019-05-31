// eslint-disable-next-line
import { get, post, put, del } from './index';
// qs是将对象转换成查询字符串的库
export function getArticleList ({pageNum = 1, pageSize = 5, keyWord = '', classifyId = ''}) {
  const url = '/api/article/keyWord';
  return get(`${url}?pageNum=${pageNum}&pageSize=${pageSize}&keyWord=${keyWord}&classifyId=${classifyId}`);
}
export function createArticle (data) {
  const url = '/api/article/create';
  return post(url, data);
}
export function putArticle (id, data) {
  console.log(id);
  const url = `/api/article/update/${id}`;
  return put(url, data);
}
export function delArticle (id, data) {
  const url = `/api/article/delete/${id}`;
  if (arguments.length > 1) {
      return del(url, data);
  }
  return del(url);
}
export function addCommnent (id, data) {
  const url = `/api/article/comment/${id}`;
  return post(url, data);
}
export function delCommnetApi (articleId, commentId) {
  const url = `/api/article/comment/${articleId}/${commentId}`;
  return del(url);
}
export function findOneArticleApi (id) {
  const url = `/api/article/findOne/${id}`;
  return get(url);
}