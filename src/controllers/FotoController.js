import multer from "multer";
import multerConfig from "../config/multerConfig";

import Foto from "../models/Foto";

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        })
      }
      try {
        const { originalname, filename } = req.file;
        const { produto_id } = req.body;
        const foto = await Foto.create({ originalname, filename, produto_id });
        return res.json(foto);
      } catch (err) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        })
      }

    })
  }
}


export default new FotoController();
