const imageFilter = function(req, file, cb) {
  
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {
      req.fileValidationError = 'Only PDF files are allowed!'
      return cb(new Error('Only PDF files are allowed!'), false)
  }
  cb(null, true)
}
module.exports = imageFilter