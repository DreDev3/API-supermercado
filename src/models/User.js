import Sequelize, { Model } from "sequelize";
import bcryptjs from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],//Primeiro valor informa o tamanho minimo de caracteres e  ultimo valor o tamanho maximo do campo.
                        msg: 'Campo nome deve ter entre 3 e 255 caracteres!'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email já exite!'
                },
                validate: {
                    isEmail: {
                        msg: 'Email inválido!'
                    }
                }
            },
            type_user: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],//Primeiro valor informa o tamanho minimo de caracteres e  ultimo valor o tamanho maximo do campo.
                        msg: 'A senha deve ter entre 6 e 50 caracteres!'
                    }
                }
            },

            active: Sequelize.BOOLEAN,
        }, {
            sequelize,
        });
        this.addHook('beforeSave', async user => {
            if(user.password){
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })
        return this;
    }
    passwordIsValid(password){
        return bcryptjs.compare(password, this.password_hash);
    }
}