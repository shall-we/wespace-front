import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as api from '../../lib/api';


// action types
const LOGIN = 'user/LOGIN';
const JOIN = 'user/JOIN';
const LOGOUT = 'user/LOGOUT';
const GET_USER_LIST = "user/GET_USER_LIST";
const GET_ALL_USER_LIST = "user/GET_ALL_USER_LIST";
const DELETE_USER = "user/DELETE_USER";
const GET_USER_LIST_EXCEPT_FRIEND = "user/GET_USER_LIST_EXCEPT_FRIEND";
const SET_LOGIN_STATE = 'user/SET_LOGIN_STATE';
const SET_LOGOUT_STATE = 'user/SET_LOGOUT_STATE';


// action creators
export const login = createAction(LOGIN, api.login);
export const join = createAction(JOIN, api.join);
export const logout = createAction(LOGOUT);
export const getUserList = createAction(GET_USER_LIST, api.getUserList);
export const getAllUserList = createAction(GET_ALL_USER_LIST, api.getAllUserList);
export const deleteUser = createAction(DELETE_USER, api.deleteUser);
export const getUserListExceptFriend = createAction(GET_USER_LIST_EXCEPT_FRIEND, api.getUserListExceptFriend);
export const setLoginState = createAction(SET_LOGIN_STATE);
export const setLogoutState = createAction(SET_LOGOUT_STATE);



// initial state
const initialState = Map({
    id: '',
    name: '',
    profile: '',
    user_list: [],
    not_friend_users: [],
    authorizated: false,
    isLogin : false,
    result_join : {},
});

// reducer
export default handleActions({
    [LOGOUT]: (state, action) => initialState,
    ...pender({
        type : [JOIN],
        onSuccess : (state, action)=>{
            const data = action.payload.data;
            console.log('JOIN', data);
            return state.set('result_join', data);
        }
    }),
    ...pender({
        type: [LOGIN],
        onSuccess: (state, action) => {
            const {name, profile, id, authorizated} = action.payload.data.data;

            return state.set('name', name).set('profile', profile).set('id', id).set('authorizated', authorizated);
        }
    }),
    [SET_LOGIN_STATE]: (state, action) => {
        console.log("login!");
        return state.set("isLogin", true);
    },
    [SET_LOGOUT_STATE]: (state, action) => {
        console.log("logout!");
        return state.set("isLogin", false);
    },
    ...pender({
        type: [GET_USER_LIST],
        onSuccess: (state, action) => {
            const {data: user_list} = action.payload.data;
            console.log("[user.js] ", user_list);
            return state.set("user_list", user_list);
        }
    }),
    ...pender({
        type: [GET_ALL_USER_LIST],
        onSuccess: (state, action) => {
            const {data: all_user_list} = action.payload.data;
            console.log("[GET_ALL_USER_LIST] ", all_user_list);
            return state.set("all_user_list", all_user_list);
        }
    }),

    ...pender({
        type: [GET_USER_LIST_EXCEPT_FRIEND],
        onSuccess: (state, action) => {
            const {data: user_list} = action.payload.data;
            console.log("[not_friend_users.js] ", user_list);
            return state.set("not_friend_users", user_list);
        }
    }),
}, initialState);
