const express = require('express');
const app = express();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

cloudinary.config({
  cloud_name: 'profj001',
  api_key: '423589193815927',
  api_secret: 'KO1VNau0GmqX-9YI6qHuBwu6870'
});

/*const fileFilter = (req, file, callback) => {
  if (
    file.mimeType === 'image/jpeg' ||
    file.mimeType === 'image/jpg' ||
    file.mimeType === 'image/png'
  ) {
    callback(null, true);
  } else {
    callback(new Error('file type not accepted'), false);
  }

  //callback(null, false) - Rejects the file
  //callback(null, true) - stores the file
};*/

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const port = 3000;

app.get('/', (req, res) => {
  console.log('Hello from server!');
});

app.get('/test', (req, res) => {
  console.log(req.query);
  res.json('Cool!');
});

app.post('/upload', upload.single('picture'), (req, res) => {
  console.log(req.file);
  let path = req.file.path;

  cloudinary.uploader.upload(`${path}`, { tags: 'basic_sample' }, function(
    err,
    image
  ) {
    if (err) {
      console.warn(err);
    }
    console.log('* ' + image.public_id);
    console.log('* ' + image.url);
  });
  res.json('successful!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
