const express = require('express');

const errorHandlerDefault = require("./server/errorHandlers/errorHandlerDefault");
const errorHandlerJWT  = require("./server/errorHandlers/errorHandlerJWT");
const errorHandlerCasl  = require("./server/errorHandlers/errorHandlerCasl");
const errorHandlerSequelize  = require("./server/errorHandlers/errorHandlerSequelize");
const errorHandlerBcrypt  = require("./server/errorHandlers/errorHandlerBcrypt");
const errorHandlerMulter  = require("./server/errorHandlers/errorHandlerMulter");
const errorHandlerYup = require("./server/errorHandlers/errorHandlerYup");

const router = require("./server/router/index");
const { PORT } = require("./server/constants");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('/server/public/images'));

app.use(router);

app.use(
    errorHandlerJWT,
    errorHandlerYup,
    errorHandlerBcrypt,
    errorHandlerSequelize,
    errorHandlerCasl,
    errorHandlerMulter,
    errorHandlerDefault,
);

const server = require('http').Server(app);
const io = require('socket.io').listen(server);

require('./sockets/controller')(io);


server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
