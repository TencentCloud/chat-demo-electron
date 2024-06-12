import React, { useEffect } from 'react';
import ReactDOM from "react-dom";

import { eventListiner } from './pages/call/callIpc';
import { Call } from './pages/call';
import { useCallData } from './pages/call/useCallData';

eventListiner.init(); //注册监听事件 与主进程通信
export const Test = () => {
    useEffect(()=>{
        console.log("here");
    },[]);
    return (
        <div>
            hello from updateHistoryMessageToStore
            <p>"asfqwef"</p>
        </div>
    );
}

ReactDOM.render(<Call />, document.getElementById("root"));
// ReactDOM.render(<Test />, document.getElementById("root"));