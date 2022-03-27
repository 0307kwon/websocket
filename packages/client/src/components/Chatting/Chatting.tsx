import API from "@/api/API";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import classes from "./Chatting.module.less";

const Chatting = () => {
  const [chats, setChats] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const chatSocket = API.socket.chat;

  const onSubmitMsg = (event: FormEvent) => {
    event.preventDefault();

    chatSocket.sendMsg(msg);
    setMsg("");
  };

  const onChangeMsg: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMsg(event.currentTarget.value);
  };

  useEffect(() => {
    const listenerId = chatSocket.addMsgArrivalListener((msg) => {
      setChats((prevChats) => [...prevChats, msg]);
    });

    return () => {
      chatSocket.removeMsgArrivalListener(listenerId);
    };
  }, []);

  return (
    <div className={classes.chattingWrapper}>
      <h3>채팅</h3>
      <div className={classes.chatting}>
        {chats.map((chat) => (
          <p key={chat}>{chat}</p>
        ))}
      </div>
      <form onSubmit={onSubmitMsg} className={classes.msgSendPanel}>
        <input value={msg} onChange={onChangeMsg} />
        <button>보내기</button>
      </form>
    </div>
  );
};

export default Chatting;
