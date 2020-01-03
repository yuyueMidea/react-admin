const server = require('server');
const { get, post } = server.router;
const { render, json } = server.reply;

// server([
//   get('/', ctx => 'Hello world!')
// ]);


server({ port: 3000 }, ctx => 'Hello---预约');