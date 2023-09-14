import 'dotenv/config';
import  Express  from 'express';
import cors from 'cors';

import tarefasController from './controller/tarefasController.js'

let servidor = Express();
servidor.use(cors());
servidor.use(Express.json());

servidor.use(tarefasController);

servidor.listen(process.env.PORT, ()=> console.log('API SUBIU!!!! AEEEEEEEEEE'))