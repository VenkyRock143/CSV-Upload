const multer = require('multer');

// Define Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name for storing the file
    }
  });
  
const upload = multer({ storage: storage });

module.exports = upload;