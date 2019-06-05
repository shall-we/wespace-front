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

const GET_ALL_FOLDER_LIST = "folder/GET_ALL_FOLDER_LIST";
// const GET_NOTE_COUNT = "admin/GET_NOTE_COUNT";

// action creators
export const getAnnouncementList = createAction(GET_ANNOUNCEMENT_LIST, api.getAnnouncementList);
export const createAnnouncement = createAction(CREATE_ANNOUNCEMENT, api.createAnnouncement);
export const getAnnouncement = createAction(GET_ANNOUNCEMENT, api.getAnnouncement);
export const updateAnnouncement = createAction(UPDATE_ANNOUNCEMENT, api.updateAnnouncement);
export const deleteAnnouncement = createAction(DELETE_ANNOUNCEMENT, api.deleteAnnouncement);
export const getAllFolderList = createAction(GET_ALL_FOLDER_LIST, api.getAllFolderList);
// export const getNoteCount = createAction(GET_NOTE_COUNT, api.getNoteCount);

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
  // ...pender({
  //   type: [GET_NOTE_COUNT],
  //   onSuccess: (state, action) => {
  //     const { data: note_count } = action.payload.data;
  //     // console.log("[GET_NOTE_COUNT] ", note_count);
  //     return state.set("note_count", note_count);
  //   }
  // }),
}, initialState);
