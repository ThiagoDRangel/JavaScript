const app = require('./app');

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});