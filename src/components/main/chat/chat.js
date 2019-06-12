import React from "react";
import './chat.scss';
import Message from './message';
import  Immutable  from "immutable";
import ChatWrapper from "./chatWrapper";
import ChatInputField from "./chatInputField";

class ChatBox extends React.Component{

	constructor(props){
		super(props);
		this.chatWrapperRef = React.createRef();

	}

	scrollToBottom = () => {
		this.chatWrapperRef.scrollTop = this.chatWrapperRef.scrollHeight;
	}

	checkValidStr (str) {
		if(str && str.length > 0) return true;
		else return false;
	}

	shouldComponentUpdate(nextProps, nextState){
		let {chats} = nextProps;
		if(this.checkValidStr(chats.get("chatroom_id"))) return true
		else return false;
	}

	componentWillUpdate(nextProps, nextState){
		let {joinChatRoom, leaveChatRoom} = this.props;
		let thisChat = this.props.chats;
		let nextChat = nextProps.chats;

	if(thisChat.get("chatroom_id") !== nextChat.get("chatroom_id")){

		if(this.checkValidStr(thisChat.get("chatroom_id"))){
			leaveChatRoom(thisChat.get("chatroom_id"));
		}

		if(this.checkValidStr(nextChat.get("chatroom_id"))){
			joinChatRoom(nextChat.get("chatroom_id"));
		}
	}

	}

	render() {
		const {chats, userId, sendChat} = this.props;
		return (
			<div className="chat-box">
				<ChatWrapper chats = {chats} 
				userId = {userId}
				chatWrapperRef = {(el)=>{return this.chatWrapperRef = el}}
				scrollToBottom = {this.scrollToBottom}
				/>

				<ChatInputField 
				userId = {userId} 
				sendChat = {sendChat} 
				chatroomId = {chats.get("chatroom_id")}
				/>
			</div>
		)
	}
}
export default ChatBox;