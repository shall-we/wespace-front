import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

const ADD_ATTACHMENT="directory/ADD_ATTACHMENT";
const DELETE_ATTACHMENT="directory/DELETE_ATTACHMENT";
const GET_ATTACHMENT_LIST="directory/GET_ATTACHMENT_LIST";
const DOWNLOAD_ATTACHMENT="directory/DOWNLOAD_ATTACHMENT";
const SET_NOTE_LOCK="directory/SET_NOTE_LOCK";

// action creators
export const addAttachment = createAction(ADD_ATTACHMENT, api.addAttachment);
export const deleteAttachment = createAction(DELETE_ATTACHMENT, api.deleteAttachment);
export const getAttachmentList = createAction(GET_ATTACHMENT_LIST, api.getAttachmentList);
export const downloadAttachment = createAction(DOWNLOAD_ATTACHMENT, api.downloadAttachment);
export const setNoteLock = createAction(SET_NOTE_LOCK);

const initialState = Map({
    attachmentList : [],
    note_id : null,
    attachment_id :null,
    attachment : null,
});

export default handleActions({
    //shareBox
    ...pender(
        {
            type: [ADD_ATTACHMENT],
            onSuccess: (state, action) => {
                console.log('ADD_ATTACHMENT');
                console.log(action.payload.data.result);
            }
        }),
        ...pender(
            {
                type: [DELETE_ATTACHMENT],
                onSuccess: (state, action) => {
                    console.log('DELETE_ATTACHMENT');
                    console.log(action.payload.data.result);
                }
            }),
    ...pender(
        {
            type: [GET_ATTACHMENT_LIST],
            onSuccess: (state, action) => {
                const { attachmentList } = action.payload.data;

               // console.log(action.payload.data);
                console.log("GET_ATTACHMENT_LIST", attachmentList);
                return state.set("attachmentList", attachmentList); 
            }
        }),
    ...pender({
        type : [DOWNLOAD_ATTACHMENT],
        onSuccess : (state, action) => {
            
            const attachment = action.payload.data;
            console.log('DOWNLOAD_ATTACHMENT', attachment.toString('utf-g'));
            return state.set("attachment", attachment);
        }
    }),
}, initialState);