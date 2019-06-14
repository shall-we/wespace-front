import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

const ADD_ATTACHMENT="directory/ADD_ATTACHMENT";
const DELETE_ATTACHMENT="directory/DELETE_ATTACHMENT";
const GET_ATTACHMENT_LIST="directory/GET_ATTACHMENT_LIST";
const DOWNLOAD_ATTACHMENT="directory/DOWNLOAD_ATTACHMENT";

// action creators
export const addAttachment = createAction(ADD_ATTACHMENT, api.addAttachment);
export const deleteAttachment = createAction(DELETE_ATTACHMENT, api.deleteAttachment);
export const getAttachmentList = createAction(GET_ATTACHMENT_LIST, api.getAttachmentList);
export const downloadAttachment = createAction(DOWNLOAD_ATTACHMENT, api.downloadAttachment);

const initialState = Map({
    attachmentList : [],
    note_id : null,
    attachment_id :null,
    attachment : null,
    note_lock : null,
});

export default handleActions({
    //shareBox
    ...pender(
        {
            type: [ADD_ATTACHMENT],
            onSuccess: (state, action) => {
            }
        }),
        ...pender(
            {
                type: [DELETE_ATTACHMENT],
                onSuccess: (state, action) => {
                }
            }),
    ...pender(
        {
            type: [GET_ATTACHMENT_LIST],
            onSuccess: (state, action) => {
                const { attachmentList } = action.payload.data;
                return state.set("attachmentList", attachmentList); 
            }
        }),
    ...pender({
        type : [DOWNLOAD_ATTACHMENT],
        onSuccess : (state, action) => {
            
            const attachment = action.payload.data;
            return state.set("attachment", attachment);
        }
    }),
}, initialState);