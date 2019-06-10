import { createAction, handleActions } from 'redux-actions';
 
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from '../../lib/api';


// action types
const LOGIN = 'user/LOGIN';
const JOIN  = 'user/JOIN';
const LOGOUT  = 'user/LOGOUT';
const GET_USER_LIST = "user/GET_USER_LIST";

// action creators
export const login = createAction(LOGIN,api.login);
export const join = createAction(JOIN,api.join);
export const logout = createAction(LOGOUT);
export const getUserList = createAction(GET_USER_LIST, api.getUserList);

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
}, initialState);