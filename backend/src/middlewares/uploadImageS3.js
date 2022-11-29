import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import multerS3 from 'multer-s3';

dotenv.config();

function uploadImageS3() {
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
  const storage = multerS3({
    // 저장 위치
    s3: new AWS.S3(),
    bucket: 'elice-team08',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `profileImg/${Date.now()}_${path.basename(file.originalname)}`); // original 폴더안에다 파일을 저장
    },
  });

  return multer({
    storage: storage,
    //* 용량 제한
    limits: { fileSize: 100 * 1024 * 1024 }, //100MB });
    // return storage;
  });
}

export { uploadImageS3 };
