"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Produto extends _sequelize.Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: _sequelize2.default.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Nome precisa ter entre 3 e 255 caracteres.'
                    }
                }
            },
            descricao: {
                type: _sequelize2.default.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [15, 255],
                        msg: 'Descrição precisa ter entre 15 e 255 caracteres.'
                    }
                }
            },
            categoria: {
                type: _sequelize2.default.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Categoria precisa ter entre 15 e 255 caracteres.'
                    }
                }
            },
            preco: {
                type: _sequelize2.default.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Preço precisa ser um número inteiro ou real.'
                    }
                }
            },
            active: _sequelize2.default.BOOLEAN,
        }, 
        {
            sequelize,
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'produto_id' });
    }
} exports.default = Produto;