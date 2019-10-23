const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(routes);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}...`));