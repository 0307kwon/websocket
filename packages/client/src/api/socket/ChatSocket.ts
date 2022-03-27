type MsgArrivalListenerObj = {
  id: string;
  listener: (arrivedMsg: string) => void;
};

export default class ChatSocket {
  private socket: WebSocket;
  private msgArrivalListenerObjs: MsgArrivalListenerObj[] = [];
  private uniqueId = 0;

  constructor(socketEndPoint: string) {
    this.socket = new WebSocket(socketEndPoint);

    this.socket.onopen = () => {
      console.log("chat socket connected");

      this.socket.onmessage = (data) => {
        this.msgArrivalListenerObjs.forEach((listenerObj) => {
          listenerObj.listener(JSON.parse(data.data));
        });
      };
    };

    this.socket.onerror = () => {
      console.error("chat socket connection fail");
    };
  }

  sendMsg(msg: string) {
    this.socket.send(
      JSON.stringify({
        event: "socket",
        data: msg,
      })
    );
  }

  addMsgArrivalListener(listener: MsgArrivalListenerObj["listener"]) {
    this.uniqueId++;

    this.msgArrivalListenerObjs.push({
      id: `${this.uniqueId}`,
      listener,
    });

    return `${this.uniqueId}`;
  }

  removeMsgArrivalListener(id: string) {
    for (let i = 0; i < this.msgArrivalListenerObjs.length; i++) {
      if (this.msgArrivalListenerObjs[i].id === id) {
        this.msgArrivalListenerObjs.splice(i, 0);
        return true;
      }
    }

    return false;
  }
}
