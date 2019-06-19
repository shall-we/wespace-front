import React, { Component } from 'react';
import Header from '../../components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as directoryActions from "store/modules/directory";
import * as UserActions from "store/modules/user";
import * as noticeActions from 'store/modules/notice';
import * as noteToolActions from 'store/modules/noteTool';
import {withRouter} from 'react-router-dom';
import {autoLogin, logout} from '../../lib/api';
import {socket, initSocket} from '../main/Socket';

let flag = false;

class HeaderContainer extends Component {

  componentDidMount= async () => {
    await autoLogin()
    .then(async res =>{
      if(!flag) {
        const {autoLogin, email, password,  authorizated } = res.data.data;
        if(autoLogin) {
          const { UserActions } = this.props;
          await UserActions.login(email, password, true);
          flag = true;
          
          if(authorizated){
          this.props.history.push('/admin');
          }else{
          this.props.history.push('/note');
          }
        }
        else {
          flag = false;
        }
      }
    }
    );
  }

  logout = async () => {
    await logout();
    const { UserActions,DirectoryActions,NoticeActions ,NoteToolActions } = this.props; 
    await socket.disconnect();
    await initSocket();
    UserActions.logout();
    DirectoryActions.logout();
    NoticeActions.logout();
    NoteToolActions.logout();
    this.props.history.push('/');
  }

  render() {
    const { name,profile } = this.props;
    const { logout } = this;
    return (
      <Header
        name={name}
        profile={profile}
        logout={logout}
      />
    );
  }
}

  export default connect(
    (state) => ({
      name: state.user.get('name'),
      profile: state.user.get('profile'),
    }),
    (dispatch) => ({
        DirectoryActions: bindActionCreators(directoryActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch),
        NoticeActions: bindActionCreators(noticeActions, dispatch),
        NoteToolActions : bindActionCreators(noteToolActions, dispatch)
    })
  )(withRouter(HeaderContainer));