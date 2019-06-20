import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as noticeActions from "store/modules/notice";
import * as noteToolActions from "store/modules/noteTool";

import NoteToolTemplate from "components/common/NoteToolTemplate";
import NoteToolBox from "components/toolbox/NoteToolBox";
import CommentTool from "components/tool/CommentTool";
import AttachmentTool from "components/tool/AttachmentTool";
import {  ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import {socket} from './Socket';


class NoteToolContainer extends Component {
  state = {
    user_id: this.props.user_id,
    comment: this.props.comment,
    note_id: this.props.note_id,
    user_list: this.props.user_list,
    attachmentList: this.props.attachmentList,
    attachment: this.props.attachment,
    note_uuid: this.props.note_uuid,
    width : "250px",
    isSpread : true,
    background : null,
    isBtnHovered : false
  }
  /////////////////////////////////////////////////////첨부파일
  getAttachmentList = async () => {
    console.log('getAttachmentList');
    const { NoteToolActions } = this.props; //note_id
    await NoteToolActions.getAttachmentList(this.state.note_id);
  };

  deleteAttachment = async (attachment_id) => {
    console.log('deleteAttachment');
    const { NoteToolActions } = this.props;
    await NoteToolActions.deleteAttachment(attachment_id);
    socket.emit('updateShareBox', { msg: 'deleteAttachment' });
  }

  addAttachment = async (uploadList) => {
    console.log('addAttachment');
    const { NoteToolActions } = this.props; //note_id
    await NoteToolActions.addAttachment(this.state.note_id, uploadList);
    socket.emit('updateShareBox', { msg: 'addAttachment' });
  };

downloadAttachment=async(url)=>{
  console.log('downloadAttachment');
  const {NoteToolActions} =this.props;
  await NoteToolActions.downloadAttachment(url);
  socket.emit('updateShareBox',{ msg:'downloadAttachment'});
}

/////////////////////////////////////////첨부파일 영역



  handleSendMessage=async(message)=>{
    const {NoticeActions,user_id} =this.props;
    await NoticeActions.sendMessage('COMMENT',user_id,this.state.note_id,message,'MULTI',null);
    socket.emit('updateCommentList',{ msg:'handleSendMessage'});
  }

  handleSelectSendMessage = async (to_list, message) => {
    const { NoticeActions, user_id } = this.props;
    const { note_id } = this.state;
    await to_list.forEach(function (user) {
      NoticeActions.sendMessage('CHAT', user_id, note_id, message, 'SINGLE', user.id);
      NoticeActions.sendMessage('CHAT', user_id, note_id, message, 'SINGLE', user_id);
      socket.emit('updateNoticeList', {msg: 'CHAT'});
    });
    socket.emit('updateCommentList', { msg: 'handleSendMessage' });
  }

  updateCommentList=async()=>{
    await this.props.NoticeActions.updateNoticeList(this.state.user_id,this.state.note_id,'COMMENT');
    await this.props.NoticeActions.getNoticeList(this.state.note_id,'COMMENT',this.state.user_id);
  }


componentDidMount(){
    socket.on('updateCommentList',(obj)=>{
      if(this.props.note_id)
      {
        this.updateCommentList();
      }
    })

    socket.on('updateShareBox',(obj)=>{
      if(this.props.note_id)
      {
        this.getAttachmentList();
      }
    })
}


    toggling = () => {
        const {isSpread} = this.state;
        console.log(isSpread);
        if(isSpread){
            this.setState({width : 0, isSpread : false, isBtnHovered : false });
        }else{
            this.setState({width : "250px", isSpread : true, isBtnHovered : false});
        }
    };

    renderSpreadBtn = (isSpread) => {
        const nonHoveredStyle = {width : "40px", height : "40px",
            marginLeft : "-25px", marginTop : "200px",  backgroundColor : "transparent",
            color : "grey",
            textAlign : "center"};
        const hoveredStyle = Object.assign({}, nonHoveredStyle);
        hoveredStyle.color = "#339AF0";
        let iconStyle = this.state.isBtnHovered ? hoveredStyle : nonHoveredStyle;
        const mouseHoverToggle = () => {
            this.setState({isBtnHovered : !this.state.isBtnHovered});
        };
        return (
            <div onClick = {this.toggling}
                 style={{height : "100%", cursor : "pointer", position : "fixed", display : "block"}}>
                {isSpread ? <ArrowForwardIos style={iconStyle} onMouseEnter = { mouseHoverToggle } onMouseLeave={ mouseHoverToggle } color="action"/> : <ArrowBackIos style={iconStyle} onMouseEnter = { mouseHoverToggle } onMouseLeave={ mouseHoverToggle } color="action"/>}
            </div>)
    };

componentWillReceiveProps(nextProps) {


    if (this.props.note_id !== nextProps.note_id) {
      this.setState({ note_id: nextProps.note_id });
    }

    if(this.props.comment!==nextProps.comment||this.props.note_uuid!==nextProps.note_uuid)
    {
      this.setState({comment:nextProps.comment,note_id:nextProps.note_id, user_id:nextProps.user_id,user_list:nextProps.user_list,note_uuid:nextProps.note_uuid});
    } else if (this.props.attachmentList !== nextProps.attachmentList) {
      this.setState({ attachmentList: nextProps.attachmentList, attachment: nextProps.attachment });
    } else if (this.props.attachment !== nextProps.attachment) {
      this.setState({ attachment: nextProps.attachment });
    }

}

  render() {
    const { comment, note_id, user_id, user_list, note_uuid, isSpread, width, display, background } = this.state;
    const { attachmentList, attachment } = this.props;
    const { addAttachment, deleteAttachment, downloadAttachment } = this;
    if (note_uuid) {
      return (
          <div style={{minWidth : "5px", backgroundColor : background}}>
              {this.renderSpreadBtn(isSpread)}
        <NoteToolTemplate  display={display} isSpread={isSpread} width={width} >
          <NoteToolBox items={['댓글', '첨부']} >
            <CommentTool data={comment} sendMessage={this.handleSendMessage} handleSelectSendMessage={this.handleSelectSendMessage} user_id={user_id} user_list={user_list} />
            <AttachmentTool
              data={attachmentList}
              attachment={attachment}
              addAttachment={addAttachment}
              deleteAttachment={deleteAttachment}
              downloadAttachment={downloadAttachment}
            />
          </NoteToolBox>
        </NoteToolTemplate>
          </div>
      );
    } else {
      return (
        <null />
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