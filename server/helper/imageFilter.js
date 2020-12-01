const imageFilter = function(req, file, cb) {
  // Accept pdf only
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {
      req.fileValidationError = 'Only pdf files are allowed!';
      return cb(new Error('Only pdf files are allowed!'), false);
  }
  cb(null, true);
};

module.exports = imageFilter