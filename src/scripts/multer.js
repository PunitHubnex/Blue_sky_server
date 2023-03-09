const multer = require('multer')

// for file uploding
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/scripts/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

// Multer filter configuration
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') { // accept only CSV files
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only CSV is allowed!'), false);
    }
};

// Multer upload configuration
const uplode = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // maximum file size of 5MB
    fileFilter: fileFilter
})
module.exports = uplode


    ;