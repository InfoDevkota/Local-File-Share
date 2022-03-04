const qr = require('qrcode');
let qrCode = null;
createQRCode = async (addressUrl) => {
	// create qrcode
	qr.toDataURL(addressUrl, { errorCorrectionLevel: 'H' }, (err, src) => {
		// Let create the QR code image set it to be the source used in the webpage
		qrCode = src;
	});
};

getQRCode = async () => {
	return qrCode;
};
module.exports = { getQRCode, createQRCode };
