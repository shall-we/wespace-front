import React, { Component } from 'react';
import Header from '../../components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import {withRouter} from 'react-router-dom';
import {autoLogin, logout} from '../../lib/api';

let flag = false;

class HeaderContainer extends Component {

  componentDidMount= async () => {
    await autoLogin()
    .then(async res =>{
      if(!flag) {
        if(res.data.data.autoLogin) {
          const { UserActions } = this.props;
          await UserActions.login(res.data.data.email, res.data.data.password, true);
          flag = true;
          this.props.history.push('/note');
        }
        else {
          flag = false;
        }
      }
    }
    )
  }

  logout = async () => {
    const { UserActions } = this.props;
    await logout();
    await UserActions.logout();
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
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )(withRouter(HeaderContainer));