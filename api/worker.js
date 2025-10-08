function heavyCalculation() {
  let count = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    count++;
  }
  return count;
}

process.on('message', (message) => {
  if (message === 'start') {
    const result = heavyCalculation();
    process.send(result);

    process.exit(0);
  }
});
