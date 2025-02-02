import Sequelize, { Model } from "sequelize";

export default class Produto extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Nome precisa ter entre 3 e 255 caracteres.'
                    }
                }
            },
            descricao: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [15, 255],
                        msg: 'Descrição precisa ter entre 15 e 255 caracteres.'
                    }
                }
            },
            categoria: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Categoria precisa ter entre 15 e 255 caracteres.'
                    }
                }
            },
            preco: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Preço precisa ser um número inteiro ou real.'
                    }
                }
            },
            quantidade: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            active: Sequelize.BOOLEAN,
        }, 
        {
            sequelize,
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'produto_id' });
    }
}