import React, { Component } from "react";
import Header from "../../components/common/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../store/modules/user";
import { withRouter } from "react-router-dom";
import { logout } from "../../lib/api";
import * as directoryActions from "store/modules/directory";

class HeaderContainer extends Component {
  logout = async () => {
    const { UserActions, DirectoryActions } = this.props;
    await logout();
    await UserActions.logout();
    DirectoryActions.setNote(null);
  };

  render() {
    const { name, profile } = this.props;
    // update image if image url includes 'static' , it change default_profile.png
    console.log("확인!!", name, profile);
    const { logout } = this;
    return <Header name={name} profile={profile} logout={logout} />;
  }
}

export default connect(
  state => ({
    name: state.user.get("name"),
    profile: state.user.get("profile")
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    DirectoryActions: bindActionCreators(directoryActions, dispatch)
  })
)(withRouter(HeaderContainer));
