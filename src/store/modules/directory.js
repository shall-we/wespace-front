// createAction: 액션생성 자동화
import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

// action types
const SHARED_LIST = "directory/SHARED_LIST";
const PRIVATE_LIST = "directory/PRIVATE_LIST";
const NOTE_LIST = "directory/NOTE_LIST";

// folder CRUD of action types
const CREATE_FOLDER = "directory/CREATE_FOLDER";
const UPDATE_FOLDER = "directory/UPDATE_FOLDER";
const DELETE_FOLDER = "directory/DELETE_FOLDER";
const SEARCH_NOTE_LIST = "directory/SEARCH_NOTE_LIST";

const SHARED_FOLDER = "directory/SHARED_FOLDER";
const UNSHARED_FOLDER = "directory/UNSHARED_FOLDER";

const CREATE_NOTE="directroy/CREATE_NOTE";
const UPDATE_NOTE="directory/UPDATE_NOTE";
const DELETE_NOTE="directory/DELETE_NOTE";
const SET_NOTE="directory/SET_NOTE";
const SET_FOLDER="directory/SET_FOLDER";

const SET_NOTE_LOCK="directory/SET_LOCK";
const GET_NOTE_LOCK="directory/GET_LOCK";


// action creators
export const getSharedList = createAction(SHARED_LIST, api.getSharedList);
export const getPrivateList = createAction(PRIVATE_LIST, api.getPrivateList);
export const getNoteList = createAction(NOTE_LIST, api.getNoteList);
export const getSearchNoteList = createAction(SEARCH_NOTE_LIST, api.getSearchNoteList);

export const createFolder = createAction(CREATE_FOLDER, api.createFolder);
export const updateFolder = createAction(UPDATE_FOLDER, api.updateFolder);
export const deleteFolder = createAction(DELETE_FOLDER, api.deleteFolder);
export const sharedFolder = createAction(SHARED_FOLDER, api.sharedFolder);
export const unsharedFolder = createAction(UNSHARED_FOLDER, api.unsharedFolder);

export const createNote = createAction(CREATE_NOTE, api.createNote);
export const updateNote = createAction(UPDATE_NOTE, api.updateNote);
export const deleteNote = createAction(DELETE_NOTE, api.updateNoteStatusDeleted);
export const setNote = createAction(SET_NOTE);
export const setFolder = createAction(SET_FOLDER);

export const setNoteLock = createAction(SET_NOTE_LOCK, api.setLock);
export const getNoteLock = createAction(GET_NOTE_LOCK, api.getLock);

// initial state
const initialState = Map({
    sharedList: [],
    privateList: [],
    noteList: [],
    folder: null,
    note: null,
    note_id:null,
});



// reducer
export default handleActions({
    ...pender(
    {
        type: [PRIVATE_LIST],
        onSuccess: (state, action) => {
            const { data: privateList } = action.payload.data;
            return state.set("privateList", privateList);
        }
    }),
    ...pender(
    {
        type: [SHARED_LIST],
        onSuccess: (state, action) => {
            const { data: sharedList } = action.payload.data;
            return state.set("sharedList", sharedList); 
        }
    }),
    ...pender(
    {
        type: [NOTE_LIST],
        onSuccess: (state, action) => {
            const { data: noteList } = action.payload.data;
            return state.set("noteList", noteList);
        }
    }),
    ...pender(
        {
            type: [SEARCH_NOTE_LIST],
            onSuccess: (state, action) => {
                const { data: noteList } = action.payload.data;
                return state.set("noteList", noteList);
            }
        }),
    ...pender(
        {
            type: [GET_NOTE_LOCK],
            onSuccess: (state, action) => {
                const { data: lock } = action.payload.data;
                console.log('note_lock data :',lock);
                return state.set("note_lock", lock[0].lock);
            }
        }),
    [SET_NOTE]: (state, action) => {
        const { payload } = action;
        console.log('setNote test:::',action.payload);
        return state.set('note', payload.note_content).set('note_id',payload.note_id);
    },
    [SET_FOLDER]: (state, action) => {
        const { payload: folder } = action;
        console.log("SET_FOLDER", folder);
        return state.set('folder', folder);
    },


}, initialState);
