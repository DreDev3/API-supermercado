"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Produto = require('../models/Produto'); var _Produto2 = _interopRequireDefault(_Produto);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _CartItem = require('../models/CartItem'); var _CartItem2 = _interopRequireDefault(_CartItem);

const models = [_Produto2.default, _User2.default, _Foto2.default, _CartItem2.default]

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));