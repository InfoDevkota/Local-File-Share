const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'private-contents/');
	},
	filename: function (req, file, cb) {
		let date = new Date();
		let ogFileName = file.originalname;
		let splited = ogFileName.split('.');
		splited.pop();
		let fileNameOnly = splited.join('.');
		let extension = path.extname(file.originalname);
		cb(null, fileNameOnly + date.getTime() + extension);
	}
});

let upload = multer({ storage: storage });
module.exports = { upload };
