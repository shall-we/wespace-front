import socketio from "socket.io-client";
const socket = socketio.connect("http://192.168.0.18:4000");

export default socket;