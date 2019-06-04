import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as directoryActions from 'store/modules/directory';
import Context from 'components/main/Context';
import Editor from 'components/main/Editor';
import * as noticeActions from 'store/modules/notice';
import {withRouter} from 'react-router-dom';

class ContextContainer extends Component {

  state={
    noteNotice:this.props.noteNotice,
    folderNotice:this.props.folderNotice
  }

  componentWillMount(){
    setTimeout(()=>{
      if(this.props.user_id){
        this.props.NoticeActions.getNoticeList(this.props.user_id,'NOTE');
        this.props.NoticeActions.getNoticeList(this.props.user_id,'FOLDER');
          }else{
              this.props.history.push('/');
          }
  }, 1000);
 
}
componentWillReceiveProps(nextProps) {

  if(this.props.noteNotice!==nextProps.noteNotice||this.props.folderNotice!==nextProps.folderNotice)
  {
    this.setState({noteNotice:nextProps.noteNotice,folderNotice:nextProps.folderNotice});
  }

}

    render() {
      const { note,name,profile} = this.props;
      const {noteNotice,folderNotice}=this.state;
      console.log('noteNotice',noteNotice);
      if(note){
      return (
          <Editor  key={note} note={note} name={name} profile={profile} />
    );
      }else{
        return(
             <Context noteNotice={noteNotice} folderNotice={folderNotice}/>
        )
      }
  }
}
   
export default connect(
  (state) => ({
    note: state.directory.get("note"),
    name: state.user.get("name"),
    user_id: state.user.get("id"),
    profile:state.user.get("profile"),
    noteNotice:state.notice.get("NOTE"),
    folderNotice:state.notice.get("FOLDER"),
    
  }),
  (dispatch) => ({
    DirectoryActions: bindActionCreators(directoryActions, dispatch),
    NoticeActions: bindActionCreators(noticeActions, dispatch)
  })
)(withRouter(ContextContainer));