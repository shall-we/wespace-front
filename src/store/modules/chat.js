// createAction: 액션생성 자동화
import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import * as api from "lib/api";
import { pender } from "redux-pender";

const SET_CHATS = "chat/SET_CHATS";
const SET_CHAT_MESSAGE = "chat/SET_CHAT_MESSAGE";
const SET_PRIVATE_CHATLIST = "chat/SET_PRIVATE_CHATLIST";
const UPDATE_ROOM_TITLE = "chat/UPDATE_ROOM_TITLE";
const DROP_ROOM = "chat/DROP_ROOM";

export const setChats = createAction(SET_CHATS);
export const setChatMessage = createAction(SET_CHAT_MESSAGE);
export const setPrivateChatList = createAction(SET_PRIVATE_CHATLIST, api.getPrivateChatList);
export const updateChatroomTitle = createAction(UPDATE_ROOM_TITLE, api.updateChatroomTitle);
export const dropChatroom = createAction(DROP_ROOM, api.dropChatroom);

// initial state
const initialState = Map({
    chats: Map({}),
    privateChatList : List()

});


export default handleActions({
    [SET_CHAT_MESSAGE]: (state, action) => {

        const { payload: chat } = action;
        let chats = state.get("chats");
        let chatList = chats.get("chats");
        
            let chatIndex = chatList.findIndex((el)=>{return el.get("_id") === chat._id});
            if(chatIndex < 0){
                chatList = chatList.push(new Map(chat));

            }
            chats = chats.set("chats", chatList);
           
         

        return state.set("chats", chats);
    },
    [SET_CHATS]: (state, action) => {
        const { payload: chats } = action;
        return state.set('chats',fromJS(chats));
    },
    ...pender(
        {
            type: [SET_PRIVATE_CHATLIST],
            onSuccess: (state, action) => {
                const { payload: data } = action;
                return state.set('privateChatList',fromJS(data.data));
            }
        }),

     ...pender(
        {
            type: [UPDATE_ROOM_TITLE],
            onSuccess: (state, action) => {
                let { payload: data } = action;
                data = data.data.data;
                let chats = state.get("privateChatList");
                chats = chats.map(el=>{
                    if(el.get("chatroom_id") === data.chatroom_id){
                        el = el.set("chatroom_title", data.chatroom_title);
                    }
                    return el;
                })
                return state.set("privateChatList",chats);
            }
        }),

        ...pender(
            {
                type: [DROP_ROOM],
                onSuccess: (state, action) => {
                    let { payload: data } = action;
                    data = data.data.data;
                    let chats = state.get("privateChatList");
                    let index = chats.findIndex(el=>{
                        return el.get("chatroom_id") === data.chatroom_id;
                    });
                    if(index > -1){
                        chats = chats.delete(index);
                    }
                    return state.set("privateChatList",chats);
                }
            })
}, initialState)