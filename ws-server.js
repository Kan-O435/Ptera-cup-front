// ws-server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server running on ws://localhost:8080');

const rooms = {};

wss.on('connection', (ws) => {
  let roomId = null;
  let name = null;

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === 'join') {
        roomId = data.roomId;
        name = data.name;
        if (!rooms[roomId]) rooms[roomId] = new Set();
        rooms[roomId].add(ws);
        console.log(`${name} joined room ${roomId}`);
      }

      // ペンライト/コールの送信
      if (['penlight', 'call'].includes(data.type)) {
        rooms[roomId]?.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ name, ...data }));
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  });

  ws.on('close', () => {
    if (roomId && rooms[roomId]) rooms[roomId].delete(ws);
  });
});
