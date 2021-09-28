const Hapi = require('hapi')
const server = Hapi.server({port:39000,routes: {cors: {origin: ['*']}}})
server.route(require('./route'))
server.route(require('./indexroute'))
const init = async () => {
	await server.register(require('vision'));
    await server.register(require('inert'));
    server.views({
        engines:{html:require('ejs') },
        relativeTo: __dirname,
        path: 'views',
    });
	await server.start();
	console.log('server is start on 39000')
}
init()