"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Produto = require('../models/Produto'); var _Produto2 = _interopRequireDefault(_Produto);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class ProdutoController {
  async index(req, res) {
    const produto = await _Produto2.default.findAll({
      attributes: ['id', 'nome', 'descricao', 'categoria', 'quantidade', 'preco', 'active'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename'],
      }
    });
    res.json(produto);
  }

  async store(req, res) {
    try {
      const produto = await _Produto2.default.create(req.body);

      return res.json(produto);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors ? err.errors.map((error) => error.message) : ['Erro inesperado ao processar a requisição.'],
      });

    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Necessário informar ID.'],
        })
      };

      const produto = await _Produto2.default.findByPk(id, {
        attributes: ['id', 'nome', 'descricao', 'categoria', 'quantidade', 'preco', 'active'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        }
      });

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      };

      return res.json(produto);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });
    };
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        })
      };

      const produto = await _Produto2.default.findByPk(id);

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      };

      await produto.destroy();
      return res.json({
        apagado: true,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });
    };

  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        })
      };

      const produto = await _Produto2.default.findByPk(id);

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      };

      const produtoAtualizado = await produto.update(req.body);

      return res.json(produtoAtualizado);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });
    };

  }

  async activate(req, res) {
    try {
      if (req.typeUser !== 'administrador') {
        return res.status(403).json({
          errors: ['Permissão negada. Apenas administradores podem executar esta ação.'],
        })
      }

      const { id } = req.params;
      console.log('ID recebido:', id);
      const product = await _Produto2.default.findByPk(id);
      if (!product) {
        return res.status(404).json({
          errors: ['Produto não encontrado.'],
        });
      }

      product.active = true;
      await product.save();

      return res.status(200).json({
        success: true,
        message: 'Produto ativado com sucesso.',
      });
    } catch (err) {
      return res.status(500).json({
        errors: ['Ocorreu um erro interno.'],
      });
    }
  }

  async deactivate(req, res) {
    try {
      if (req.typeUser !== 'administrador') {
        return res.status(403).json({
          errors: ['Permissão negada. Apenas administradores podem executar esta ação.'],
        })
      }
      const { id } = req.params;
      console.log('ID recebido:', id);
      const product = await _Produto2.default.findByPk(id);

      if (!product) {
        return res.status(404).json({
          errors: ['Produto não encontrado.'],
        });
      }

      product.active = false;
      await product.save();

      return res.status(200).json({
        success: true,
        message: 'Produto desativado com sucesso.',
      });
    } catch (err) {
      return res.status(500).json({
        errors: ['Ocorreu um erro interno.'],
      });
    }
  }

  async listProducts(req, res) {
    try {
      const { status } = req.query;

      if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({
          errors: ['O parâmetro "status" deve ser "active" ou "inactive".'],
        });
      }

      const isActive = status === 'active';

      const products = await _Produto2.default.findAll({
        where: { active: isActive },
        attributes: ['id', 'nome', 'descricao', 'categoria', 'preco', 'active'],
      });

      if (!products || products.length === 0) {
        return res.status(404).json({
          errors: ['Nenhum produto encontrado com esse status.'],
        });
      }

      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({
        errors: ['Ocorreu um erro interno.'],
      });
    }
  }

}


exports. default = new ProdutoController();
