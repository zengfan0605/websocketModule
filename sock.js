import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

var stompClient = null

function initConnection() {
  var socket = new SockJS(process.env.WS_URL + '/websocket')
  stompClient = Stomp.over(socket)
}

var Subscribe = {
  isConnected: function() {
    console.log(stompClient)
    if (stompClient === null || stompClient.connected === false) {
      return false
    } else {
      return true
    }
  },
  listen: function(destination, callback) {
    if (stompClient === null) {
      initConnection()
    }

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame)
      stompClient.subscribe(destination, callback)
    })
  },
  send: function(destination, data) {
    if (stompClient === null) {
      console.log('WebSocket通信已关闭，请刷新页面重新连接')
    } else {
      stompClient.send(destination, {}, data)
    }
  },
  disconnect: function() {
    if (stompClient !== null) {
      stompClient.disconnect()
      stompClient = null
    }
    console.log('Disconnected')
  }
}

export default Subscribe
