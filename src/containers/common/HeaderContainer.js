import React, { Component } from 'react';
import Header from '../../components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import {withRouter} from 'react-router-dom';
import {autoLogin, logout} from '../../lib/api';
import * as directoryActions from "store/modules/directory";
import {socket} from '../main/Socket';
import {initSocket} from '../main/Socket';

let flag = false;




class HeaderContainer extends Component {

  // componentDidMount= async () => {
  //   await autoLogin()
  //   .then(async res =>{
  //     if(!flag) {
  //       const {autoLogin, email, password,  authorizated } = res.data.data;
  //       if(autoLogin) {
  //         const { UserActions } = this.props;
  //         await UserActions.login(email, password, true);
  //         flag = true;

  //         if(authorizated){
  //         this.props.history.push('/admin');
  //         }else{
  //         this.props.history.push('/note');
  //         }
  //       }
  //       else {
  //         flag = false;
  //       }
  //     }
  //   }
  //   );
//
  // }

    logout = async () => {
    const { UserActions, DirectoryActions } = this.props;
    await logout();
    console.log("socket emit disconnect", socket);
    await socket.disconnect();
    await initSocket();
    await UserActions.setLogoutState();
    await UserActions.logout();
    await DirectoryActions.setNote(null);
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
      UserActions: bindActionCreators(userActions, dispatch),
      DirectoryActions: bindActionCreators(directoryActions, dispatch),
    })
  )(withRouter(HeaderContainer));