const app = require('./app');

const PORT = process.env.PORT || 3003; // O docker usa a porta 3001

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});