"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _CartItem = require('../models/CartItem'); var _CartItem2 = _interopRequireDefault(_CartItem);
var _Produto = require('../models/Produto'); var _Produto2 = _interopRequireDefault(_Produto);

class CartController {
  // Listar itens do carrinho
  async index(req, res) {
    try {
      const cartItems = await _CartItem2.default.findAll({
        where: { user_id: req.userId },
        include: [
          {
            model: _Produto2.default,
            attributes: ['id', 'nome', 'descricao', 'quantidade', 'preco', 'active'],
          },
        ],
      });
      return res.json(cartItems);
    } catch (err) {
      return res.status(500).json({ errors: ['Erro ao listar o carrinho.'] });
    }
  }

  // Adicionar produto ao carrinho
  async store(req, res) {
    try {
      const { produto_id, quantidade } = req.body;      

      // Verificar se o produto existe e está ativo
      const product = await _Produto2.default.findByPk(produto_id);
      console.log('id do produto', product);
      
      if (!product || !product.active) {
        return res.status(404).json({ errors: ['Produto não encontrado ou inativo.'] });
      }

      // Verificar se o produto já está no carrinho
      let cartItem = await _CartItem2.default.findOne({
        where: { user_id: req.userId, produto_id },
      });

      if (cartItem) {
        cartItem.quantidade += quantidade;
        await cartItem.save();
      } else {
        cartItem = await _CartItem2.default.create({
          user_id: req.userId,
          produto_id,
          quantidade,
        });
      }

      return res.json(cartItem);
    } catch (err) {
      return res.status(500).json({ errors: ['Erro ao adicionar produto ao carrinho.'] });
    }
  }

  // Remover item do carrinho
  async delete(req, res) {
    try {
      const { id } = req.params;

      const cartItem = await _CartItem2.default.findOne({
        where: { id, user_id: req.userId },
      });

      if (!cartItem) {
        return res.status(404).json({ errors: ['Item não encontrado no carrinho.'] });
      }

      await cartItem.destroy();
      return res.json({ success: true, message: 'Item removido do carrinho.' });
    } catch (err) {
      return res.status(500).json({ errors: ['Erro ao remover item do carrinho.'] });
    }
  }

  // Limpar o carrinho
  async clear(req, res) {
    try {
      await _CartItem2.default.destroy({ where: { user_id: req.userId } });
      return res.json({ success: true, message: 'Carrinho limpo com sucesso.' });
    } catch (err) {
      return res.status(500).json({ errors: ['Erro ao limpar o carrinho.'] });
    }
  }
}

exports. default = new CartController();
