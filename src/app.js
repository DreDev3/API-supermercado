import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config()

import './database'
import express from 'express'
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import produtoRoutes from './routes/produtoRoutes';
import fotoRoutes from './routes/fotoRoutes';
import cartRoutes from './routes/cartRoutes';

const whiteList = [
  'https://dredev3.github.io',
  'http://localhost:3000',
  'http://edson.dyndns-work.com',
  undefined
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" }
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/produtos/', produtoRoutes);
    this.app.use('/fotos/', fotoRoutes);
    this.app.use('/carrinho/', cartRoutes);
  }
}

export default new App().app;
