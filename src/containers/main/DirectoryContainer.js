import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as directoryActions from "store/modules/directory";
import * as UserActions from "store/modules/user";
import * as noticeActions from "store/modules/notice";

import Directory from "components/main/Directory";
import { withRouter } from "react-router-dom";

import socketio from "socket.io-client";
const socket = socketio.connect("http://localhost:4000");

class DirectoryContainer extends React.Component {

    updateFolderList=()=>{
        const {DirectoryActions,id}=this.props;
        if(id){
        DirectoryActions.getPrivateList(id);
        DirectoryActions.getSharedList(id);
        }
    }

    createFolder=async(user_id,folder_name)=>{
        await this.props.DirectoryActions.createFolder(user_id, folder_name);
        socket.emit('updateFolderList',{ msg:'createFolder'});

    }
    sharedFolder=async(user_id,folder_id,permission)=>{
        const {UserActions,DirectoryActions,folder,NoticeActions,id}=this.props;
        await DirectoryActions.sharedFolder(user_id,folder_id,permission);
        await NoticeActions.sendMessage('FOLDER',id,folder_id,'초대','SINGLE',user_id);
        await UserActions.getUserList(folder);
        socket.emit('updateFolderList',{ msg:'sharedFolder'});
    }
    unsharedFolder=async(folder_id,user_id)=>{
        const {UserActions,DirectoryActions,folder,NoticeActions,id}=this.props;
        await DirectoryActions.unsharedFolder(folder_id,user_id);
        await NoticeActions.sendMessage('FOLDER',id,folder_id,'탈퇴','SINGLE',user_id);
        await UserActions.getUserList(folder);
        socket.emit('updateFolderList',{ msg:'sharedFolder'});
    }

    deleteFolder=async(folder_id) => {
        await this.props.DirectoryActions.deleteFolder(folder_id);
        await this.props.DirectoryActions.getNoteList(0);
        socket.emit('updateFolderList',{ msg:'deleteFolder'});
    }

    updateFolder=async(folder_id, folder_name) => {
        await this.props.DirectoryActions.updateFolder(folder_id, folder_name);
        await this.props.NoticeActions.sendMessage('FOLDER',this.props.id,folder_id,'이름변경','MULTI',null);
        socket.emit('updateFolderList',{ msg:'updateFolder'});
    }
///////////////////////////////---------------------NOTE----------------------//////////////////////////////


    updateNoteList=()=>{
        const {DirectoryActions,folder}=this.props;
        console.log('updateNoteList::',folder);
        if(folder)
        DirectoryActions.getNoteList(folder);
    }

    createNote=async(folder_id,note_name)=>{
        const {DirectoryActions}=this.props;
        await DirectoryActions.createNote(folder_id,note_name);
        socket.emit('updateFolderList',{ msg:'createNote'});
        socket.emit('updateNoteList',{ msg:'createNote'});
       
    }

    updateNote=async(ids, note_name) => {
        const {DirectoryActions,NoticeActions,id} = this.props;
        await DirectoryActions.updateNote(ids.note_id, note_name);
        await NoticeActions.sendMessage('NOTE',id,ids.note_id,'이름변경','MULTI',null);
        socket.emit('updateNoteList',{ msg:'updateNote'});

    }

    deleteNote=async(ids) => {
        const {DirectoryActions,NoticeActions,id} = this.props;
        await DirectoryActions.deleteNote(ids.note_id);
        await NoticeActions.sendMessage('NOTE',id,ids.note_id,'삭제','MULTI',null);
        socket.emit('updateFolderList',{ msg:'deleteNote'});
        socket.emit('updateNoteList',{ msg:'deleteNote'});

        DirectoryActions.setNote(null);
    }


    setNote=async(note)=>{
        const {DirectoryActions,NoticeActions,UserActions,folder,id} = this.props;
        await UserActions.getUserList(folder);
        await DirectoryActions.setNote(note);
        await NoticeActions.updateNoticeList(id,note.note_id,'COMMENT');
        await NoticeActions.getNoticeList(note.note_id,'COMMENT',id);
        await socket.emit('updateCommentList',{ msg:'setNote'});
    }
    setFolder=async(folder_id)=>{
        const {DirectoryActions} = this.props;
        await DirectoryActions.setFolder(folder_id);
        await DirectoryActions.getNoteList(folder_id);
        
    }


    componentWillMount(){
        setTimeout(()=>{
            if(this.props.id){
                this.updateFolderList();
                }else{
                    this.props.history.push('/');
                }
        }, 1000);
       
    }
    componentDidMount(){
        socket.on('updateFolderList',(obj)=>{
            this.updateFolderList();
        })
        socket.on('updateNoteList',(obj)=>{
            this.updateNoteList();
        })
    }

    render() {
        const { sharedList,privateList, noteList, id} = this.props;
        const { createFolder,sharedFolder,unsharedFolder, deleteFolder, updateFolder, updateNote, createNote, deleteNote, setNote,setFolder} = this;
        return (
            <div style={{ display: "flex" }}>
                <Directory 
                sharedList={sharedList} privateList={privateList}  noteList={noteList} user_id={id}
                createFolder={createFolder} updateFolder={updateFolder} deleteFolder={deleteFolder} sharedFolder={sharedFolder} unsharedFolder={unsharedFolder}
                createNote={createNote} updateNote={updateNote}  deleteNote={deleteNote} 
                setNote={setNote} setFolder={setFolder}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        sharedList: state.directory.get("sharedList"),
        privateList: state.directory.get("privateList"),
        noteList: state.directory.get("noteList"),
        folder: state.directory.get("folder"),
        id: state.user.get("id"),
    }),
    (dispatch) => ({
        DirectoryActions: bindActionCreators(directoryActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch),
        NoticeActions: bindActionCreators(noticeActions, dispatch)
    })
)(withRouter(DirectoryContainer));
