
import socketio from "socket.io-client";
export let socket = socketio.connect("http://192.168.0.19:4000");

export function initSocket () {
    console.log("init socket", socket);
    socket = socketio.connect("http://192.168.0.19:4000");
    console.log("init after socket", socket);
}

export default socket;