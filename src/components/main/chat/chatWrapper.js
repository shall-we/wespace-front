import React from "react";
import ReactDOM from "react-dom";

import './chat.scss';
import Message from './message';


class ChatWrapper extends React.Component{


	componentDidUpdate(){
		this.props.scrollToBottom();
	}

	renderChats = (chats, participants) => {		
		let foundSenderInfo = (senderId) => {

			let findIndex = participants.findIndex(el=>{
				return el.get("user_id") === senderId;
			});
			return participants.get(findIndex);
		}

		return chats.map((item) => {

			if(item.get("sender") === this.props.userId){
				return (<Message align={'right'} message={item.get("content")} time={item.get("send_date")}/>)
			}else{
				let info = foundSenderInfo(item.get("sender"));
				if(info){
					info = info.get("info");
					return (<Message align={'left'} name={info.get("name")} profile={info.get("profile")} message={item.get("content")} time={item.get("send_date")}/>)
				}
			}
		
			
		});
	}


render(){
	const chats = this.props.chats.get("chats");
	const participants = this.props.chats.get("participants");
    return(
    <div className="messages-wrapper" ref={this.props.chatWrapperRef}>
    {
        chats && chats.size > 0 ? this.renderChats(chats, participants) : undefined
    }
    </div>)
}

}
export default ChatWrapper;