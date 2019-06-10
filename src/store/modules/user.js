import { createAction, handleActions } from 'redux-actions';
 
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from '../../lib/api';


// action types
const LOGIN = 'user/LOGIN';
const JOIN  = 'user/JOIN';
const LOGOUT  = 'user/LOGOUT';
const GET_USER_LIST = "user/GET_USER_LIST";
const GET_ALL_USER_LIST = "user/GET_ALL_USER_LIST";
const DELETE_USER = "user/DELETE_USER"

// action creators
export const login = createAction(LOGIN,api.login);
export const join = createAction(JOIN,api.join);
export const logout = createAction(LOGOUT);
export const getUserList = createAction(GET_USER_LIST, api.getUserList);
export const getAllUserList = createAction(GET_ALL_USER_LIST, api.getAllUserList);
export const deleteUser = createAction(DELETE_USER, api.deleteUser);

// initial state
const initialState = Map({
    id: '',
    name: '',
    profile: '',
    user_list: [],
});

// reducer
export default handleActions({
  [LOGOUT]: (state, action) => initialState,
  ...pender({
    type: [LOGIN],
    onSuccess: (state, action) => {
      const { name,profile,id} = action.payload.data.data;

        return state.set('name', name).set('profile',profile).set('id', id);
    }
  }),
  ...pender({
    type: [GET_USER_LIST],
    onSuccess: (state, action) => {
        const { data: user_list } = action.payload.data;
        console.log("[user.js] ", user_list);
        return state.set("user_list",user_list);
    }
  }),
  ...pender({
    type: [GET_ALL_USER_LIST],
    onSuccess: (state, action) => {
        const { data: all_user_list } = action.payload.data;
        console.log("[GET_ALL_USER_LIST] ", all_user_list);
        return state.set("all_user_list", all_user_list);
    }
  }),
}, initialState);
