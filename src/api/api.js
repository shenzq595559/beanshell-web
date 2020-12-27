import fetch from './fetch.js'

// // 登录
// export function login (data) {
//   return fetch({
//     url: '',
//     method: 'post',
//     data
//   })
// }
// // 登出
// export function logout () {
//   return fetch({
//     url: '',
//     method: 'post'
//   })
// }
const initList = params => {
  return fetch({
    url: `/api/sys/qryAttrValueArray`,
    method: 'post',
    data: params
  })
}

const queryPurchaseList = params => {
  return fetch({
    url: `/api/purchaseList/queryPurchaseList`,
    method: 'post',
    data: params
  })
}


const updatePurchaseRow = params => {
  return fetch({
    url: `/api/purchaseList/updatePurchaseRow`,
    method: 'post',
    data: params
  })
}

const deletePurchaseRow = params => {
  return fetch({
    url: `/api/purchaseList/deletePurchaseRow`,
    method: 'post',
    data: params
  })
}

const articleList = params => {
  return fetch({
    url: `/api/search/query/listview/category/Android/count/${params.limit}/page/${params.page}`,
    method: 'get',
    params: ''
  })
}

const userList = params => {
  return fetch({
    url: '/api/person/getPersonListByCompany',
    method: 'get',
    params: params
  })
}

/**
 * 提交用户注册信息
 * @param params
 */
const postUserInfo = params => {
  return fetch({
    url: '',
    method: 'post',
    data: params
  })
}

/**
 * 验证邮箱 token是否过期
 * @param params
 */
const checkToken = params => {
  return fetch({
    url: '',
    method: 'get',
    params: params
  })
}
const apiList = {
  initList,
  queryPurchaseList,
  deletePurchaseRow,
  updatePurchaseRow,
  articleList,
  userList,
  postUserInfo,
  checkToken
}

export default apiList
