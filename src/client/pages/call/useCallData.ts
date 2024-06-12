import { useEffect, useState } from 'react';

import eventEmiter from './event';

export const useCallData = () => {
    const [data, setData] = useState({

        convInfo: {
            faceUrl: '',
            nickName: '',
            convType: 0,
            id: ''
        },
        convId: '',
        callType: 1,
        windowType: 'callWindow',
        roomId: 0,
        inviteID: '',
        userID:'',
        inviteList: [],
        sdkAppid: 0,
        userSig: '',
        inviteListWithInfo: [],
        isInviter: false,
        isVoiceOpen: false,
        isVideoOpen: false,
    });

    useEffect(() => {
        eventEmiter.on('getData', (data) => {
            console.log(data,"========useCallData========")
            const { convInfo, convId, callType, windowType, roomId, inviteID,userID,inviteList, sdkAppid, userSig, inviteListWithInfo, isInviter, isVoiceOpen, isVideoOpen } = data;
            setData({
                windowType,
                callType: Number(callType),
                convInfo: {
                    faceUrl: convInfo?.faceUrl,
                    nickName: convInfo?.nickName,
                    convType: convInfo?.convType,
                    id: convInfo?.id
                },
                convId: convId,
                roomId: roomId,
                inviteID: inviteID,
                userID: userID,
                inviteList: inviteList,
                sdkAppid: Number(sdkAppid) ,
                userSig: userSig,
                inviteListWithInfo: inviteListWithInfo,
                isInviter,
                isVoiceOpen,
                isVideoOpen
            })
        });

        eventEmiter.on('changeWindowType', type => {
            setData(data => ({
                ...data,
                windowType: type,
            }))
        });

        eventEmiter.on('updateInviteList', inviteList => {
            setData(prev => ({...prev, inviteList }))
        });

        return () => {
            eventEmiter.off('getData');
            eventEmiter.off('changeWindowType');
            eventEmiter.off('updateInviteList');
        }
    }, []);

    const initData = (params) => {
        setData({
            windowType:params.windowType,
            callType: Number(params.callType),
            convInfo: {
                faceUrl: params.convInfo?.faceUrl,
                nickName: params.convInfo?.nickName,
                convType: params.convInfo?.convType,
                id: params.convInfo?.id
            },
            convId: params.convId,
            roomId: params.roomId,
            inviteID: params.inviteID,
            userID: params.userID,
            inviteList: params.inviteList,
            sdkAppid: Number(params.sdkAppid) ,
            userSig: params.userSig,
            inviteListWithInfo: params.inviteListWithInfo,
            isInviter:params.isInviter,
            isVoiceOpen:params.isVoiceOpen,
            isVideoOpen:params.isVideoOpen,
        })
    }

    return data;
}