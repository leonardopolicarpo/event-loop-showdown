import express from 'express';

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

