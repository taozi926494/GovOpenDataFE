import Cookies from 'js-cookie';

export function setAuth (value) {
  // 设置用户的cookies，有效时间为半月
  return Cookies.set('username', value, { expires: 15 })
}
  
export function getAuth () {
  return Cookies.get('username') ? Cookies.get('username') : null;
}