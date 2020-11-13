const app = getApp()
const utils = require('../../utils/util.js');
let Connection = null, RTC = null;

wx.setKeepScreenOn({
  keepScreenOn: true
})

let errorHandler = (error) => {
  error = error || { msg: 'error', code: 50000 }
  console.log(error)
  if ([50000, 50051, 50052, -1307].includes(error.code)) {
    setTimeout(() => { wx.navigateBack({ delta: 2 }) }, 500);
  }
  wx.hideLoading();
};
Page({
  data: {
    locales: wx.locales,
    roomId: '',
    userId: '',
    inviteUserIds: '',
    pusher: null,
    players: [],
    enableAudio: true,
    enableVideo: true,
    showModalStatus: false
  },
  // onShareAppMessage: function () {
  //   return { path: '/pages/login/login' }
  //   // wx.navigateTo({ url: '../login/login' })
  //  },
  onUnload: function () {
    let { data: { userId } } = this;
    this.setData({
      players: [],
      pusher: null
    })
    RTC.leave({ id: userId }).then(() => {
      Connection.disconnect();
    }, () => {
      Connection.disconnect();
    });
  },
  onLoad: function (options) {
    console.info('--------------',options)
    if(options.share){
      wx.navigateTo({ url: '../login/login' })
      return
    }

    let context = this;
    let { globalData: { $services } } = app;
    Connection = $services.Connection;
    RTC = $services.RTC;

    let { token, userId, roomId, streamType, userName } = options;
    wx.setNavigationBarTitle({
      title: `${roomId} - ${userId}`
    })
    console.info( streamType != -1 ? true : false)
    this.setData({
      roomId: roomId,
      userId: userId,
      streamType: streamType,
      userName: userName,
      enableVideo: streamType == 2 ? true : false,
      enableAudio: streamType != -1 ? true : false
    });
    token = decodeURIComponent(token);
    wx.showLoading({
      title: wx.locales.connecting,
    });

    Connection.connect({ token }).then(() => {
      wx.hideLoading()
      this.join()
    }).catch(err => {
      console.log("catch " + err);
    });
    RTC.init({
      id: roomId
    });
    RTC.memberWatch(({ type, user, error }) => {
      if (utils.isEqual(type, 'joined')) {
      }
      if (utils.isEqual(type, 'left')) {
        let { data: { players } } = context;
        players = players.filter((player) => {
          return !utils.isEqual(player.id, user.id);
        });
        context.setData({
          players: players
        })
      }
      if (utils.isEqual(type, 'error')) {
        errorHandler(error)
      }
      this.getUserList()
    });
    RTC.streamWatch(({ type, user, isSelf }) => {
      let { data: { players = [] } } = context;
      if (utils.isEqual(type, 'unmuted') || utils.isEqual(type, 'muted')) {
        return
      }
      // if (utils.isEqual(type, 'published')) {
      if (isSelf) {
        let { stream: { type } } = user
        console.info('type',user)
        context.setData({
          pusher: user,
          enableAudio: type == 1 ? false : true,
          enableVideo: type != 2 ? false : true
        })
      } else {
        for (let i = 0; i < players.length; i++) {
          let player = players[i];
          if (utils.isEqual(player.id, user.id)) {
            players.splice(i, 1);
            break;
          }
        }

        setTimeout(() => {
          user.mediaType = user.stream.type == 2 ? true : false
          players.push(user)
          context.setData({
            players: players
          })
        }, 200)
      }
      // }
    });
  },
  changeVideo() {
    let { streamType } = this.data
    if (streamType == 2) {
      let { data: { enableVideo, pusher: { stream: { type } } } } = this
      if (type == 2) {
        this.setData({
          enableVideo: !enableVideo
        })
        enableVideo ? this.disable() : this.enable()
      }
    }
  },
  changeAudio() {
    let { streamType } = this.data
    if (streamType != -1) {
      let { data: { enableAudio } } = this
      this.setData({
        enableAudio: !this.data.enableAudio
      })
      enableAudio ? this.mute() : this.unmute()
    }
  },
  join: function () {
    let { data: { userId, streamType, userName } } = this;
    RTC.join({
      id: userId,
      name: userName,
      mediaType: streamType,
    }).then(() => {
      this.getUserList()
    }, errorHandler);
  },
  leave: function () {
    let { data: { userId } } = this;
    this.setData({
      players: [],
      pusher: null
    })
    RTC.leave({ id: userId }).then(() => {
      Connection.disconnect().then(() => { }, errorHandler);
    }, errorHandler);

    wx.navigateTo({ url: '../login/login' })
  },
  mute: function () {
    let { data: { userId } } = this;
    let pusherContext = wx.createLivePusherContext();
    pusherContext.setMICVolume({
      volume: 0,
      fail: function () { },
      success: function () {
        RTC.mute({ id: userId }).then(() => { }, errorHandler);
      }
    })
  },
  unmute: function () {
    let pusherContext = wx.createLivePusherContext();
    let { data: { userId } } = this;
    pusherContext.setMICVolume({
      volume: 1,
      fail: function () { },
      success: function () {
        RTC.unmute({ id: userId }).then(() => { }, errorHandler);
      }
    })
  },
  disable: function () {
    let pusherContext = wx.createLivePusherContext();
    let { data: { userId } } = this;
    pusherContext.stopPreview({
      fail: function () { },
      success: function () {
        RTC.disable({ id: userId }).then(() => { }, errorHandler);
      }
    })
    
  },
  enable: function () {
    let pusherContext = wx.createLivePusherContext();
    let { data: { userId } } = this;
    pusherContext.startPreview({
      fail: function () { },
      success: function () {
        RTC.enable({ id: userId }).then(() => { }, errorHandler);
      }
    })
    
  },
  statechange(e) {
    const code = e.detail.code;
    console.log('live-pusher code:', code);
    if (code === -1307) {
      const livepusher = wx.createLivePusherContext();
      if (livepusher) {
        livepusher.stop({
          fail(res) {
            console.error(wx.locales.stopLivepusher, res);
          },
          success() {
            console.warn(wx.locales.reLivepusher);
            livepusher.start({
              fail(res) {
                console.error(wx.locales.livepusherError, res);
              },
              success() {
                console.info(wx.locales.livepusherSuccess);
              }
            });
          }
        });
      }
    }
  },
  powerDrawer: function (e) {
    let currentStatu = e.currentTarget.dataset.statu;
    this.animationUtil(currentStatu)
  },
  animationUtil: function (currentStatu) {
    let animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    this.animation = animation;
    animation.translateY(240).step();
    this.setData({ animationData: animation.export() })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData({ showModalStatus: false })
      }
    }.bind(this), 200)
    // 显示抽屉
    if (currentStatu == "open") {
      this.setData({ showModalStatus: true })
    }
  },
  getUserList: function () {
    RTC.getUserList().then((infos) => {
      let userInfos = []
      for (var key in infos) {
        let info = JSON.parse(infos[key])
        info.type = wx.locales[info.joinMode]
        userInfos.push(info)
      }
      this.setData({
        userList: userInfos
      })
    }).catch(function (err) {
      console.error('getRtcUserInfos', err)
    })
  },
  switchCamera: function () {
    let { streamType } = this.data
    if(streamType == 2){
      let pusherContext = wx.createLivePusherContext();
      pusherContext.switchCamera({
        fail: function (e) {
          console.info(e)
        },
        success: function (data) {
          console.info('switchCamera success', data)
        }
      })
    }

  }

});