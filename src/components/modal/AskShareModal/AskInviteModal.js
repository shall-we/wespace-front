import React from "react";
import styles from "./AskShareModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "../ModalWrapper";
import Button from "../../common/Button";
import IconButton from "@material-ui/core/IconButton";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Members from 'components/common/ChipsArray';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// modules
import * as UserActions from "store/modules/user";
import * as DirectoryActions from "store/modules/directory";

// react-select

import { Add } from "@material-ui/icons";

import Select from 'react-select';

library.add(faUserFriends);
const cx = classNames.bind(styles);

class AskInviteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              selectedOption: null,
              friends : [],
              notFriends : [],
        }
    }

    initData = () => {
        const {UserActions, id}=this.props;
        
        DirectoryActions.setFriends(id);
        UserActions.getUserListExceptFriend(id);
        
     }

    componentDidMount(){
        this.initData();
    }

    handleChange=(selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

      static getDerivedStateFromProps(nextProps, prevState) {

        let {friends, notFriends} = nextProps;
        let nowFriends = prevState.friends , nowNotFriends = prevState.notFriends;

        if(friends !== nowFriends){

           nowFriends = friends.map(el=>{
                return {
                    value: el.get("id"),
                    label: el.get("name")
                }
            });

        }

        if(notFriends !== nowNotFriends){
            nowNotFriends = notFriends.map(el=>{
                return {
                    value: el.id,
                    label: el.name
                }
            });

      }
        
        return {
            friends : nowFriends, 
            notFriends : nowNotFriends
        };
    }


    render() {
        const { visible, onCancel, onConfirm,   
                modal_icon, modal_title, modal_content, btn_name, id } = this.props;
        const { selectedOption, friends }=this.state;


        return (
            <ModalWrapper visible={visible}>
                <div className={cx("question")}>
                    <div className={cx("title")}>
                        <FontAwesomeIcon icon={modal_icon} size="2x" color="#1C90FB" />
                        &nbsp;&nbsp;&nbsp;&nbsp;<strong>{modal_title}</strong>
                    </div>
                    <br />                    
                    <div className={cx("description")}>{modal_content}</div>
                    <br /> 
                    <br />
                    <div className={cx("selectform")}>
                    <Select className={cx("select")} value={this.state.selectedOption} onChange={this.handleChange} options={this.state.notFriends}/>
                    <IconButton>
 
                    <Add onClick={
                        ()=>{
                            onConfirm[0](id, selectedOption.value);
                            this.initData();
                        }}/>
                    </IconButton>
                    </div>          
                    <br /><br />
                    <Members 
                    user_id={id}
                    onDelete={onConfirm}
                    onDeleteCallback = {this.initData}
                    members={friends} />
                    <br />
                </div>

                <div className={cx("options")}>
                    <Button theme="outline" onClick={onCancel}>
                        {btn_name}
                    </Button>
                </div>
            </ModalWrapper>
        );
    }
}
export default connect(
    (state) => ({
        notFriends : state.user.get("not_friend_users"),
        friends : state.directory.get("friends")
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
        DirectoryActions: bindActionCreators(DirectoryActions, dispatch)
    })
)(AskInviteModal);