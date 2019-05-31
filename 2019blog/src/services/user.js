// eslint-disable-next-line
import { get, post, put, del } from './index';

function signup (data) {
  const url = '/api/signup';
  return post(url, data);
}
function signin (data) {
  const url = '/api/signin';
  return post (url, data);
}
function signout () {
  const url = '/api/signout';
  return get(url);
}
function createUser (data) {
  const url = '/api/user/set';
  return post(url, data);
}
function getAllUser ({pageNum, pageSize}) {
  const url = `/api/user/all?pageNum=${pageNum}&pageSize=${pageSize}`;
  return get(url);
}
function delUserApi (id) {
  const url = `/api/user/delete/${id}`;
  return del(url);
}
function updateUserApi (id, data) {
  const url = `/api/user/update/${id}`;
  return put(url, data);
}
function findOneUser(id) {
  const url = `/api/user/findOne/${id}`;
  return get(url);
}
export {
  signup,
  signin,
  signout,
  createUser,
  getAllUser,
  delUserApi,
  updateUserApi,
  findOneUser
}