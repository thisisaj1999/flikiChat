const express = require("express");
const cors = require("cors");
const expressRoutes = require("./routes");
require("./config/migration");

const app = express();
const http = require("http").Server(app);

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

const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:5173",
	},
});

// Socket
socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	//sends the message to all the users on the server
	socket.on("message", (data) => {
		socketIO.emit("messageResponse", data);
	});

	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});
});

// Routes
app.use("/api/v1", expressRoutes.user);

http.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});
