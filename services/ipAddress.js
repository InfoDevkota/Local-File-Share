const { createQRCode } = require('./qrCode');
let ipAddress = null;

const genereateIpAddress = async () => {
	const nets = require('os').networkInterfaces();
	console.log('Looking for Local IP');
	let found = false;
	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// if (net.family === 'IPv4' && !net.internal) {
			if (net.address.startsWith('192.168.')) {
				console.log('IP Found ' + net.address);
				found = true;
				console.log(
					`Access "Local File Share" at http://${net.address}:5010`
				);

				createQRCode(`http://${net.address}:5010`);
				ipAddress = `http://${net.address}:5010`;
				// return;
			}
			// }
		}
	}
	if (!found) {
		console.log('IP not detected.');
		console.log('Verify you are connected to a network.');
		console.log('Please use ipconfig/ifconfig');
	}
};

const getIpAddresses = async () => {
	return ipAddress;
};

module.exports = { getIpAddresses, genereateIpAddress };
