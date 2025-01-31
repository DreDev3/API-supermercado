"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);

      const { id, nome, email, typerUser } = novoUser;
      return res.json({ id, nome, email, typerUser });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors ? err.errors.map(err => err.message) : ["Erro inesperado"],
      })
    }
  }

  //Index
  async index(resq, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });//passando por parametro os campos que podem ser exibidos na consulta
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  //Show
  async show(req, res) {
    try {

      const user = await _User2.default.findByPk(req.params.id);
      const { id, nome, email } = user
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }
  // Update
  async update(req, res) {
    try {

      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        });
      }

      const novosDados = await user.update(req.body)
      const { id, nome, email } = novosDados;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      })
    }
  }
  //Delete
  async delete(req, res) {
    try {

      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      })
    }
  }

  async deactivateBuyer(req, res) {
    try {
      if (req.typeUser !== 'administrador') {
        return res.status(403).json({
          errors: ['Permissão negada. Apenas administradores podem executar esta ação.'],
        })
      }

      const { targetUserId } = req.body;

      const targetUser = await _User2.default.findByPk(targetUserId);

      if (!targetUser) {
        return res.status(404).json({
          errors: ['Usuário não encontrado.'],
        })
      }

      // Verifica o tipo de usuário do alvo
      if (targetUser.type_user !== 'comprador') {
        return res.status(400).json({
          errors: ['A conta alvo não é de um comprador.'],
        });
      }
      if (targetUser.active) {
        targetUser.active = false;
        await targetUser.save();

        return res.status(200).json({
          success: true,
          message: 'Conta desativada com sucesso.',
        })
      }

      if (!targetUser.active) {
        targetUser.active = true;
        await targetUser.save();

        return res.status(200).json({
          success: true,
          message: 'Conta ativada com sucesso.',
        })
      }

    } catch (err) {
      return res.status(500).json({
        errors: ['Ocorreu um erro interno.'],
      });
    }
  }

  async listBuyers(req, res) {
    try {
      const { status } = req.query; // Pega o status pela query string (ativado/desativado)      

      if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({
          errors: ['O parâmetro "status" deve ser "active" ou "inactive".'],
        });
      }

      // Define o valor de `active` com base no status
      const isActive = status === 'active';

      const buyers = await _User2.default.findAll({
        where: {
          type_user: 'comprador', // Filtra apenas usuários compradores
          active: isActive,      // Filtra pelo status da conta
        },
        attributes: ['id', 'nome', 'email', 'active'], // Campos que serão retornados
      });

      return res.status(200).json(buyers);
    } catch (err) {
      return res.status(500).json({
        errors: ['Ocorreu um erro ao buscar os usuários.'],
      });
    }
  }
}


exports. default = new UserController();
