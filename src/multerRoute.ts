import multer from "multer"; // Importa o módulo Multer para lidar com o upload de arquivos
import path from "path"; // Importa o módulo Path para manipular caminhos de arquivos

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório onde os arquivos serão salvos
    cb(null, path.join(__dirname, "uploads/audios"));
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo que será salvo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Cria uma instância do Multer com as configurações definidas acima
const upload = multer({
  storage: storage, // Define o local onde os arquivos serão armazenados
  fileFilter: function (req, file, cb) {
    // Define as restrições para os arquivos que serão aceitos
    const filetypes = /mp3|wav|ogg|flac/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      // Se o arquivo atender as restrições, permite o upload
      return cb(null, true);
    }

    // Se o arquivo não atender as restrições, retorna um erro
    cb(new Error("Apenas arquivos de áudio são permitidos"));
  },
});

export default upload; // Exporta a instância do Multer configurada
