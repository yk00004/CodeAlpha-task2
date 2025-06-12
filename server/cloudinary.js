const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.your_cloud_name,
  api_key: process.env.your_api_key,
  api_secret: process.env.your_api_secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social-media-posts',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  },
});

module.exports = {
  cloudinary,
  storage
};
