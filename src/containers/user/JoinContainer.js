import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/modules/user';
import Join from '../../components/user/join/Join';

class JoinContainer extends Component {



    join=async(formdata)=>{
        const {UserActions}=this.props;
        await UserActions.join(formdata);

        console.log(this.props.result_join);
        return this.props.result_join;
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
        result_join : state.user.get('result_join'),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(JoinContainer);