import React, { useEffect, useMemo } from 'react';

import { ConversationList } from './conversationList/conversaiotnList';
import { SearchMessageAndFriends } from '../../components/search/search';
import { Chat } from './chat/chat';
import { updateHistoryMessageToStore } from '../../utils/LocalStoreInstance';

import './scss/message.scss';
import { TUICallKit, TUIGlobal } from '@tencentcloud/call-uikit-react';

export const Message = (): JSX.Element => {
    useEffect(() => {
        return() => {
            updateHistoryMessageToStore();
        }
    }, []);
    return (
        <div className="chat">
            <div className="conversation-wrap">
                <SearchMessageAndFriends />
                <ConversationList />
            </div>
            <div className="message-info">
                <Chat />
            </div>
        </div>
    )
};