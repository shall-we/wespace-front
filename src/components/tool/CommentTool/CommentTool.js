import React, { Component } from 'react';
import styles from './CommentTool.scss';
import classNames from 'classnames/bind';
import { Send } from "@material-ui/icons";
const cx = classNames.bind(styles);

const Comment=(props)=>{

    return (
        <div className={cx("comment-template")}>
            <div className={cx("comment",props.author?'comment--you':'comment--them')}>
                <div className={cx('message')}>{props.message}</div>     
            </div>
            <div className={cx(props.author?'you':'them')}>
                <span className={cx('from')}>{props.from}</span>
                <span className={cx('date')}>{props.reg_date}</span>
                <span className={cx('check')}>{props.check}</span>
            </div>
        </div>
    );
}

const CommentList =(props)=>{
    const commentNodes = props.data.map(function(comment){
        return (
            <Comment from={comment.from} reg_date={comment.reg_date} check={comment.check} author={props.user_id===comment.from_id} message={comment.message}/>
        ); 
    });
        return (
            <div className={cx("comment-list")}>
                { commentNodes }
            </div>
        )
}

class CommentForm extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            text: ''
        }
    }
   
    handleTextChange=(e)=>{
        this.setState({text: e.target.value});
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.state.text!==''){
            
        this.props.sendMessage(this.state.text);
        this.setState({text: ''});
        }
    }

    render(){
        return (
                <form className="comment-form" onSubmit={this.handleSubmit}>
                    <input className={cx("submit-text")} value={this.state.text} placeholder="Your thoughts" onChange={this.handleTextChange} /><br/>
                    <button  className={cx("submit-btn")} type="submit"> <Send color="default" /></button>
                </form>

        );
    }
}


class CommentTool extends Component {

    render(){
        return (
            <div className={cx('comment-tool')}>
                <CommentList data={this.props.data} user_id={this.props.user_id} />
                <CommentForm sendMessage={this.props.sendMessage}/>
            </div>
        )
    }
}

export default CommentTool;




