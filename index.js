const express = require('express')
const webserver = express()
  .listen(3000, () => console.log(`Listening on ${3000}`))

const { WebSocketServer } = require('ws')
const socketserver = new WebSocketServer({ port: 443 })
socketserver.on('connection', ws => {
  console.log('New client connected!')
  ws.on('close', () => console.log('Client has disconnected!'))
  ws.on('message', data => {
    socketserver.clients.forEach(client => {

      let decoder = new TextDecoder("utf-8");
      let str = decoder.decode(data);
      console.log("JSON.parse(str).isMessage: ", JSON.parse(str).isMessage)
      

      if (JSON.parse(str).isMessage == false) {
        myList.push(JSON.parse(str).contents)
      }
      client.send(JSON.parse(str).contents)
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})