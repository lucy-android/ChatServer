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
     console.log(`${data} has connected to the chat`)
     client.send(`${data} has connected to the chat`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})