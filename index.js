const express = require('express')
const webserver = express()
  .listen(3000, () => console.log(`Listening on ${3000}`))

let userList = []
let messageList = []


const { WebSocketServer } = require('ws')
const socketserver = new WebSocketServer({ port: 443 })
socketserver.on('connection', ws => { 
  console.log('New client connected!')
  ws.on('close', () => console.log('Client has disconnected!'))
  ws.on('message', data => {
    const jsonString = new TextDecoder().decode(new Uint8Array(data))
    const jsonData = JSON.parse(jsonString)
    console.log("jsonData: ", jsonData)
    if (jsonData.isGreeting == true) {
      userList.push({
        "isMessage" : jsonData.isMessage,
        "isGreeting" : jsonData.isGreeting,
        "contents": jsonData.contents,
        "id": userList.length + 1
    })
    } else {
      console.log("Message is received!")
      messageList.push({
        "isMessage" : jsonData.isMessage,
        "isGreeting" : jsonData.isGreeting,
        "contents": jsonData.contents,
        "id": messageList.length + 1
    })


    }

    socketserver.clients.forEach(client => {
      console.log("userList: ", JSON.stringify(userList))
      console.log("messageList: ", JSON.stringify(messageList))
      client.send(JSON.stringify(userList))
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})