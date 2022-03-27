import Chatting from "@/components/Chatting/Chatting";
import React from "react";
import classes from "./Main.module.less";

const Main = () => {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.topInner}>test</div>
      </div>
      <div className={classes.chat}>
        <Chatting />
      </div>
    </div>
  );
};

export default Main;
