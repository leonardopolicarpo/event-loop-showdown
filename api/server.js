import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fork } from 'child_process';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const publicPath = path.resolve(__dirname, '..', 'public');
console.log('Servindo arquivos estáticos da pasta:', publicPath)
app.use(express.static(publicPath));

app.get('/ping', (req, res) => res.send('pong'));

// Tarefa que simula um cálculo pesado
function heavyCalculation() {
  let count = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    count++;
  }
  return count;
}

app.get('/blocking', (req, res) => {
  const result = heavyCalculation();
  res.send(`Resultado: ${result}`);
});

app.get('/non-blocking', (req, res) => {
  const worker = fork(path.join(process.cwd(), 'api', 'worker.js'));

  worker.send('start');

  worker.on('message',(result) => {
    res.send(`Resultado do cálculo não bloqueante: ${result}`);
  });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado via Websocket!');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

setInterval(() => {
  io.emit('ping', 'pong');
}, 1000);

export default server;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3333;

  server.listen(PORT, () => {
    console.log(`Servidor rodando localmente em http://localhost:${PORT}`);
  });
}
