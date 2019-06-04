import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

 
const reducers = combineReducers(modules); 
const middlewares = [penderMiddleware()];
 
// preloadedState는 추후 서버사이드 렌더링을 했을 때 전달받는 초기 상태입니다.
const configure = (preloadedState) => createStore(reducers, preloadedState, compose(
  applyMiddleware(...middlewares)
));
 
export default configure;