import ChatSocket from "./socket/ChatSocket";

const API = {
  socket: {
    chat: new ChatSocket("ws://localhost:3000/socket"),
  },
};

export default API;
