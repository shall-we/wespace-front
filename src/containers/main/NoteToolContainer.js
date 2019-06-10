import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as noticeActions from "store/modules/notice";
import * as noteToolActions from "store/modules/noteTool";

import NoteToolTemplate from "components/common/NoteToolTemplate";
import NoteToolBox from "components/toolbox/NoteToolBox";
import CommentTool from "components/tool/CommentTool";
import AttachmentTool from "components/tool/AttachmentTool";

import socketio from "socket.io-client";
const socket = socketio.connect("http://localhost:4000");

class NoteToolContainer extends Component {
  state={
    user_id:this.props.user_id,
    comment:this.props.comment,
    note_id:this.props.note_id,
    user_list:this.props.user_list 
  }
/////////////////////////////////////////////////////첨부파일
  getAttachmentList = ()=>{
    console.log('getAttachmentList');
    const { NoteToolActions }= this.props; //note_id
    NoteToolActions.getAttachmentList(this.state.note_id);
  };

  deleteAttachment = async(attachment_id)=>{
    console.log('deleteAttachment');
    const {NoteToolActions}= this.props;
    await NoteToolActions.deleteAttachment(attachment_id);
    NoteToolActions.getAttachmentList(this.state.note_id);
  }

  addAttachment = async(uploadList)=>{
    console.log('addAttachment');
    const {NoteToolActions} = this.props; //note_id
    await NoteToolActions.addAttachment(this.state.note_id,uploadList);
    NoteToolActions.getAttachmentList(this.state.note_id);
  }

  downloadAttachment=async(url)=>{
    console.log('downloadAttachment');
    const {NoteToolActions} =this.props;
    await NoteToolActions.downloadAttachment(url);
  }

/////////////////////////////////////////첨부파일 영역



  handleSendMessage=async(message)=>{
    const {NoticeActions,user_id} =this.props;
    await NoticeActions.sendMessage('COMMENT',user_id,this.state.note_id,message,'MULTI',null);
    socket.emit('updateCommentList',{ msg:'handleSendMessage'});
  }

  handleSelectSendMessage=async(to_list,message)=>{
    const {NoticeActions,user_id} =this.props;
    const {note_id}=this.state;
   await to_list.forEach(function (user) {
      NoticeActions.sendMessage('CHAT',user_id,note_id,message,'SINGLE',user.id);
      NoticeActions.sendMessage('CHAT',user_id,note_id,message,'SINGLE',user_id);
  });
    socket.emit('updateCommentList',{ msg:'handleSendMessage'});
  }

  updateCommentList=async()=>{
    await this.props.NoticeActions.updateNoticeList(this.state.user_id,this.state.note_id,'COMMENT');
    await this.props.NoticeActions.getNoticeList(this.state.note_id,'COMMENT',this.state.user_id);
  }


componentDidMount(){
    socket.on('updateCommentList',(obj)=>{
      if(this.props.note_id)
      {
        this.getAttachmentList();
        this.updateCommentList();
      }
    })
}

componentWillReceiveProps(nextProps) {

  if(this.props.comment!==nextProps.comment)
  {
    this.setState({comment:nextProps.comment,note_id:nextProps.note_id, user_id:nextProps.user_id,user_list:nextProps.user_list});
  }

}

    render() {
      const {comment,note_id,user_id,user_list}=this.state;
      const { attachmentList, attachment} = this.props;
      const {addAttachment , deleteAttachment, downloadAttachment} = this;
      if(note_id){
      return (
          <NoteToolTemplate >
             <NoteToolBox items={ ['댓글', '첨부'] } >
                <CommentTool data={comment} sendMessage={this.handleSendMessage} handleSelectSendMessage={this.handleSelectSendMessage} user_id={user_id} user_list={user_list}/>
                <AttachmentTool 
                data={attachmentList}
                attachment = {attachment}
                addAttachment = {addAttachment} 
                deleteAttachment = {deleteAttachment}
                downloadAttachment = {downloadAttachment}
                />
             </NoteToolBox>
          </NoteToolTemplate>
                
    );
      }else{
        return(
             <null/>
        )
      }
  }
}
   
export default connect(
  (state) => ({
    note_id: state.directory.get("note_id"),
    user_id: state.user.get('id'),
    comment: state.notice.get("COMMENT"),
    attachmentList : state.noteTool.get("attachmentList"),
    attachment : state.noteTool.get("attachment"),
    user_list: state.user.get('user_list'),
  }),
  (dispatch) => ({
    NoticeActions: bindActionCreators(noticeActions, dispatch),
    NoteToolActions : bindActionCreators(noteToolActions, dispatch)
  })
)(NoteToolContainer);