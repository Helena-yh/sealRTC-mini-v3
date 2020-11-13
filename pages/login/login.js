const utils = require('../../utils/util');
const { getSmsCode, verifySmsCode } = require('../../utils/server')
const config = require('../../config')
const Services = require('../common/index')

const app = getApp()

Page({
  data: {
    locales: wx.locales,
    isHiddenTip: true,
    isHiddenRoomTip: true,
    isHiddenPhoneTip: true,
    isHiddenSmsCodeTip: true,
    isShowSmsCode: true,
    userNameLength: 8,
    userName: '',
    phone: '',
    second: 60,
    smsCodeBtn: wx.locales.smsCodeBtn,
    smsCode: '',
    streamType: 2
  },
  onShareAppMessage: function () { },
  onLoad: function () {
    wx.getStorage({
      key: 'userInfo',
      success:(res) => {
        let {data: { token, roomId, userName, phone}} = res
        if(roomId && userName && phone){
          this.setData({
            roomId,
            userName,
            phone,
            token
          })
        } 
      },
      fail: (e) => {
        // wx.showToast({
        //   title: wx.locales.verifySms,
        //   icon: 'none',
        //   duration: 2000
        // })
        this.setData({
          isShowSmsCode: false
        })
        // this.verifySmsCode()
      }
    })
  },
  onNameInput: function (e) {
    let { detail: { value: userName } } = e
    let { data: { userNameLength } } = this
    let isHiddenTip = userName.length < userNameLength || utils.isEmpty(userName)
    this.setData({ userName, isHiddenTip });
  },
  onRoomInput: function (e) {
    let reg = /^[a-zA-Z0-9_]{1,15}$/
    let { detail: { value: roomId } } = e
    let isHiddenRoomTip = reg.test(roomId) || utils.isEmpty(roomId)
    this.setData({ roomId, isHiddenRoomTip });
  },
  onPhoneInput: function (e) {
    let { detail: { value: phone } } = e
    let isHiddenPhoneTip = utils.isMPStrict(phone) || utils.isEmpty(phone)
    this.setData({ phone, isHiddenPhoneTip });
  },
  onSmsCodeInput: function(e) {
    let { detail: { value: smsCode } } = e
    this.setData({ smsCode, isHiddenSmsCodeTip: true });
  },
  getSmsCode: function (e) {
    let { data: { phone, isHiddenPhoneTip } } = this
    if (phone && isHiddenPhoneTip) {
      utils.timer(this)
      getSmsCode(phone).then((res) => {
        if (res.code == 200) {
          return;
        }
        wx.showToast({
          title: wx.locales.error,
          icon: "error"
        })
        
      }).catch((e) => {
        console.error(e)
      })
    }
  },
  login: function () {
    let { data: { token, roomId, isHiddenTip, isHiddenRoomTip, isHiddenPhoneTip, phone, userName } } = this
    let $services = Services({
      APPKEY: config.appkey,
      MS_URL: config.mediaServer,
    });
    app.globalData.$services = $services;
    if(token && isHiddenTip && isHiddenRoomTip && isHiddenPhoneTip  && roomId){
      wx.setStorage({
        key: 'userInfo',
        data: {
          token,
          phone,
          roomId,
          userName
        }
      })
      this.navigateTo(token)
      return;
    }  
    this.verifySmsCode()
  },
  radioChange(event){
    let streamType = event.detail.value !== '' ? event.detail.value : 2
    this.setData({
      streamType: streamType
    })
  },
  verifySmsCode() {
    let { data: { 
      smsCode, 
      phone, 
      isHiddenTip, 
      isHiddenRoomTip, 
      isHiddenPhoneTip, 
      roomId, 
      userName
    } } = this
    if (isHiddenTip && isHiddenRoomTip && isHiddenPhoneTip && smsCode && roomId) {
      let params = { code: smsCode, phone: phone }
      verifySmsCode(params).then((res) => {
        if (res.code == 200) {
          let { result: { token } } = res
          wx.setStorage({
            key: 'userInfo',
            data: {
              token,
              phone,
              roomId,
              userName
            }
          })
          this.navigateTo(token)
          return;
        }
        this.setData({ isHiddenSmsCodeTip : false})
      })
    }
  },
  navigateTo(token) {
    let { data: { phone, roomId, streamType, userName } } = this
    let userId = utils.createUid(phone)
    wx.navigateTo({
      url: `../main/main?roomId=${roomId}&token=${encodeURIComponent(token)}&userId=${userId}&streamType=${streamType}&userName=${userName}`,
    })
  }
})