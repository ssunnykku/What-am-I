import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import multerS3 from 'multer-s3';
// import multerS3 from 'multer-s3-transform';
// import sharp from 'sharp';
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const s3 = new AWS.S3();
dotenv.config();

const uploadImageS3 = () => {
  return multer({
    storage: multerS3({
      // 저장 위치
      s3: s3,
      bucket: process.env.S3_BUCKET,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, cb) {
        cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
      },
    }),
    //* 용량 제한
    limits: { fileSize: 100 * 1024 * 1024 }, //100MB });
    // return storage;
  });
};

const deleteImg = (img) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: img.split('/')[3],
  };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data, '삭제되었습니다'); // successful response
  });
};

export { uploadImageS3, deleteImg };
