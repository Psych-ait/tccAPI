
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
    const email1= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email1.test(email);
}

export async function realizarLogin(email, senha) {
    try {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios.');
        }

        const sql = `SELECT * FROM TB_Cliente WHERE ds_email = ?`;
        const [rows] = await conexao.query(sql, [email]);

        if (rows.length === 0) {
            throw new Error('Cliente não encontrado.');
        }

        const cliente = rows[0];

        if (senha !== cliente.ds_senha) {
            throw new Error('Senha incorreta.');
        }

        return cliente;

    } catch (error) {
        console.error('Erro ao realizar o login:', error.message);
        throw error;
    }
}
