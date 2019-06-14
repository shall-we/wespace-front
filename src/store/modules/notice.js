// createAction: 액션생성 자동화
import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

// action types
const SEND_MESSAGE = "notice/SEND_MESSAGE";
const NOTICE_LIST = "notice/NOTICE_LIST";
const UPDATE_NOTICE_LIST = "notice/UPDATE_NOTICE_LIST";

// action creators
export const sendMessage = createAction(SEND_MESSAGE, api.sendMessage);
export const getNoticeList = createAction(NOTICE_LIST, api.getNoticeList);
export const updateNoticeList = createAction(UPDATE_NOTICE_LIST, api.updateNoticeList);


// initial state
const initialState = Map({
    NOTE: [],
    FOLDER: [],
    COMMENT: [],
    CHAT: [],
});



// reducer
export default handleActions({
    ...pender(
    {
        type: [NOTICE_LIST],
        onSuccess: (state, action) => {
            const { data: noticeList,result } = action.payload.data;
            return state.set(result, noticeList);
        }
    }),

}, initialState);
