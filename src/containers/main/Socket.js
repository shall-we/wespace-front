
import socketio from "socket.io-client";
const URL = "http://192.168.0.92:4000";
export let socket = socketio.connect(URL);

export function initSocket () {
    console.log("init socket", socket);
    socket = socketio.connect(URL);
    console.log("init after socket", socket);
}

export default socket;