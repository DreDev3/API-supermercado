"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class CartItem extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                produto_id: {
                    type: _sequelize2.default.INTEGER,
                    allowNull: false,
                },
                quantidade: {
                    type: _sequelize2.default.INTEGER,
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
} exports.default = CartItem;
