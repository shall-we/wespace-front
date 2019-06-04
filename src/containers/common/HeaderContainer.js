import React, { Component } from 'react';
import Header from '../../components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import {withRouter} from 'react-router-dom';
import {autoLogin, logout} from '../../lib/api';

class HeaderContainer extends Component {

  componentDidMount= async () => {
    await autoLogin()
    .then(res =>{
        if(res.data.data.autoLogin) {
          const { UserActions } = this.props;
          UserActions.autoLogin(res.data.data.email, res.data.data.password, true);
        }
      }
    )
  }

  logout = async () => {
    await logout();
    const { UserActions } = this.props;
    UserActions.logout();
    this.props.history.push('/intro');
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