import conexao from "./connection.js";

export function cadastroProduto(
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
) {
  try {
    if (
      !nm_produto ||
      !vl_preco_fis ||
      !ds_desc ||
      !vl_preco_pdf ||
      !vl_preco_kindle ||
      !vl_preco_promocional ||
      !bt_destaque ||
      !bt_promocao ||
      !bt_disponivel ||
      !qtd_estoque ||
      !bl_favorito
    ) {
      throw new Error('Todos os campos devem ser preenchidos.');
    }

    const sql = `
      INSERT INTO tb_produto (
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    conexao.query(
      sql,
      [
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
      ],
      (error, results, fields) => {
        if (error) {
          console.error('Erro ao cadastrar o produto:', error);
          throw error;
        }
        console.log('Produto cadastrado com sucesso.');
        conexao.end();
      }
    );
  } catch (error) {
    console.error('Erro geral:', error);
  }
}


export function alterarProduto(
  id_produto,
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
) {
  try {
    if (!id_produto) {
      throw new Error('O ID do produto é obrigatório para a alteração.');
    }
    const sql = `
      UPDATE tb_produto
      SET
        nm_produto = ?,
        vl_preco_fis = ?,
        ds_desc = ?,
        vl_preco_pdf = ?,
        vl_preco_kindle = ?,
        vl_preco_promocional = ?,
        bt_destaque = ?,
        bt_promocao = ?,
        bt_disponivel = ?,
        qtd_estoque = ?,
        bl_favorito = ?
      WHERE id_produto = ?
    `;

    conexao.query(
      sql,
      [
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
        id_produto,
      ],
      (error, results, fields) => {
        if (error) {
          console.error('Erro ao alterar o produto:', error);
          throw error;
        }
        console.log('Produto alterado com sucesso.');
        conexao.end();
      }
    );
  } catch (error) {
    console.error('Erro geral:', error);
  }
}


export async function consultarProdutoPorID(id_produto) {
  try {
    if (!id_produto || typeof id_produto !== 'number' || id_produto <= 0) {
      throw new Error('ID de produto inválido.');
    }

    const sql = `SELECT * FROM tb_produto WHERE id_produto = ?`;
    const [rows] = await conexao.query(sql, [id_produto]);

    return rows.length ? rows[0] : null;
  } catch (error) {
    throw error;
  }
}

export async function removerProdutoPorID(id_produto) {
  try {
    if (!id_produto || typeof id_produto !== 'number' || id_produto <= 0) {
      throw new Error('ID de produto inválido.');
    }

    const sql = `DELETE FROM tb_produto WHERE id_produto = ?`;
    const [result] = await conexao.query(sql, [id_produto]);

    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}
