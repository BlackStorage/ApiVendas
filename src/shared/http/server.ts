import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // modulo para tratamento de erros do express
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from './erros/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express(); // atribuição do xpress para uma variável;

app.use(cors()); // para aceitar requisições de qualquer requisitante;

app.use(express.json()); // para poder interpretar arquivos .json;

app.use('/files', express.static(uploadConfig.directory));

app.use(routes); // habilitação das rotas, no arquivo index.ts;

app.use(errors());

app.use(
  // middle, usado para tratamento de erros;
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Inernal servor error',
    });
  },
);

const porta = 3333;
app.listen(porta, () => {
  console.log('Server started on port: ', porta);
});
