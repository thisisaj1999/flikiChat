import { io } from "socket.io-client";

const isProduction = true;
const URL = isProduction ? `https://flikichat.onrender.com` : `http://localhost:8080`;

const socket = io(URL, { autoConnect: false });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;