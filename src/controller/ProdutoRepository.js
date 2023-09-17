import { Router } from 'express';
import {
  cadastroProduto,
  alterarProduto,
  consultarProdutoPorID,
  removerProdutoPorID,
} from '../repository/produtoRepository.js';

const endpoints = Router();

endpoints.post('/produto/cadastrar', async (req, resp) => {
  try {
    const {
      id_categoria,
      id_avaliacao,
      nm_produto,
      vl_preco_fis,
      ds_desc,
      vl_preco_pdf,
      vl_preco_kindle,
      vl_preco_promocional,
      bt_destaque,
      bt_promocao,
      bt_disponivel,
      qtd_estoque,
      bl_favorito,
    } = req.body;

    await cadastroProduto(
      id_categoria,
      id_avaliacao,
      nm_produto,
      vl_preco_fis,
      ds_desc,
      vl_preco_pdf,
      vl_preco_kindle,
      vl_preco_promocional,
      bt_destaque,
      bt_promocao,
      bt_disponivel,
      qtd_estoque,
      bl_favorito
    );

    resp.status(201).send('Produto cadastrado com sucesso.');
  } catch (error) {
    resp.status(500).send({ erro: 'Ocorreu um erro ao cadastrar o produto.' });
  }
});

endpoints.put('/produto/alterar/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const {
      nm_produto,
      vl_preco_fis,
      ds_desc,
      vl_preco_pdf,
      vl_preco_kindle,
      vl_preco_promocional,
      bt_destaque,
      bt_promocao,
      bt_disponivel,
      qtd_estoque,
      bl_favorito,
    } = req.body;

    await alterarProduto(
      id,
      nm_produto,
      vl_preco_fis,
      ds_desc,
      vl_preco_pdf,
      vl_preco_kindle,
      vl_preco_promocional,
      bt_destaque,
      bt_promocao,
      bt_disponivel,
      qtd_estoque,
      bl_favorito
    );

    resp.status(200).send('Produto alterado com sucesso.');
  } catch (error) {
    resp.status(500).send({ erro: 'Ocorreu um erro ao alterar o produto.' });
  }
});

endpoints.get('/produto/consultar/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const produto = await consultarProdutoPorID(id);

    if (!produto) {
      resp.status(404).send({ erro: 'Produto não encontrado.' });
    } else {
      resp.status(200).send(produto);
    }
  } catch (error) {
    resp.status(500).send({ erro: 'Ocorreu um erro ao consultar o produto.' });
  }
});

endpoints.delete('/produto/remover/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const resultado = await removerProdutoPorID(id);

    if (resultado) {
      resp.status(200).send('Produto removido com sucesso.');
    } else {
      resp.status(404).send({ erro: 'Produto não encontrado.' });
    }
  } catch (error) {
    resp.status(500).send({ erro: 'Ocorreu um erro ao remover o produto.' });
  }
});

export default endpoints;
