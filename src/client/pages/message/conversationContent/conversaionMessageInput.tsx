import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, message } from "tea-component";
import timRenderInstance from "../../../utils/timRenderInstance";
// import trtcCheck from '../../../utils/trtcCheck';
import { generateRoomID } from "../../../utils/tools";
import { updateCallingStatus } from "../../../store/actions/ui";
import { getGroupMemberList, getUserInfoList } from "../../../api";
import { openCallWindow } from '../../../utils/callWindowTools';
import { MessageInput } from "./MessageInput";
import { GroupMemberSelector } from "./groupMemberSelector";
import { TUICallKit, TUICallKitServer, TUIGlobal } from "@tencentcloud/call-uikit-react";
type Info = {
    faceUrl: string;
    nickName: string;
    id: string;
};

export const ConversationMessageInput = (props: { currentSelectedConversation }): JSX.Element => {
    const { currentSelectedConversation } = props;
    const { conv_id: convId,  conv_type:convType, conv_profile:convProfile, conv_draft: draftMsg } = currentSelectedConversation;
    const { callingStatus: { callingId, callingType } } = useSelector(
        (state: State.RootState) => state.ui
    );
    const { userId, userSig } = useSelector((state: State.RootState) => state.userInfo)
    const {sdkappId} = useSelector((state: State.RootState) => state.settingConfig)
    const groupMemberSelectorRef = useRef(null)
    const [callInfo, setCallInfo] = useState({
        callType: 0,
        convType: 0
    })
    // const [isOpen, setIsOpen] = useState(false);
    const isOpen = useSelector((state: State.RootState) => state.callkit.isOpen);

    const openDialog = () => {
        dispatch({ type: 'SET_IS_OPEN', payload: true });
        // console.log(`openDialog ${isOpen}`)
        // setIsOpen(true);
    };

    const closeDialog = () => {
        dispatch({ type: 'SET_IS_OPEN', payload: false });
        // setIsOpen(false);
    };
    useEffect(()=>{
        callKit_init();
    },[])
    const dispatch = useDispatch();
    const handleOpenCallWindow = async (callType, convType) => {
        if (callingId) {
            message.warning({ content: '正在通话中' });
            return;
        }

        // if (!trtcCheck.isCameraReady() && !trtcCheck.isMicReady()) {
        //     message.warning({ content: '找不到可用的摄像头和麦克风。请安装摄像头和麦克风后再试' });
        //     return;
        // }

        setCallInfo({
            callType,
            convType
        })
    }
    const isShutUpAll = convType === 2 && convProfile?.group_detail_info_is_shutup_all;
    const getDisplayConvInfo = () => {
        const info: Info = {
            faceUrl: "",
            nickName: "",
            id: "",
        };

        if (convType === 1) {
            info.faceUrl = currentSelectedConversation?.conv_profile?.user_profile_face_url;
            info.nickName = currentSelectedConversation.conv_profile.user_profile_nick_name;
            info.id = currentSelectedConversation.conv_profile.user_profile_identifier;
        }

        if (convType === 2) {
            info.faceUrl = currentSelectedConversation?.conv_profile?.group_detail_info_face_url;
            info.nickName = currentSelectedConversation?.conv_profile?.group_detail_info_group_name;
            info.id = currentSelectedConversation.conv_profile.group_detail_info_group_id;
        }
        return info;
    };
    const callKit_init = async () => {
        // const { SDKAppID, SecretKey, userId } = userData;
        if (sdkappId && userSig && userId) {
          try {
            await callKit_login(sdkappId, userSig, userId);
            console.log("[TUICallKit] login success.");
            return 0;
          } catch (error) {
            console.error(error);
            console.log("[TUICallKit] login failed.");
          }
        } else {
          console.log("[TUICallKit] Please fill in the SDKAppID, userId, callUserId, and SecretKey.");
          
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
      const callKit_call = async(inviteList,isGroup)=>{
        // console.log(`callkit call ${sdkAppid} ${userID} ${userSig} ${inviteID} ${callType} ${windowType} ${convInfo.convType} ${inviteList}`);
        if(!isGroup){
          await TUICallKitServer.call({userID:inviteList[0],type:Number(callInfo.callType)})
        } else{
          await TUICallKitServer.groupCall({
            userIDList: inviteList, 
          groupID: convId, 
          type: Number(callInfo.callType)
      })
        }
      }
    const inviteC2C = async () => {
        console.log("inviteC2C")
        const roomId = generateRoomID();
        const { callType } = callInfo
        console.log(`convId in invite ${JSON.stringify(callInfo)}`)
        const data = await timRenderInstance.TIMInvite({
            invitee: convId,

            data: JSON.stringify({ "businessID": "av_call", "call_type": Number(callType), "room_id": roomId, "version": 4,"cmd":callType == 1? "audioCall":"videoCall" }),
            online_user_only: false,
            json_offline_push_info: undefined,
            timeout: 0
        })
        //@ts-ignore
        const { code, json_params } = data;
        console.log(`inviting ${code} ${json_params}`)
        if (code === 0) {
            // const customerData = JSON.parse(json_params)?.message_elem_array[0].custom_elem_data;
            const inviteId = json_params;
            console.log(`callType ${callType} ${roomId} ${convId} ${inviteId}`);
            console.log(`invite success ${userId} ${userSig}`);
            openDialog();
            callKit_call([convId],false);
            // openLocalCallWindow(callType, roomId, [convId], inviteId)
        }
    }
    // const openLocalCallWindow = async (callType, roomId, userList, inviteId) => {
    //     dispatch(updateCallingStatus({
    //         callingId: convId,
    //         callingType: convType,
    //         inviteeList: [userId, ...userList],
    //         callType: callType
    //     }));
    //     const { faceUrl, nickName, id } = getDisplayConvInfo();
    //     const inviteListWithInfo = await getUserInfoList([userId, ...userList]);;
    //     console.log(`openCallWindow ${sdkappId} ${userId} ${userSig}`);
    //     openCallWindow({
    //         windowType: 'callWindow',
    //         callType,
    //         convId: convId,
    //         convInfo: {
    //             faceUrl: faceUrl,
    //             nickName: nickName,
    //             convType: convType,
    //             id: id
    //         },
    //         sdkAppid:sdkappId,
    //         roomId,
    //         inviteID: inviteId,
    //         userID: userId,
    //         userSig: userSig,
    //         inviteList: [userId, ...userList],
    //         inviteListWithInfo,
    //         isInviter: true,
    //     });
    // }
    const openGroupMemberSelector = async () => {
        const { group_get_member_info_list_result_info_array } = await getGroupMemberList({
            groupId: convId,
            nextSeq: 0,
        })
        groupMemberSelectorRef.current.open({
            groupId: convId,
            userList: group_get_member_info_list_result_info_array.filter(item => item.group_member_info_identifier !== userId)
        })
    }
    const inviteInGourp = async (groupMember) => {
        const { callType } = callInfo
        const roomId = generateRoomID();
        console.log('roomId', roomId)
        let userList = groupMember.map((v) => v.group_member_info_identifier)
        userList.push(userId);
        const data = await timRenderInstance.TIMInviteInGroup({
            json_invitee_array: userList,
            group_id: convId,
            data: JSON.stringify({ "businessID": "av_call", "call_type": Number(callType), "room_id": roomId, "version": 4,"cmd":callType == 1? "audioCall":"videoCall"  }),
            online_user_only: false,
            timeout: 0
        });
        // //@ts-ignore
        const  { code, json_params }= data;
        if (code === 0) {
            // const customerData = JSON.parse(json_params)?.message_elem_array[0].custom_elem_data;
            // const inviteId = JSON.parse(customerData)?.inviteID;
            const inviteId = json_params;
            openDialog();
            callKit_call(userList,true);
            // openLocalCallWindow(callType, roomId, userList, inviteId)
        }
    }
    useEffect(() => {
        const { callType, convType } = callInfo
        if (callType !== 0 && convType !== 0) {
            if (convType == 1) {
                inviteC2C()
            } else if (convType === 2) {
                openGroupMemberSelector()
            }
        }
    }, [callInfo])
    const callkitStyle = useMemo(() => {
        // if (TUIGlobal.isPC) {
        //   return { width: '960px', height: '630px', margin: '0 auto' };
        // }
        return { width: '100%', height: window.innerHeight };
      }, [TUIGlobal.isPC]);
    const afterCalling = () => {
        closeDialog();
      }
    return (
        <div className="message-info-view__content--input">
            <Modal visible={isOpen} caption="对话框标题" onClose={closeDialog} size="auto">
        <Modal.Body><TUICallKit style={callkitStyle} afterCalling={afterCalling}></TUICallKit></Modal.Body>
        <Modal.Footer>
          <Button type="primary" onClick={closeDialog}>
            确定
          </Button>
          <Button type="weak" onClick={closeDialog}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
            <MessageInput
                convId={convId}
                convType={convType}
                isShutUpAll={isShutUpAll}
                draftMsg = {draftMsg}
                handleOpenCallWindow={handleOpenCallWindow}
            />
            <GroupMemberSelector dialogRef={groupMemberSelectorRef}
                onSuccess={(data) => {
                    inviteInGourp(data)
                }} />
        </div>
    )
}
