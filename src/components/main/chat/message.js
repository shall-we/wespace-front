import React from 'react';
import './message.scss';

export class Message extends React.Component{

messageProto(align, message){
	return(		
		<div className="message clearfix">		
		<div className={"bubble " + align}>
			<div className="content">
				{message}
			</div>
		</div>
		</div>
	)
}

getLeftMessage(align, name, profile, message, time){
return(<div className="message-container">
	<div style={{width:"100%" , display: "inline-block"}}>
	<img src={profile}  alt={name} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}/>
	<span className="from">
		{name}
	</span>
	</div>
{this.messageProto(align, message, time)}
<div className = { "time-wrapper " + align }>{time}</div>
</div>)
}



getRightMessage(align, message, time){
	return (
	<div className="message-container">	
	{this.messageProto(align, message)}
	<div className ={ "time-wrapper " + align }>{time}</div>
	</div>
)}

	render() {

		const {name, message, profile, align, time} = this.props;
		return (<div>
				{ (align === "left") ? 
				(this.getLeftMessage(align, name, profile, message, time)) 
				: 
				(this.getRightMessage(align, message, time)) }
		</div>)
	}
}

export default Message;