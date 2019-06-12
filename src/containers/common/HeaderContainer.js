import React, { Component } from 'react';
import Header from '../../components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import {withRouter} from 'react-router-dom';
import {autoLogin, logout} from '../../lib/api';
import defaultProfile from '../../image/User/default_profile.png';

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

  // }

  logout = async () => {
    const { UserActions } = this.props;
    await logout();
    await UserActions.logout();
  }

  render() {
    const { name,profile } = this.props;
    // update image if image url includes 'static' , it change default_profile.png
    const { logout } = this;
    return (
      <Header
        name={name}
        profile={(profile ==="defaultProfile")?defaultProfile:profile}
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
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )(withRouter(HeaderContainer));