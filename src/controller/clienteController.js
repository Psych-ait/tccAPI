import { Router } from 'express';
import {
  inserirCliente,
  realizarLogin,
} from '../repository/clienteRepository.js';

const endpoints = Router();

endpoints.post('/cliente/cadastrar', async (req, resp) => {
  try {
    const { nm_cliente, ds_telefone, ds_email, ds_cpf, ds_senha } = req.body;

    const cliente = {
      nm_cliente,
      ds_telefone,
      ds_email,
      ds_cpf,
      ds_senha,
    };

    const dados = await inserirCliente(cliente);

    resp.status(201).send('Cliente cadastrado com sucesso.');
  } catch (error) {
    resp.status(500).send({ erro: 'Ocorreu um erro ao cadastrar o cliente.' });
  }
});

endpoints.post('/cliente/login', async (req, resp) => {
  try {
    const { ds_email, ds_senha } = req.body;

    const cliente = await realizarLogin(ds_email, ds_senha);

    resp.status(200).send(cliente);
  } catch (error) {
    resp.status(401).send({ erro: 'Credenciais inválidas.' });
  }
});

export default endpoints;
