const express = require("express");
const cors = require("cors");
const expressRoutes = require("./routes");
require("./config/migration");
require('dotenv').config();

const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

// SocketHandlers
const MessageSocketsHandler = require("./sockets/messageHandler");
const GroupRoomSocketsHandler = require("./sockets/groupHandler");

const CORS_SETTINGS = {
	origin: "*",
	allowedHeaders: ["authorization", "mode", "content-type", "accept"],
	optionsSuccessStatus: 200,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};

app.use(cors(CORS_SETTINGS));
app.options("*", cors(CORS_SETTINGS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Socket
const onConnection = (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	
	MessageSocketsHandler(io, socket)

	GroupRoomSocketsHandler(io, socket)

	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});
}

io.on("connection", onConnection);

// Routes
app.use("/api/v1", expressRoutes.user);
app.use("/api/v1", expressRoutes.group);

http.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});
