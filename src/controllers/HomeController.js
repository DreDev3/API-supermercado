class HomeController {
 async index(req, res) {
    res.json('produtos');
  }
}

/* Teste de conexão em produção*/

const mariadb = require('mariadb');

async function testDatabaseConnection(req, res) {
  try {
    const conn = await mariadb.createConnection({
      host: process.env.DATABASE_HOST, // O IP do seu desktop
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      connectTimeout: 5000 // Timeout para evitar longas esperas
    });

    await conn.end();
    return res.json({ message: "Conexão bem-sucedida ao MariaDB!" });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao conectar ao banco", error: err.message });
  }
}

module.exports = { testDatabaseConnection };


export default new HomeController();
