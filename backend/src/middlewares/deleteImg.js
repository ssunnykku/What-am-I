import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
import multerS3 from ('multer-s3');
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3();



function deleteImg(file_dir , file_name)  {
    let params = {
      Bucket: 'elice-team08',
      Key: file_dir.concat('/', file_name)
    };

    try {
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log('err: ', error, error.stack);
        } else {
          console.log(data, " 정상 삭제 되었습니다.");
        }    
      })        
    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  export {deleteImg}