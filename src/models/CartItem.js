import Sequelize, { Model } from 'sequelize';

export default class CartItem extends Model {
    static init(sequelize) {
        super.init(
            {
                produto_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                quantidade: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    validate: {
                        min: {
                            args: [1],
                            msg: 'A quantidade deve ser pelo menos 1.',
                        },
                    },
                },
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.Produto, { foreignKey: 'produto_id' });
    }
}
