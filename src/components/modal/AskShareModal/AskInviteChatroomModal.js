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
// modules
import {getChatParticipantsInfo, getAllFriend, inviteMultiChatroom} from "../../../lib/api";

// react-select

import { Add } from "@material-ui/icons";

import Select from 'react-select';

library.add(faUserFriends);
const cx = classNames.bind(styles);

class AskInviteChatroomModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            friends : [],
            participants : []};


    }

    initState = () => {
        this.setState({
            selectedOption: null,
            friends : [],
            participants : [],
            isUpdate : false
         });
    };

    invite = () => {
        let selected = this.state.selectedOption;
        if(!selected) return;
        let {friends, participants} = this.state;

        participants.push(selected);
         let removeIndex = friends.findIndex(el=>{
             return el.value === selected.value; 
         });
        friends.splice(removeIndex, 1);

 
          this.setState({
            participants : participants,
            friends : friends,
            selectedOption : null
         });
    };

    unInvite = (user_id, find_id) => {
        let {participants, friends} = this.state;

        let removeIndex = participants.findIndex(el=>{
            return el.value === find_id; 
        });
        let removed = participants.splice(removeIndex, 1);
        friends = friends.concat(removed);

        this.setState({
           participants : participants,
           friends : friends
        })

    };

    requestInvite = (participants, master_id, chatroom_id) => {


        (async ()=>{
            await inviteMultiChatroom(participants, master_id, chatroom_id);
            await this.closeModalAction();
            const {onConfirm} = this.props;
            await onConfirm[0](master_id);

        })();


    };

    getSnapshotBeforeUpdate(nextProps, prevProps){
        if(!this.state.isUpdate){
            this.initData().then(response=>{
                console.log("response", response);
                if(response && response["participants"] && response["friends"]){
                    let {participants, friends} = response;
                    this.setState ({participants : participants, friends : friends, isUpdate : true});
                }
            });
        }
    }


    initData = async () => {
        console.log("init data called");
        const {user_id, chatroom_id}=this.props.id;
        if(user_id && chatroom_id){

            let friends = await getAllFriend(user_id);
            friends = friends.data;
            let {data} = await getChatParticipantsInfo(chatroom_id);
             let participants = data.data;

            friends = friends.filter(el=>{
                let index = participants.findIndex(part=>{
                    return part["user_id"] === el["id"];
                });
                return index < 0 ? true : false;
    
            });

            friends = friends.map(el=>{
                return {
                    value: el["id"],
                    label: el["name"]
                }
            });
  
                participants = participants.filter(el=>{
                    return el["user_id"] !== user_id;
                }).map(el=>{
                    let {info} = el;
                    return {
                        value: el["user_id"],
                        label: info["name"]
                    }
                });

                return {
                    participants : participants,
                    friends : friends
                };
        }
     };

    closeModalAction = () => {
        const {handleCloseInviteChatroomModal} = this.props;
        this.initState();
        handleCloseInviteChatroomModal();
    };

    handleChange=(selectedOption) => {
        this.setState({ selectedOption });
      };


    render() {
        const { visible,
                modal_icon, modal_title, modal_content, btn_name, id} = this.props;
        const { selectedOption, participants, friends }=this.state;

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
                    <Select className={cx("select")} value={this.state.selectedOption} onChange={this.handleChange} options={friends}/>
                    <IconButton>
 
                    <Add onClick={this.invite}/>
                    </IconButton>
                    </div>          
                    <br /><br />
                    { <Members 
                    user_id={id}
                    onDelete={[undefined, this.unInvite]}
                    members={participants} />}
                    <br />
                </div>

                <div className={cx("options")}>
                    <Button theme="outline" onClick={()=>{this.requestInvite(participants, id.user_id, id.chatroom_id)}}>
                        {btn_name}
                    </Button>

                    <Button theme="outline" onClick={this.closeModalAction}>
                        닫기
                    </Button>
                </div>
            </ModalWrapper>
        );
    }
}
export default AskInviteChatroomModal;