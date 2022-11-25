import multer from 'multer';
import path from 'path';
import fs from 'fs';

function addImage(imgPath) {
  !fs.existsSync(imgPath) && fs.mkdirSync(imgPath);
  // const storage = multer({ dest: "uploads/" });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
    },
    limits: { fileSize: 200 * 1024 * 1024 }, //200MB
  });

  return multer({ storage: storage });
  // return storage;
}

export { addImage };
