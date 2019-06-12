// createAction: 액션생성 자동화
import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
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

const SHARED_FOLDER = "directory/SHARED_FOLDER";
const UNSHARED_FOLDER = "directory/UNSHARED_FOLDER";

const CREATE_NOTE="directroy/CREATE_NOTE";
const UPDATE_NOTE="directory/UPDATE_NOTE";
const DELETE_NOTE="directory/DELETE_NOTE";
const SET_NOTE="directory/SET_NOTE";
const SET_FOLDER="directory/SET_FOLDER";

const SET_FRIENDS="directory/SET_FRIENDS";
const DEL_FRIEND="directory/DEL_FRIEND";
const ADD_FRIEND = "directory/ADD_FRIEND";


const SET_JOIN_FRIEND="directory/SET_JOIN_FRIEND";
const SET_OUT_FRIEND="directory/SET_OUT_FRIEND";


// action creators
export const getSharedList = createAction(SHARED_LIST, api.getSharedList);
export const getPrivateList = createAction(PRIVATE_LIST, api.getPrivateList);
export const getNoteList = createAction(NOTE_LIST, api.getNoteList);

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

export const setFriends = createAction(SET_FRIENDS);
export const setJoinFriend = createAction(SET_JOIN_FRIEND);
export const addFriend = createAction(ADD_FRIEND, api.addFriend);
export const deleteFriend = createAction(DEL_FRIEND, api.deleteFriend);
export const setOutFriend = createAction(SET_OUT_FRIEND);

// initial state
const initialState = Map({
    sharedList: [],
    privateList: [],
    noteList: [],
    folder: null,
    note: null,
    friends:[],
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

    ...pender({
        type: [DEL_FRIEND],
        onSuccess: (state, action) => {
            return state.set("friends", state.get("friends"));
        }
    }),

    ...pender({
        type: [ADD_FRIEND],
        onSuccess: (state, action) => {
            return state.set("friends", state.get("friends"));
        }
    }),

    [SET_FRIENDS]: (state, action) => {
        const { payload: friends } = action;
        console.log("SET_FRIENDS",friends);
        return state.set('friends', fromJS(friends));
    },
    [SET_JOIN_FRIEND]: (state, action) => {
        const { payload: friendId } = action;
        const friends = state.get("friends");
        const newFriend = friends.map(el=>{
            if(parseInt(el.get("id")) === parseInt(friendId)){
                el = el.set("joined", true);
            }
            return el;
        });

        return state.set('friends', newFriend);
    },
    [SET_OUT_FRIEND]: (state, action) => {
        const { payload: friendId } = action;
        let friends = state.get("friends");
        friends = friends.map(el=>{
            if(parseInt(el.id) === parseInt(friendId)){
                el = el.set("joined", false);
            }
            return el;
        });
        return state.set('friends', friends);
    },

    [SET_NOTE]: (state, action) => {
        const { payload} = action;
        console.log('setNote test:::',action.payload);
       if(action.payload!==null){
            return state.set('note', payload.note_content).set('note_id',payload.note_id);
        }
        return state.set('note', null).set('note_id', null);
    },
    [SET_FOLDER]: (state, action) => {
        const { payload: folder } = action;
        console.log("SET_FOLDER", folder);
        return state.set('folder', folder);
    },

}, initialState);
