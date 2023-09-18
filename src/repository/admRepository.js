import conexao from "./connection.js";

export async function realizarLoginAdm(email, senha) {
    try {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios.');
        }

        const sql = `SELECT * FROM TB_Administrador WHERE ds_email = ?`;
        const [rows] = await conexao.query(sql, [email]);

        if (rows.length === 0) {
            throw new Error('Administrador não encontrado.');
        }

        const adm = rows[0];

        if (senha !== adm.ds_senha) {
            throw new Error('Senha incorreta.');
        }

        return adm;

    } catch (error) {
        console.error('Erro ao realizar o login do administrador:', error.message);
        throw error;
    }
}
