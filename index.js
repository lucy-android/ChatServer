const express = require('express')
const webserver = express()
  .listen(3000, () => console.log(`Listening on ${3000}`))

let userList = []

const { WebSocketServer } = require('ws')
const socketserver = new WebSocketServer({ port: 443 })
socketserver.on('connection', ws => { 
  console.log('New client connected!')
  ws.on('close', () => console.log('Client has disconnected!'))
  ws.on('message', data => {
    socketserver.clients.forEach(client => {
      const jsonString = new TextDecoder().decode(new Uint8Array(data))
      const jsonData = JSON.parse(jsonString)
      console.log("jsonString: ", jsonString)
      console.log("jsonString isGreeting: ", jsonData.isGreeting)
      if (jsonData.isGreeting == true) {
        userList.push(jsonData.contents)
        const userId = userList.length
        client.send(JSON.stringify({
          id: userId,
          isGreeting: true,
          contents: jsonData.contents
        })
        )
      }
    })
  })
  ws.onerror = function () {
    console.log('websocket error')
  }
})