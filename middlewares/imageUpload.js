const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { httpError } = require('../helpers');

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  params: {
    folder: (req, file) => file.fieldname,
    public_id: (req, file) => `${req.user._id}_${file.originalname}`,
    width: 350,
    height: 350,
    crop: 'fill',
  },
});

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

module.exports = imageUpload;
