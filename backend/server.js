const express = require('express');
const cors = require('cors');
const expressRoutes = require('./routes');
require('./config/migration');
const socketio = require('socket.io');

const app = express();

const CORS_SETTINGS = {
    origin: "*",
    allowedHeaders: ['authorization', 'mode', 'content-type', 'accept'],
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(CORS_SETTINGS));
app.options('*', cors(CORS_SETTINGS));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', expressRoutes.user);

const server = app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
})

const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New Connection')
})