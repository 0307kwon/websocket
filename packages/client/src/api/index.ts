import END_POINT from "./endPoint";
import ChatSocket from "./socket/ChatSocket";

const API = {
  socket: {
    chat: new ChatSocket(END_POINT.SOCKET),
  },
};

console.log(END_POINT, "이거지");

export default API;
