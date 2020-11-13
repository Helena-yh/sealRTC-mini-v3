const RongRTC = require('../../lib/RongRTC-wechat-minip-3.2.3');
const { ObserverList, JoinMode } = require('../../utils/util');

let STREAM_TAG = 'RongCloudRTC';

module.exports = (config, RongIMLib) => {
  let memberWatcher = new ObserverList();
  let rongRTC = new RongRTC({
    RongIMLib: RongIMLib,
    url: config.MS_URL,
    // debug: true,
    error: function(error){
      memberWatcher.notify({
        type: 'error',
        error
      });
    }
  });
  let { Room, Stream, Storage, Message } = rongRTC;
  let $room = null, $stream = null, $storage = null, $message = null;

  let memberWatch = (watcher) => {
    var force = true;
    memberWatcher.add(watcher, force);
  };
  let streamWatcher = new ObserverList();
  let streamWatch = (watcher) => {
    var force = true;
    streamWatcher.add(watcher, force);
  };
  let init = (room) => {
    let { id } = room;
    $room = new Room({
      id: id,
      joined: function (user) {
        memberWatcher.notify({
          type: 'joined',
          user
        });
      },
      left: function (user) {
        memberWatcher.notify({
          type: 'left',
          user
        });
      }
    });
    $stream = new Stream({
      published: function (user) {
        $stream.subscribe(user).then((user) => {
          streamWatcher.notify({
            type: 'published',
            user
          });
        });
      },
      unpublished: function (user) {
        $stream.unsubscribe(user).then(function () {
          streamWatcher.notify({
            user,
            type: 'unpublished'
          });
        });
      },
      disabled: function (user) {
        streamWatcher.notify({
          type: 'disabled',
          user
        });
      },
      enabled: function (user) {
        user.stream.type = 2
        streamWatcher.notify({
          type: 'enabled',
          user
        });
      },
      muted: function (user) {
        streamWatcher.notify({
          type: 'muted',
          user
        });
      },
      unmuted: function (user) {
        streamWatcher.notify({
          type: 'unmuted',
          user
        });
      }
    });

    $storage = new Storage();

    $message = new Message({
      received: (message) => {
        // 收到房间内消息
        console.info('收到房间内消息',message)
        memberWatcher.notify({type: 'change'});
      }
    });

  };
  let join = (user) => {
    return $room.join(user).then(() => {
      let joinTime = new Date().getTime()
      getUserList().then((infos) => {
        let userInfos = []
        for (var key in infos) {
          userInfos.push(JSON.parse(infos[key]))
        }

        let value = {
          userId: user.id,
          userName: user.name,
          joinMode: JoinMode[user.mediaType],
          joinTime: joinTime,
          master: userInfos.length > 0 ? 0 : 1
        }
        let message = {
          name: 'SealRTC:SetRoomInfo',
          content: {
            infoKey: user.id,
            infoValue: value
          }
        };
        $storage.set(user.id, JSON.stringify(value), message ).then((res)=>{
          memberWatcher.notify({type: 'change'});
        }).catch(function (err) {
          console.error('$storage.set', err)
        })

      }).catch(function (err) {
        console.error('getRtcUserInfos', err)
      })

      if(user.mediaType != "-1"){
        return publish(user)
      }
    })
  };
  let publish = (user) => {
    $stream.publish({
      id: user.id,
      stream: {
        type: parseInt(user.mediaType),
        tag: STREAM_TAG
      }
    }).then((_user) => {
      streamWatcher.notify({
        type: 'published',
        isSelf: true,
        user: _user
      })
    })
  };
  let leave = (user) => {
    return $room.leave(user)
  };
  let mute = (user) => {
    let { audio } = $stream;
    return audio.mute({
      id: user.id,
      stream: {
        tag: STREAM_TAG
      }
    });
  };
  let unmute = (user) => {
    let { audio } = $stream;
    return audio.unmute({
      id: user.id,
      stream: {
        tag: STREAM_TAG
      }
    });
  };
  let disable = (user) => {
    let { video } = $stream;
    return video.disable({
      id: user.id,
      stream: {
        tag: STREAM_TAG
      }
    });
  };
  let enable = (user) => {
    let { video } = $stream;
    return video.enable({
      id: user.id,
      stream: {
        tag: STREAM_TAG
      }
    });
  };
  let getUserList = () => {
    return $storage.get([])
  }
  return {
    init,
    join,
    leave,
    mute,
    unmute,
    disable,
    enable,
    memberWatch,
    streamWatch,
    getUserList
  };
};