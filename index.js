const express = require('express')
const webserver = express()
 .listen(3000, () => console.log(`Listening on ${3000}`))

 let myList = []

const { WebSocketServer } = require('ws')
const socketserver = new WebSocketServer({ port: 443 })
socketserver.on('connection', ws => {
 console.log('New client connected!')
 ws.on('close', () => console.log('Client has disconnected!'))
 ws.on('message', data => {
   socketserver.clients.forEach(client => {
    if(data.toString().endsWith("has connected to the chat")){
      const list = data.toString().split(" ")
      myList.push(list[0])
    }
     client.send(`${myList}`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})