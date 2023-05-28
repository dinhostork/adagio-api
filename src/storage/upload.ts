import { Request } from 'express';
import multer from 'multer';

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    // Pasta onde os arquivos serão salvos
    cb(null, 'temp/');
  },
  filename: (req, file, cb) => {
    // Nome do arquivo no servidor (opcional)
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

