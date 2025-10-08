import express from 'express';
import { fork } from 'child_process';
import path from 'path';

const app = express();

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

app.listen(3333, () => {
  console.log('Http server running on port: 3333');
});
