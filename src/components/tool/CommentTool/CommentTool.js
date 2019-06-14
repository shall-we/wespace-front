import React, { Component } from 'react';
import styles from './CommentTool.scss';
import classNames from 'classnames/bind';
import { Send } from "@material-ui/icons";
const cx = classNames.bind(styles);

const Comment=(props)=>{
    return (
        <div className={cx("comment-template")}>
            <div className={cx("comment",props.author?'comment--you':(props.type==='CHAT')?'comment--chat':'comment--them')}>
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
            <Comment from={comment.from} reg_date={comment.reg_date} check={comment.check} author={props.user_id===comment.from_id} message={comment.message} type={comment.type}/>
        ); 
    });
        return (
            <div className={cx("comment-list")} ref={(ref)=>props.handleRef(ref)}>
                { commentNodes }
            </div>
        )
}

const Member=(props)=>{
    return(
        <div className={cx('member')}>
            <img className={cx('profile')} src={props.user.profile} alt='img' />
            <div className={cx('info')}>
                <h4 className={cx('name')}>{props.user.name}</h4>
                <p  className={cx('email')}>{props.user.email}</p>     
            </div>
        </div>
    )

}

const User=(props)=>{
    return (
        <div className={cx("send-user")}>
            <p  className={cx('name')}>{props.user.name}</p><p className={cx('cancel')} onClick={()=>{props.selectCancel(props.user.id)}}>X</p>
        </div>
    );
}

const UserList=(props)=>{
    console.log('user_list',props);
    const member=props.member.map(function(user,idx){
        return (
            <Member key={idx} user={user}/>
        ); 
    });
    const user_list = props.data.map(function(user,idx){
        return (
            <User key={idx} user={user} selectCancel={props.selectCancel}/>
        ); 
    });

    return (
        <div className={cx("user-list-template")} >

            <div className={cx("all-list")} style={{display:props.display}}>
            {member}
            </div>
            <div className={cx("send-list")}>
            {user_list}
            </div>
        </div>
    );
}
const CommentForm=(props)=>{
        return (
                <form className="comment-form" onSubmit={props.handleSubmit}>
                    <input className={cx("submit-text")} value={props.text} placeholder="Your thoughts" onChange={props.handleTextChange} /><br/>
                    <button  className={cx("submit-btn")} type="submit" > <Send color="default" /></button>
                </form>
        );
    
}

class CommentTool extends Component {

    state={
        user_list:[],
        match_user_list:[],
        select_user_list:[],
        display:'none',
        text:'',
        ref:null
    }



    componentInit(props){
        const user_list=props.user_list.filter(function (user) {
            return (user.isShared !== null)&&(user.id!==props.user_id);
        });
      this.setState({user_list:user_list,select_user_list:[],match_user_list:user_list});
    }

    componentDidMount(){
        this.componentInit(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.user_list!==nextProps.user_list)
        this.componentInit(nextProps);
    }
    
    handleUserList=(text)=>{
        const {select_user_list,user_list}=this.state;
        const addMamber=this.state.user_list.filter(function (user) {
            return '@'+user.name === text;
        });
        const removeMember=user_list.filter(function (user) {
            return '@'+user.name !== text;
        });
        
        this.setState({select_user_list:select_user_list.concat(addMamber),user_list:removeMember})

    }

    handleTextChange=(e)=>{
        this.setState({text: e.target.value});
        if(e.target.value[0]==='@'){
            const validRegex= /^([@])\S+/g;
            const matchingRegex=  new RegExp(e.target.value);
            const addMamber=this.state.user_list.filter(function (user) {
                return matchingRegex.test('@'+user.name);
            });
            
            this.setState({display:'flex',match_user_list:addMamber});

            if(validRegex.test(e.target.value)&&e.target.value.match(validRegex)!= e.target.value)
            {
                this.handleUserList(e.target.value.match(validRegex)[0]);
                this.setState({display:'none',text: ''});
            }
            return;
        }
        this.setState({display:'none',match_user_list:this.state.user_list});
    }

    selectCancel=(id)=>{
        const {select_user_list,user_list}=this.state;
        const addMamber=select_user_list.filter(function (user) {
            return user.id === id;
        });
        const removeMember=select_user_list.filter(function (user) {
            return user.id !== id;
        });
        
        this.setState({select_user_list:removeMember,user_list:user_list.concat(addMamber)})
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.text!==''){
            if(this.state.select_user_list.length!==0){
                this.props.handleSelectSendMessage(this.state.select_user_list,this.state.text);
            }else{
                this.props.sendMessage(this.state.text);
            }
            this.componentInit(this.props);
            this.setState({text: ''});
            
          
        }
    }

    handleRef=(ref)=>{
        let list_ref=ref;
        if(list_ref)
       list_ref.scrollTop = list_ref.scrollHeight;
    }

    render(){
        return (
            <div className={cx('comment-tool')}>
                <CommentList data={this.props.data} user_id={this.props.user_id} handleRef={this.handleRef} />
                <UserList data={this.state.select_user_list} member={this.state.match_user_list}  display={this.state.display} selectCancel={this.selectCancel}/>
                <CommentForm handleSubmit={this.handleSubmit} handleTextChange={this.handleTextChange} text={this.state.text}/>
            </div>
        )
    }
}

export default CommentTool;
