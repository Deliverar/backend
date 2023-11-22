// websocket.js
const { Client } = require('@stomp/stompjs');
const WebSocket = require('ws');

// URL del servidor WebSocket
const serverUrl = 'ws://intappscore.azurewebsites.net/admin-personal';

// Crea una instancia de conexión WebSocket
const ws = new WebSocket(serverUrl);

// Crea una instancia de cliente STOMP
const stompClient = new Client({
  webSocketFactory: () => ws,
  debug: (str) => {
    console.log('STOMP: ' + str);
  },
  onConnect: (frame) => {
    console.log('Conexión STOMP abierta: ' + frame);

    // Aquí puedes suscribirte a colas o enviar mensajes STOMP
  },
  onStompError: (frame) => {
    console.error('Error STOMP: ' + frame.body);
  },
});

// Establece la función de manejo de errores en la conexión WebSocket
ws.onerror = (error) => {
  console.error('Error en la conexión WebSocket: ' + error.message);
};

// Establece la función de manejo de cierre de la conexión WebSocket
ws.onclose = () => {
  console.log('Conexión WebSocket cerrada');
};

// Conecta el cliente STOMP
stompClient.activate();

module.exports = stompClient;