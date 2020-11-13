import locales from './utils/lanuage/locales'

App({
  onLaunch: function () {
    let lan,language
    try {
      language = wx.getStorageSync('language') || 'zh-cn'

    } catch (e) {
      language = 'zh-cn'
    }
    lan = locales[language].Content
    wx.locales = lan

  },
  globalData: {
    userInfo: null
  }
})