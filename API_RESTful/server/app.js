import express from 'express';
import routes from '../routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((request, response, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, request, response, next) => {
  if (err.status !== 404) console.log(err.stack);
  response.status(err.status).json({ err: err.message });
});

app.listen(3000);

export default app;