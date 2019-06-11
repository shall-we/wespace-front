import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import Join from '../../components/user/join/Join';

class JoinContainer extends Component {

    join=async(name,email,password,profile)=>{
        const {UserActions}=this.props;
        await UserActions.join(name,email,password,profile);
    }

    render() {
      const {join} = this;
      return (
        <div>
         <Join action={join}/>
        </div>
      );
    }
}

export default connect(
    (state) => ({
      }),
    (dispatch) => ({
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )(JoinContainer);