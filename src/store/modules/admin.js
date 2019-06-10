import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as api from "../../lib/api";
import { Map } from "immutable";

// action types
const GET_ANNOUNCEMENT_LIST = "admin/GET_ANNOUNCEMENT_LIST";
const CREATE_ANNOUNCEMENT = "admin/CREATE_ANNOUNCEMENT";
const GET_ANNOUNCEMENT = "admin/GET_ANNOUNCEMENT";
const UPDATE_ANNOUNCEMENT = "admin/UPDATE_ANNOUNCEMENT";
const DELETE_ANNOUNCEMENT = "admin/DELETE_ANNOUNCEMENT";

const GET_ALL_FOLDER_LIST = "admin/GET_ALL_FOLDER_LIST";
const GET_ALL_NOTE_LIST = "admin/GET_ALL_NOTE_LIST";

// action creators
export const getAnnouncementList = createAction(GET_ANNOUNCEMENT_LIST, api.getAnnouncementList);
export const createAnnouncement = createAction(CREATE_ANNOUNCEMENT, api.createAnnouncement);
export const getAnnouncement = createAction(GET_ANNOUNCEMENT, api.getAnnouncement);
export const updateAnnouncement = createAction(UPDATE_ANNOUNCEMENT, api.updateAnnouncement);
export const deleteAnnouncement = createAction(DELETE_ANNOUNCEMENT, api.deleteAnnouncement);
export const getAllFolderList = createAction(GET_ALL_FOLDER_LIST, api.getAllFolderList);
export const getAllNoteList = createAction(GET_ALL_NOTE_LIST, api.getAllNoteList);

// initial state
const initialState = Map({
  announcement_list: []
});

// reducer
export default handleActions({
  ...pender({
    type: [GET_ANNOUNCEMENT_LIST],
    onSuccess: (state, action) => {
      const { data: announcement_list } = action.payload.data;
      console.log("[GET_ANNOUNCEMENT_LIST] ", announcement_list);
      return state.set("announcement_list", announcement_list);
    }
  }),
  ...pender({
    type: [GET_ALL_FOLDER_LIST],
    onSuccess: (state, action) => {
        const { data: all_folder_list } = action.payload.data;
        console.log("[GET_ALL_FOLDER_LIST] ", all_folder_list);
        return state.set("all_folder_list", all_folder_list);
    }
  }),
  ...pender({
    type: [GET_ALL_NOTE_LIST],
    onSuccess: (state, action) => {
      const { data: all_note_list } = action.payload.data;
      // console.log("[GET_ALL_NOTE_LIST] ", all_note_list);
      return state.set("all_note_list", all_note_list);
    }
  }),
}, initialState);
