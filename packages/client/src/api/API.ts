import ChatSocket from "./socket/chatSocket";

const API = {
  socket: {
    chat: new ChatSocket("ws://localhost:3000/socket"),
  },
};

export default API;
