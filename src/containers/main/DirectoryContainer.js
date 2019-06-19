import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as directoryActions from "store/modules/directory";
import * as UserActions from "store/modules/user";
import * as noticeActions from "store/modules/notice";
import * as ChatActions from "store/modules/chat";

import Directory from "components/main/Directory";
import { withRouter } from "react-router-dom";

import socket from './Socket';

class DirectoryContainer extends React.Component {

    join=(user_id)=>{
        socket.emit('join', {id : user_id});
    };

    getFriendList=(user_id)=>{
        console.log("socket.. getFriendList");
        socket.emit('getFriendList', {id : user_id});
    };

    setFriends=(friends)=>{
        const {DirectoryActions} = this.props;
        DirectoryActions.setFriends(friends);

    };

    joinFriend = (friendId) =>{
        const {DirectoryActions} = this.props;
        DirectoryActions.setJoinFriend(friendId);
    };

    deleteFriend = async (obj, friend_id)=>{
        console.log("친구 삭제", obj, friend_id);
        const {DirectoryActions} = this.props;
        if(obj instanceof Object ) {
            await DirectoryActions.deleteFriend(obj.user_id, obj.friend_id);
            this.getFriendList(obj.user_id);
        }
        else {
            await DirectoryActions.deleteFriend(obj, friend_id);
            this.getFriendList(obj);
        }
    };

    outFriend = (friendId) =>{
        const {DirectoryActions} = this.props;
        DirectoryActions.setOutFriend(friendId);
    };

    setChats = (chats) => {
        const {ChatActions} = this.props;
        ChatActions.setChats(chats);
    };

    updateChatroomTitle = async (user_id, chatroom_id, newTitle) => {
        const {ChatActions} = this.props;
        ChatActions.updateChatroomTitle(user_id, chatroom_id, newTitle);
    };

    addFriend = async (user_id, friend_id) => {
        const {DirectoryActions} = this.props;
        await DirectoryActions.addFriend(user_id, friend_id);
        this.getFriendList(user_id);

    };

    deleteChatroom = async (data) => {
        const {ChatActions} = this.props;
        ChatActions.dropChatroom(data.user_id, data.chatroom_id);
    };

    joinChatRoom = (chatroom_id) => {
        socket.emit("joinChatroom", chatroom_id);
    };

    leaveChatRoom = (chatroom_id) => {
        console.log("leaveChatroom", chatroom_id);
        socket.emit("leaveChatroom", chatroom_id);
    };

    sendChat = (chatObj) => {
        console.log("message fired!", chatObj);
        socket.emit('broadcastChat', chatObj);
    };

    getChatList = () => {
        const {ChatActions, id} = this.props;
        if(id){
            ChatActions.setPrivateChatList(id);
        }
    };


    updateFolderList=()=>{
        const {DirectoryActions,id}=this.props;
        if(id){
        DirectoryActions.getPrivateList(id);
        DirectoryActions.getSharedList(id);
        }
        console.log('== debug ==', id);

    }

    createFolder=async(user_id,folder_name)=>{
        await this.props.DirectoryActions.createFolder(user_id, folder_name);
        await socket.emit('updateFolderList',{ msg:'createFolder'});
    }
    sharedFolder=async(user_id,folder_id,permission)=>{
        const {UserActions,DirectoryActions,folder,NoticeActions,id}=this.props;
        await DirectoryActions.sharedFolder(user_id,folder_id,permission);
        await NoticeActions.sendMessage('FOLDER',id,folder_id,'초대','SINGLE',user_id);
        await UserActions.getUserList(folder);
        socket.emit('updateFolderList',{ msg:'sharedFolder'});
        socket.emit('updateNoticeList',{ msg:'FOLDER'});
    }
    unsharedFolder=async(folder_id,user_id)=>{
        const {UserActions,DirectoryActions,folder,NoticeActions,id}=this.props;
        await DirectoryActions.unsharedFolder(folder_id,user_id);
        await NoticeActions.sendMessage('FOLDER',id,folder_id,'탈퇴','SINGLE',user_id);
        await UserActions.getUserList(folder);
        socket.emit('updateFolderList',{ msg:'sharedFolder'});
        socket.emit('updateNoticeList',{ msg:'FOLDER'});
    }

    deleteFolder=async(folder_id) => {
        const {DirectoryActions} = this.props;
        await this.props.DirectoryActions.deleteFolder(folder_id);
        await this.props.DirectoryActions.getNoteList(0);
        socket.emit('updateFolderList',{ msg:'deleteFolder'});
        socket.emit('updateNoteList',{ msg:'deleteFolder'});

        DirectoryActions.setNote(null);
    }

    updateFolder=async(folder_id, folder_name) => {
        await this.props.DirectoryActions.updateFolder(folder_id, folder_name);
        await this.props.NoticeActions.sendMessage('FOLDER',this.props.id,folder_id,'이름변경','MULTI',null);
        socket.emit('updateFolderList',{ msg:'updateFolder'});
        socket.emit('updateNoticeList',{ msg:'FOLDER'});
    }

    permissionTransform=(folder_id) => {
        const {id} = this.props;
        this.unsharedFolder(folder_id, id);
    }

///////////////////////////////---------------------NOTE----------------------//////////////////////////////


    updateNoteList=()=>{
        const {DirectoryActions,folder}=this.props;
        console.log('updateNoteList::',folder);
        if(folder)
        DirectoryActions.getNoteList(folder);
    }

    updateSearchNoteList=async (search)=>{
        const {DirectoryActions,folder}=this.props;
        console.log('updateSearchNoteList::',folder);
        if(folder)
        await DirectoryActions.getSearchNoteList(folder, '%'+search+'%');
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
        socket.emit('updateNoticeList',{ msg:'NOTE'});
    }

    deleteNote=async(ids) => {
        const {DirectoryActions,NoticeActions,id} = this.props;
        await DirectoryActions.deleteNote(ids.note_id);
        await NoticeActions.sendMessage('NOTE',id,ids.note_id,'삭제','MULTI',null);
        socket.emit('updateFolderList',{ msg:'deleteNote'});
        socket.emit('updateNoteList',{ msg:'deleteNote'});

        DirectoryActions.setNote(null);
    }
    publishNote=async(note_id) => {
        const {DirectoryActions,NoticeActions,id} = this.props;
        await DirectoryActions.publishNote(note_id);
        await NoticeActions.sendMessage('NOTE',id,note_id,'배포','MULTI',null);
        socket.emit('updateNoticeList',{ msg:'NOTE'});
        socket.emit('updateNoteList',{ msg:'publishNote'});
    }
    activedNote=async(note_id) => {
        const {DirectoryActions,NoticeActions,id} = this.props;
        await DirectoryActions.activedNote(note_id);
        await NoticeActions.sendMessage('NOTE',id,note_id,'복구','MULTI',null);
        socket.emit('updateNoticeList',{ msg:'NOTE'});
        socket.emit('updateNoteList',{ msg:'activedNote'});
    }

    setNote=async(note)=>{
        const {DirectoryActions,NoticeActions,UserActions,folder,id} = this.props;
        await UserActions.getUserList(folder);
        await DirectoryActions.setNote(note); 
        await NoticeActions.updateNoticeList(id,note.note_id,'COMMENT');
        await NoticeActions.getNoticeList(note.note_id,'COMMENT',id);
        await socket.emit('updateShareBox',{ msg:'setNote'});
        await socket.emit('updateCommentList',{ msg:'setNote'});
    }
    setFolder=async(folder_id)=>{
        const {DirectoryActions} = this.props;
        await DirectoryActions.setFolder(folder_id);
        await DirectoryActions.getNoteList(folder_id);
    }

    setDeletedNoteList=async(folder_id)=>{
        const {DirectoryActions} = this.props;
        await DirectoryActions.setFolder(folder_id);
        await DirectoryActions.getDeletedNoteList(folder_id);
    }

    setLock= async (note)=>{
        const {DirectoryActions, NoticeActions ,id} = this.props;
        console.log("result : ", note.note_id, note.lock);
        await DirectoryActions.setNoteLock(note.note_id, note.lock);
        await NoticeActions.sendMessage('NOTE',id,note.note_id,(note.lock === "LOCK") ? ('잠금') : ('잠금해제'),'MULTI',null);
        await socket.emit('updateNoteList',{msg :'setLock'});
        await socket.emit('updateNoticeList',{ msg:'NOTE'});
      
        setTimeout(()=>{
             socket.emit('updateNoteLock',{note:note});
        }, 300);
    }

    componentWillMount(){
        setTimeout(()=>{
            if(this.props.id){
                this.updateFolderList();
                this.getChatList();
                this.join(this.props.id);
                this.getFriendList(this.props.id);
                }else{
                    this.props.history.push('/');
                }
        }, 1000);
       
    }
    componentDidMount(){
        socket.on('updateFolderList',(obj)=>{
            console.log('폴더 업뎃함');
            this.updateFolderList();
        });
        socket.on('updateNoteLock',(obj)=>{
            const {note} =obj;

            if(this.props.note_id===note.note_id) {
                console.log('note data ::::', obj);
                this.props.DirectoryActions.setNoteLockState(note.lock);
            }
        });
        socket.on('updateNoteList',(obj)=>{
            console.log('노트 업뎃함');
            this.updateNoteList();
        });
        socket.on('getFriendList', obj => {
            console.log("친구 목록 갱신.. ", obj);
            this.setFriends(obj);
        });
        socket.on('friendJoin', friend => {
            this.joinFriend(friend);
        });

        socket.on('friendOut', friendId => {
            this.outFriend(friendId);
        });

        //채팅 왔을때
        socket.on('broadcastChat', (chatObj)=>{
            const {ChatActions} = this.props;
            ChatActions.setChatMessage(chatObj);
        });
    }

    render() {
        const { sharedList,privateList, noteList, id, friends, chats, privateChatList} = this.props;
        const { createFolder,sharedFolder,unsharedFolder, deleteFolder, updateFolder, setFolder,
                updateNote, createNote, deleteNote, setNote, setLock, updateSearchNoteList, 
                joinChatRoom, leaveChatRoom, deleteFriend, addFriend, permissionTransform, setDeletedNoteList,
                setChats, sendChat, updateChatroomTitle, deleteChatroom, getFriendList, publishNote,activedNote } = this;

        return (
            <div style={{ display: "flex" }}>
                <Directory
                    sharedList={sharedList} privateList={privateList} noteList={noteList} user_id={id}
                    createFolder={createFolder} updateFolder={updateFolder} deleteFolder={deleteFolder}
                    sharedFolder={sharedFolder} unsharedFolder={unsharedFolder} setDeletedNoteList ={setDeletedNoteList}
                    createNote={createNote} updateNote={updateNote}  deleteNote={deleteNote} setLock={setLock} updateSearchNoteList={updateSearchNoteList}
                    setNote={setNote} setFolder={setFolder} setChats={setChats} sendChat = {sendChat}
                    friends = {friends} joinChatRoom = {joinChatRoom} deleteChatroom = {deleteChatroom}
                    getFriendList = {getFriendList} deleteFriend = {deleteFriend} permissionTransform={permissionTransform}
                    addFriend = {addFriend} leaveChatRoom = {leaveChatRoom} chats = {chats} publishNote={publishNote } activedNote ={activedNote}
                    privateChatList = {privateChatList} updateChatroomTitle = {updateChatroomTitle}
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
        note_id: state.directory.get("note_id"),
        id: state.user.get("id"),
        chats : state.chat.get("chats"),
        friends: state.directory.get("friends"),
        privateChatList : state.chat.get("privateChatList")
    }),
    (dispatch) => ({
        DirectoryActions: bindActionCreators(directoryActions, dispatch),
        UserActions: bindActionCreators(UserActions, dispatch),
        NoticeActions: bindActionCreators(noticeActions, dispatch),
        ChatActions : bindActionCreators(ChatActions, dispatch)

    })
)(withRouter(DirectoryContainer));
