const request = require('./request')
const { appkey } = require('../config')
const { createUid } = require('./util')

/**
 * 获取手机验证码 
 * @param {object} params 
 * @param {object} params.tel 手机号
 * @param {object} params.region 国际区号
 */
const getSmsCode = (phone) => {
  let url = '/user/send_code'
  let params = {
    phone: phone, 
    region: 86
  }
  return request.post(url, params)
}

/**
 * 验证手机验证码 
 * @param {object} params 
 * @param {object} params.appkey appkey
 * @param {object} params.phone 手机号
 * @param {object} params.region 国际区号
 * @param {object} params.code 手机验证码
 * @param {object} params.key 用户 id
 */

const verifySmsCode = (data) => {
  let { code, phone } = data
  let url = '/user/verify_code'
  let params = {
    code: code,
    phone: phone,
    appkey: appkey,
    key: createUid(phone),
    region: 86
  }
  return request.post(url, params)
}

module.exports = {
  getSmsCode,
  verifySmsCode
}