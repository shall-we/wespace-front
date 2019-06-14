import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../store/modules/user";
import Login from "../../components/user/login/Login";
import {withRouter} from 'react-router-dom';

class LoginContainer extends Component {
    
    login = async(email, password, autoLogin) => {
        const { UserActions } = this.props;
        await UserActions.login(email, password, autoLogin); 
        console.log('authorizated : '+ this.props.authorizated);
        if(this.props.authorizated){
            this.props.history.push('/admin');
        }else{
        this.props.history.push('/note');
        }
    };

    render() {
        const { login } = this;
        return <Login action={login} />
    }
}

export default connect(
   state =>({
    authorizated : state.user.get("authorizated"),
   }),
    dispatch => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(withRouter(LoginContainer));