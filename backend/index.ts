import express from 'express';
import cors from 'cors';
import UserRouter from './src/routes/user.route';
import ExpedienteRouter from './src/routes/expediente.route';

const app = express();

app.use(express.json());

// Router
app.use(cors())
app.use('/users', UserRouter);
app.use('/expedientes', ExpedienteRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});