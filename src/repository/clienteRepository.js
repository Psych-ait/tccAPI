
import conexao from "./connection.js";

export async function inserirCliente(cliente) {
    try {
        if (!cliente.nm_cliente || !cliente.ds_telefone || !cliente.ds_email || !cliente.ds_cpf || !cliente.ds_senha) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        if (!isValidEmail(cliente.ds_email)) {
            throw new Error('O e-mail informado não é válido.');
        }

        const sql = `INSERT INTO TB_Cliente
            (nm_cliente, ds_telefone, ds_email, ds_cpf, ds_senha)
            VALUES (?, ?, ?, ?, ?)`;

        const resp = await conexao.query(sql, [
            cliente.nm_cliente,
            cliente.ds_telefone,
            cliente.ds_email,
            cliente.ds_cpf,
            cliente.ds_senha
        ]);

        const dados = resp[0];
        return dados;
    } catch (error) {
        console.error('Erro ao inserir cliente:', error.message);
        throw error;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

