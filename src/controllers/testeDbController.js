const mariadb = require('mariadb');

class TesteDbController {

  async testDatabaseConnection(req, res) {
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
}

export default new TesteDbController();
