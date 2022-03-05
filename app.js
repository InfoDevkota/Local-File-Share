const fs = require('fs');
const path = require('path');
const express = require('express');

const { getIpAddresses, genereateIpAddress } = require('./services/ipAddress');
const { getQRCode } = require('./services/qrCode');
const { upload } = require('./services/uploadFile');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', '');

app.use(
	'/public-contents',
	express.static(path.join(__dirname, 'public-contents'))
);

app.get('/', async (req, res, next) => {
	try {
		fs.readdir('public-contents/', async (err, files) => {
			let qrCode = await getQRCode();
			let ipAddress = await getIpAddresses();
			console.log('ipAddress', ipAddress);
			res.render('./view/index', {
				ipAddress,
				files: files,
				qrCode
			});
		});
	} catch (error) {
		res.redirect('/?success=false');
	}
});

app.post('/', upload.array('files', 12), (req, res, next) => {
	try {
		res.redirect('/?success=true&count=' + req.files.length);
	} catch (error) {
		res.redirect('/?success=false');
	}
});

app.listen(5010);
console.log('Local File Share Running on localhost:5010');

genereateIpAddress();
