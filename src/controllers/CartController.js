import CartItem from '../models/CartItem';
import Produto from '../models/Produto';

class CartController {
  // Listar itens do carrinho
  async index(req, res) {
    try {
      const cartItems = await CartItem.findAll({
        where: { user_id: req.userId },
        include: [
          {
            model: Produto,
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
      const product = await Produto.findByPk(produto_id);
      console.log('id do produto', product);
      
      if (!product || !product.active) {
        return res.status(404).json({ errors: ['Produto não encontrado ou inativo.'] });
      }

      // Verificar se o produto já está no carrinho
      let cartItem = await CartItem.findOne({
        where: { user_id: req.userId, produto_id },
      });

      if (cartItem) {
        cartItem.quantidade += quantidade;
        await cartItem.save();
      } else {
        cartItem = await CartItem.create({
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

      const cartItem = await CartItem.findOne({
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
      await CartItem.destroy({ where: { user_id: req.userId } });
      return res.json({ success: true, message: 'Carrinho limpo com sucesso.' });
    } catch (err) {
      return res.status(500).json({ errors: ['Erro ao limpar o carrinho.'] });
    }
  }
}

export default new CartController();
