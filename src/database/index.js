import Sequelize from "sequelize";
import databaseConfig from '../config/database'
import Produto from '../models/Produto'
import User from "../models/User";
import Foto from "../models/Foto";
import CartItem from "../models/CartItem";

const models = [Produto, User, Foto, CartItem]

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));