const http = require("http");
const { parse } = require('querystring');

const host = 'localhost';
const port = 4000;

http.createServer((req, res) => {
	console.log('server work');
	if (req.method === 'POST') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			console.log(body);
			let params = parse(body);
			console.log(params);
			console.log(params.hi);
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.writeHead(200);
			res.end('ok');
		});
	}
}).listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});