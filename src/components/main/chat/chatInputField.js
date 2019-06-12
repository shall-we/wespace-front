import React from "react";
import './chat.scss';
import Message from './message';


class ChatInputField extends React.Component{

    // enter 기능 안넣음
    handleSendMessage = (event) => {
        if(event.key === 'Enter') {
            const {userId, chatroomId, sendChat} = this.props;
            
            event.preventDefault();

            sendChat({
                sender: userId, 
                content : event.currentTarget.value,
                chatroom_id : chatroomId,
                viewer : [],
                send_date : new Date()
            });
            event.currentTarget.value = "";
        }
	}
	
    render(){
        return(
        <div className="message-input-wrapper">
            <textArea type="text" id="message" className="message-input" placeholder="Send a message" onKeyDown={(e) => this.handleSendMessage(e)}/>
        </div>
        )
    }
}

export default ChatInputField;