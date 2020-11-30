import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/authentication/admin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/account/authentication/register/member',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
