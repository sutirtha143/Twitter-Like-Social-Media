import multer from "multer";
import multerS3 from "multer-s3"
import aws from "aws-sdk"



aws.config.update({
    region:"ap-south-1",
    secretAccessKey: "avT61lqYhHd/hpUgDjkvcZqMc4nzx8j+2lHr07bR",
    accessKeyId: "AKIAQKHTOCUTEV3YRGX2"
})

 const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'twiitersbucket',
      acl:'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    }) 
  })

export default upload;