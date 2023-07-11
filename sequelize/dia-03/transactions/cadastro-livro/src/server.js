const app = require('./app');
const { PORT = 3003 } = process.env;

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));

