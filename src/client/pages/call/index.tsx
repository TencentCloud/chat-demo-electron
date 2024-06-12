import React, { useEffect, useMemo, useState } from 'react';
import "tea-component/dist/tea.css";
import { useCallData } from './useCallData';
// import { CallContent } from './callContent/CallContent';
import { Notification } from './notification/index';
import { Meeting } from './meeting';
import { TUICallKit, TUICallKitServer, TUIGlobal } from "@tencentcloud/call-uikit-react";
import { ipcRenderer } from 'electron';
import { eventListiner } from './callIpc';
import event from './event';
import { getCurrentWindow } from '@electron/remote';


export const Call = ()=>  {

    const { 
        windowType,
        userID,
        convInfo, 
        roomId, 
        callType, 
        inviteID, 
        inviteList, 
        userSig, 
        sdkAppid, 
        inviteListWithInfo, 
        isInviter,
        isVideoOpen,
        isVoiceOpen
    } = useCallData();

    const closeCallWIndow = () => {
      eventListiner.cancelCall(null, 0);
      const win =getCurrentWindow();
      win.close();
  }

  useEffect(()=>{
      event.on('exitRoom',()=>{
          // 如果没有接通，走这个退出逻辑
          console.log("exitRoom")
          closeCallWIndow();
      });

      let timer = setTimeout(() => {
          closeCallWIndow();
      }, 30 * 1000);

      return () => {
          clearTimeout(timer);
          event.off('exitRoom');
      }
  },[])
    let initTime = 0;
    const callKit_init = async () => {
      // const { SDKAppID, SecretKey, userId } = userData;
      console.log(`call init ${sdkAppid} ${userID}`)
      let SDKAppID = '';
      if (sdkAppid && userSig && userID) {
        try {
          await callKit_login(sdkAppid, userSig, userID);
          console.log("[TUICallKit] login success.");
          callKit_call();
          return 0;
        } catch (error) {
          console.error(error);
          console.log("[TUICallKit] login failed.");
        }
      } else {
        console.log("[TUICallKit] Please fill in the SDKAppID, userId, callUserId, and SecretKey.");
        if(initTime < 20){
          callKit_init();
          initTime++;
        }
        
      }
      return -1;
    };
    // 完成 TUICallKit 组件的登录。这个步骤异常关键，因为只有在登录成功后才能正常使用 TUICallKit 的各项功能
    const callKit_login = async (SDKAppID: any, usersig: any, userId: any) => {
      await TUICallKitServer.init({
        userID: userId,
        userSig:usersig,
        SDKAppID: Number(SDKAppID),
      });
    };

    // const getCompByWindowType = () => {
    //     switch(windowType) {
    //         case 'callWindow':
    //             return (
    //                 <CallContent 
    //                     userId={userID} 
    //                     convInfo={convInfo} 
    //                     roomId={roomId}  
    //                     inviteID={inviteID} 
    //                     inviteList={inviteList} 
    //                     userSig={userSig} 
    //                     sdkAppid={sdkAppid} 
    //                     callType={callType}
    //                     inviteListWithInfo={inviteListWithInfo}
    //                     isInviter={isInviter}
    //             />);
    //         case 'notificationWindow':
    //             return (
    //                 <Notification 
    //                 convInfo={convInfo} 
    //                 callType={callType}
    //                 inviteID={inviteID} 
    //             />)
    //         case 'meetingWindow':
    //             return (
    //                 <Meeting 
    //                     roomId={roomId}
    //                     isVideoOpen={isVideoOpen}
    //                     isVoiceOpen={isVoiceOpen}
    //                     userSig={userSig}
    //                     sdkAppid={sdkAppid}
    //                     userId={userID}
    //                 />
    //             );
    //         default:
    //             return null;

    //     }
    // };

    // if(roomId === 0) {
    //     return null
    // }

    const callKit_call = async()=>{
      // console.log(`callkit call ${sdkAppid} ${userID} ${userSig} ${inviteID} ${callType} ${windowType} ${convInfo.convType} ${inviteList}`);
      if(convInfo.convType == 1){
        const indexToRemove: number = inviteList.indexOf(userID);
        if (indexToRemove !== -1) {
          // 使用 splice() 方法删除该项
          inviteList.splice(indexToRemove, 1);
        }
        await TUICallKitServer.call({userID:inviteList[0],type:callType})
      } else if(convInfo.id != null){
        await TUICallKitServer.groupCall({
          userIDList: inviteList, 
        groupID: convInfo.id, 
        type: callType
    })
      }
    }

    const call = async () => {
        await TUICallKitServer.call({ userID: "10058198", type: 2 });
        
      };
    const callkitStyle = useMemo(() => {
      // if (TUIGlobal.isPC) {
      //   return { width: '960px', height: '630px', margin: '0 auto' };
      // }
      return { width: '100%', height: window.innerHeight };
    }, [TUIGlobal.isPC]);

    
    // return ( 
    //     <div>
    //         {
    //             getCompByWindowType()
    //             // <p>hello here</p>
    //         }
    //     </div>
    // )
    let isLogin = true;
    const initAndCall = async ()=> {
      console.log("init and Call")
        let initData = await callKit_init();
        if(initData == 0){
          console.log("init success");
          callKit_call();
          
        }
    }
    
    callKit_init();
    callKit_call();
    initAndCall();

    const beforeCalling = () => {

    }

    const afterCalling = () => {
      console.log("afterCalling")
      // cancel calling or reject calling
      eventListiner.cancelCall(null, inviteID);
      const win =getCurrentWindow();
      win.close();
    }

    return (
        <>
          <TUICallKit style={callkitStyle} afterCalling={afterCalling}></TUICallKit>
          {/* <div style={{ width: 350, margin: '0 auto' }}>
            <h4>{isLogin ? "call Panel" : "Debug Panel"} </h4>

            <button onClick={callKit_call}>{"call" }</button>
          </div> */}
        </>
      );
    
};