import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
// import multerS3 from 'multer-s3';
import multerS3 from 'multer-s3-transform';
import sharp from 'sharp';

dotenv.config();

function uploadImageS3() {
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
  // const storage = multerS3({
  //   // 저장 위치
  //   s3: new AWS.S3(),
  //   bucket: 'team08images',
  //   acl: 'public-read',
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   key(req, file, cb) {
  //     cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
  //   },
  // });
  const storage = multerS3({
    s3: new AWS.S3(),
    bucket: 'team08images',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    acl: 'public-read',
    transforms: [
      {
        id: 'resized',
        key: function (req, file, cb) {
          cb(null, Date.now().toString());
        },
        transform: function (req, file, cd) {
          cd(null, sharp().resize({ width: 640 })); //이미지를 width: 640으로 리사이징
        },
      },
    ],
  });

  return multer({
    storage: storage,
    //* 용량 제한
    // limits: { fileSize: 500 * 1024 * 1024 }, //500MB });
    // return storage;
  });
}

export { uploadImageS3 };
