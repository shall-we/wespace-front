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
import {socket} from '../main/Socket';
import {initSocket} from '../main/Socket';

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
    UserActions.logout();
    DirectoryActions.logout();
    NoticeActions.logout();
    NoteToolActions.logout();
    await socket.disconnect();
    await initSocket();
    await UserActions.setLogoutState();
    await UserActions.logout();
    await DirectoryActions.setNote(null);
        this.props.history.push('/');

    }

  render() {
    const { name,profile, isLogin } = this.props;
    // update image if image url includes 'static' , it change default_profile.png
      console.log("확인!!", name, profile, isLogin);
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
      isLogin : state.user.get('isLogin')
    }),
    (dispatch) => ({
        DirectoryActions: bindActionCreators(directoryActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch),
        NoticeActions: bindActionCreators(noticeActions, dispatch),
        NoteToolActions : bindActionCreators(noteToolActions, dispatch)
    })
  )(withRouter(HeaderContainer));