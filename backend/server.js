const express = require("express");
const cors = require("cors");
const expressRoutes = require("./routes");
require("./config/migration");

const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

// SocketHandlers
const { createMessage, readMessage } = require("./sockets/messageHandler")(io);
const { createGroup, getGroup } = require("./sockets/groupHandler")(io);

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

  // Group
  socket.on("group:create", createGroup);
  socket.on("group:read", getGroup);

  // Message
  socket.on("message:create", createMessage);
  socket.on("message:read", readMessage);

	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});
}

io.on("connection", onConnection);

// Routes
app.use("/api/v1", expressRoutes.user);

http.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});
