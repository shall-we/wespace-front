import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Switch from '@material-ui/core/Switch';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Menu, ExpandMore, ExpandLess, CreateNewFolder, FolderShared, Delete, Folder, Share, Lock, 
    GroupAdd, ChevronLeft, ChevronRight, NoteAdd, People, Chat,
    NotificationImportant, Assignment,
    KeyboardArrowRight, Brightness1, AddAlert, PersonAdd} from "@material-ui/icons";
import OneInputModal from "../../modal/OneInputModal";
import AskShareModal from '../../modal/AskShareModal';
import NoticeModal from '../../modal/NoticeModal';
import AskInviteModal from '../../modal/AskShareModal/AskInviteModal';
import AskInviteChatroomModal from '../../modal/AskShareModal/AskInviteChatroomModal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './Contextmenu.css';

import ChatBox from '../chat/chat';
import * as api from "lib/api";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        display:'flex',
    },
    menuButton: {
        marginRight: 3.5
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerOpen: {
        height: 'calc(100vh - 4rem)', 
        position:'unset',
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    drawerClose: {
        height: 'calc(100vh - 4rem)', 
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 5 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 7 + 1
        }
    },
    SubDrawerOpen: {
        height: 'calc(100vh - 4rem)', 
        position:'unset',
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    SubDrawerClose: {
        display: 'none'
    },
    FriendDrawerOpen: {
        height: 'calc(100vh - 4rem)',
        position:'unset',
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    FriendDrawerClose: {
        display: 'none'
    },

    ChatDrawerOpen: {
        height: 'calc(100vh - 4rem)',
        position:'unset',
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    ChatDrawerClose: {
        display: 'none'
    },

    ChatListDrawerOpen :{
        height: 'calc(100vh - 4rem)',
        position:'unset',
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },

    ChatListDrawerClose: {
        display: 'none'
    },

    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
    },
    paper: {
        position : "unset",
    },
    drawerOverflow: {
        overflowX: "hidden",
    },
    list : {
        overflowX: "hidden",
        overflowY: "auto",
    },
    
});

/** @param1 types of modal, @param2 icon, @param3 title of modal, @param4 content of modal, @param5 button */
const createFolderModalData = ["oneInputModal", 'folder-plus', '공유 폴더 생성', '생성할 폴더명을 입력해주세요.', '생성'];
const shareFolderModalData = ["selectModal", 'folder-plus', '공유 폴더 초대', '해당 폴더로 초대할 직원을 선택해주세요.', '완료'];
const deleteFolderModalData = ["noticeModal", 'trash-alt', '공유 폴더 삭제', '공유 폴더를 정말 삭제하시겠습니까?', '삭제'];
const updateFolderModalData = ["oneInputModal", 'file-signature', '폴더 이름 수정', '수정할 폴더명을 새로 입력해주세요.', '수정'];

const createNoteModalData = ["oneInputModal", 'file-alt', '노트 생성', '생성할 노트명을 입력해주세요.', '생성'];
const deleteNoteModalData = ["noticeModal", 'trash-alt', '노트 삭제', '노트를 정말 삭제하시겠습니까?', '삭제'];
const updateNoteModalData = ["oneInputModal", 'file-signature', '노트 이름 수정', '수정할 노트명을 새로 입력해주세요.', '수정'];

const exportNoteModalData = ["oneInputModal", 'file-pdf', '노트 내보내기', '해당 내용을 PDF 파일로 내보내겠습니까?', '확인'];
const lockedNoteModalData = ["noticeModal", 'file-alt', '노트 생성', '생성할 노트명을 입력해주세요.', '생성'];

const deleteFriendModalData = ["noticeModal", 'trash-alt', '친구 삭제', '친구를 정말 삭제하시겠습니까?', '삭제'];
const updateChatTitleModalData = ["oneInputModal", 'file-signature', '채팅방 이름 수정', '수정할 채팅방 이름을 입력하세요.', '수정'];
const deleteChatModalData = ["noticeModal", 'trash-alt', '채팅방 나가기', '이 채팅방에서 나가시겠습니까? ', '나가기'];

const addFriendModalData = ["selectFriendModal", 'group', '친구 추가', '추가할 친구를 선택하세요', '완료'];
const inviteFriendModalData = ["selectInviteChatroomModal", 'group', '친구 초대', '그룹 채팅에 초대할 친구를 선택하세요.', '확인'];


const modalList=[
    createFolderModalData,
    deleteFolderModalData,
    updateFolderModalData,

    createNoteModalData,
    deleteNoteModalData,
    updateNoteModalData,

    exportNoteModalData,
    lockedNoteModalData,
    shareFolderModalData,

    deleteFriendModalData,
    updateChatTitleModalData,
    deleteChatModalData,
    addFriendModalData,
    inviteFriendModalData
]


class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            SubOpen: false,
            ChatOpen: false,
            FriendOpen : false,
            ChatListOpen : false,

            public_navigationOpen: false,
            private_navigationOpen: false,
            friend_navigationOpen: false,

            toggle: false,

            folder_id : 0,
            folder_name : '',
            note_id : 0,
            note_name: '',

            permission:'',
            oneInputModal: false,
            noticeModal: false,
            selectModal: false,
            selectFriendModal: false,
            selectInviteChatroomModal : false,

            modal_action:null,
            modal_text:'',
            modal_id:0,
            modal_icon: '',
            modal_title: '',
            modal_content: '',
            btn_name: '',
        };
    }
    
    handlePublicClick = () => {
        this.setState(state => ({
            public_navigationOpen: !state.public_navigationOpen
        }));
    };
    handlePrivateClick = () => {
        this.setState(state => ({
            private_navigationOpen: !state.private_navigationOpen
        }));
    };
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    handleDrawerClose = () => {
        this.setState({
            open: false,
            SubOpen: false,
            FriendOpen: false,
            ChatOpen: false,
            ChatListOpen :false,
            private_navigationOpen: false,
            public_navigationOpen: false
        });
    };
    handleSubDrawerOpen = () => {
        this.setState({
            SubOpen: true,
            FriendOpen: false,
            ChatOpen: false,
            ChatListOpen : false });
    };
    handleSubDrawerClose = () => {
        this.setState({ SubOpen: false });
    };

    handleChatDrawerClose = () => {
        this.setState({ ChatOpen: false });
    };


    /** [main navigation] handling folder modal */


    handleSetModal=(array,action,id,text)=>{
        this.setState({
            [array[0]]: true,
            modal_icon: array[1],
            modal_title: array[2],
            modal_content: array[3],
            btn_name: array[4],
            modal_action:action,
            modal_id:id,
            modal_text:text
        });
    }
    
    handleUnSetModal=(type)=>{
        this.setState({
            [type]: false
        });
    };

    handleFolderData = (folder_id, folder_name,permission) => {
        this.setState({ folder_name: folder_name, folder_id:folder_id, permission:permission });
        this.props.setFolder(folder_id);
    };

    handleNoteData = (note_id, note_name,note_content) => {
        console.log("note_id : ", note_id);
        this.setState({note_id: note_id , note_name: note_name });
        this.props.setNote({note_content,note_id});
    };

    handleFriendData(friend_id, friend_name) {
        this.setState({friend_id: friend_id , friend_name: friend_name });
    };

    handleFriendDrawerOpen () {
        this.setState({ SubOpen: false, FriendOpen: true, ChatOpen : false, ChatListOpen : false });
    };
    handleFriendDrawerClose () {
        this.setState({ FriendOpen: false });
    };


    async handleChatDrawerOpen (user_id, friend_id){

        let response =  await api.getSingleChat(user_id, friend_id);
        let {result} = response.data;
        let {data} = response.data;


        let chatroom_id;
        if(result === "success"){
            chatroom_id = data[0].chatroom_id;

        }else if(result === "notExist"){
            result = await api.initChatroom(user_id, friend_id);
            chatroom_id = result.data.data.chatroom_id;

        }else {
            new Error("ERROR! 전달 받은 결과가 유효하지 않습니다.");
            return;
        }


        response = await api.getChats(chatroom_id, 1, 0);

        let participants = await api.getChatParticipantsInfo(chatroom_id);
        console.log(participants);
        participants = participants.data;

        if(response.data.chats){
            this.props.setChats({chats : response.data.chats, participants : participants.data, chatroom_id : chatroom_id});
        }
        this.setState({ SubOpen: false, ChatOpen: true, ChatListOpen : false, FriendOpen: false, chatroom_id : chatroom_id  });
    };


    async handleChatDrawerOpenByChatroomId (chatroom_id){

        let response = await api.getChats(chatroom_id, 1, 0);
        let participants = await api.getChatParticipantsInfo(chatroom_id);
        console.log(participants);
        participants = participants.data;

        if(response.data.chats){
            this.props.setChats({chats : response.data.chats, participants : participants.data, chatroom_id : chatroom_id});
        }
        this.setState({ SubOpen: false, ChatOpen: true, ChatListOpen : false, FriendOpen: false, chatroom_id : chatroom_id });
    };


    handleCloseInviteChatroomModal = () => {
        this.setState({selectInviteChatroomModal : false});
    };


    handleChatDrawerClose () {
        this.setState({ ChatOpen: false });
    }


    handleChatListDrawerOpen () {
        this.setState({ FriendOpen : false, SubOpen : false, ChatOpen : false, ChatListOpen: true });
    }

    handleChatListDrawerClose () {
        this.setState({ ChatListOpen: false });
    }


    FolderContextmenu = (item) => (
        <div className='context-menu' key={"folder-" + item.folder_id}>
            <ContextMenuTrigger id={item.folder_id}>
                <ListItem
                    button
                    onClick={event => {
                        this.handleSubDrawerOpen();
                        this.handleFolderData(item.folder_id,item.name, item.permission);
                    }}
                        onDoubleClick={(e)=>this.handleSetModal(modalList[2],this.props.updateFolder,item.folder_id,item.name)}
                        onAuxClick={(e)=>this.handleFolderData(item.folder_id,item.name)}>
                        {item.permission === 'OWNER' ?
                            <ListItemIcon>
                                <Delete onClick={(e)=>this.handleSetModal(modalList[1],this.props.deleteFolder,item.folder_id, null)}/>
                            </ListItemIcon> 
                            : null
                            }
                                    
                        <ListItemText inset primary={item.name} />
                        <div>{item.count}</div>
                 </ListItem> 
            </ContextMenuTrigger>
            <ContextMenu id={item.folder_id}>
                <MenuItem onClick={(e) => this.handleSetModal(modalList[8], [this.props.sharedFolder,this.props.unsharedFolder], this.state.folder_id, this.state.permission)}>
                    폴더 공유
                </MenuItem>
                <MenuItem onClick={(e)=>this.handleSetModal(modalList[3],this.props.createNote, this.state.folder_id, '')}>
                    노트 생성
                </MenuItem>
                {item.permission === 'OWNER' ?(
                <MenuItem onClick={(e)=>this.handleSetModal(modalList[1],this.props.deleteFolder,item.folder_id, null)}>
                    폴더 삭제
                </MenuItem>) : null }
            </ContextMenu>
      </div>
    );

    FileContextmenu = (item) => (
        <div className='context-menu' key={"file-"+item.id}>
            <ContextMenuTrigger id={item.id}>
                <ListItem button key={item.id} 
                    onClick={(e)=>this.handleNoteData(item.id, item.name,item.content)}
                    onDoubleClick={(e)=>this.handleSetModal(modalList[5],this.props.updateNote,{note_id:item.id, folder_id: this.state.folder_id},item.name)}
                    onAuxClick={(e)=>this.handleNoteData(item.id, item.name,item.content)}>
                    <ListItemText primary={item.name} />
                    <br/>
                    {item.reg_date}
                    
                </ListItem>
                <Divider />
            </ContextMenuTrigger>
            <ContextMenu id={item.id}>
                <MenuItem onClick={(e)=>this.handleSetModal(modalList[5],this.props.updateNote,{note_id:item.id, folder_id: this.state.folder_id},item.name)}>
                    이름 변경
                </MenuItem>
                <MenuItem onClick={null}>
                    공유하기
                </MenuItem>
                <MenuItem onClick={null} >
                    잠금
                    <Switch checked={this.state.toggle} onChange={null} value="checkedA" />
                </MenuItem>
                <MenuItem onClick={(e)=>this.handleSetModal(modalList[4],this.props.deleteNote,{note_id:item.id, folder_id: this.state.folder_id}, '')}>
                    삭제
                </MenuItem>
            </ContextMenu>
      </div>
    );

    FriendContextmenu (item) {return (
        <div className='context-menu' key={"friend-" + item.get("id")}>
            <ContextMenuTrigger id={item.get("id")}>
                <ListItem onAuxClick={(e)=>this.handleFriendData(this, item.get("id"), item.get("name"))} style={{wordBreak : "break-all"}}>
                    {item.get("joined") ?
                        <Brightness1 style={{color : "orange", width : "10"}}/>
                        : <Brightness1 style={{color : "green", width : "10"}}/>}
                    <span style={{width : "20%", textAlign : "left", marginLeft : "18px"}}>
                   <img style={{width : 40, height : 40, borderStyle : "groove", borderRadius : "100%"}} src={item.get("profile")} alt="profile"/>
                   </span>
                    <span style={{width: "60%", textAlign : "left", paddingLeft : "10px"}}>{item.get("name")}</span></ListItem>
                <Divider />
            </ContextMenuTrigger>
            <ContextMenu id={item.get("id")}>
                <MenuItem onClick={(e)=>{ this.handleSetModal(modalList[9],this.props.deleteFriend, {user_id : this.props.user_id, friend_id : item.get("id")}, '')}}>
                    친구삭제
                </MenuItem>
                <MenuItem onClick={ (e)=>{ this.handleChatDrawerOpen(this.props.user_id, item.get("id")) }}>
                    채팅하기
                </MenuItem>
            </ContextMenu>
        </div>
    )};


    ChatContextmenu (hasNew, item, index) {
        let timeObj = new Date(item.get("last_update"));
        let timeStr = (timeObj.getMonth()+1) + "/" +timeObj.getDate() + " " + timeObj.getHours() + ":" + timeObj.getMinutes();
        return (
            <div className='context-menu' key={"chat-" + index}>

                <ContextMenuTrigger id={item.get("chatroom_id")}>

                    <Grid container direction="row" spacing={3}  style={{padding : "10px", cursor : "pointer"}} onClick = {(e)=>this.handleChatDrawerOpenByChatroomId(item.get("chatroom_id"))}>
                        <Grid container direction="row" xs={10} alignItems="center"  spacing={0}>
                            {hasNew ?
                                <Grid item xs={3} sm={2} style={{textAlign:"center"}}> <AddAlert style={{color : "red", width : "20"}}/></Grid>
                                :  <Grid item xs={3} sm={2}></Grid>}
                            <Grid item xs={9} sm={10} ><span style={{fontSize : "10pt", marginRight : "3px", fontWeight : "bold"}}>{item.get("chatroom_title") && item.get("chatroom_title").length > 0 ? item.get("chatroom_title") : "이름 없는 채팅방"}</span>
                                <span style={{fontSize : "6pt"}}>{timeStr}</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}><KeyboardArrowRight/></Grid>
                    </Grid>

                    <Divider />
                </ContextMenuTrigger>

                <ContextMenu id={item.get("chatroom_id")}>
                    <MenuItem onClick={(e)=>this.handleSetModal(modalList[11],this.props.deleteChatroom,{user_id : item.get("user_id"), chatroom_id: item.get("chatroom_id")}, '')}>
                        나가기
                    </MenuItem>
                    <MenuItem onClick={(e)=>this.handleSetModal(modalList[10],this.props.updateChatroomTitle,{user_id : item.get("user_id"), chatroom_id: item.get("chatroom_id")}, item.get("chatroom_title"))}>
                        이름 변경
                    </MenuItem>
                </ContextMenu>

            </div>
        )};

    render() {
        const { classes, theme,
             sharedList = [], privateList = [], noteList = [],
             user_id = 0,
             createFolder, sharedFolder,
             unsharedFolder, deleteFolder,
             updateFolder,
             addFriend, deleteFriend,
             createNote, updateNote, deleteNote, friends } = this.props;
        
        return (
            <div className={classes.root}>
                     <OneInputModal
                                            key={"modal-pneInputModal"}
                                             visible={this.state.oneInputModal}
                                             onCancel={(e)=>this.handleUnSetModal('oneInputModal')}
                                             onConfirm={this.state.modal_action}
                                             modal_icon={this.state.modal_icon}
                                             modal_title={this.state.modal_title}
                                             modal_content={this.state.modal_content}
                                             btn_name={this.state.btn_name}
                                             id={this.state.modal_id}
                                             text={this.state.modal_text}
                                             />

                                <NoticeModal
                                            key={"modal-noticeModal"}
                                            visible={this.state.noticeModal}
                                            onCancel={(e)=>this.handleUnSetModal('noticeModal')}
                                            onConfirm={this.state.modal_action}
                                            modal_icon={this.state.modal_icon}
                                            modal_title={this.state.modal_title}
                                            modal_content={this.state.modal_content}
                                            btn_name={this.state.btn_name} 
                                            id={this.state.modal_id}
                                            />
                                
                                <AskShareModal
                                            key={"modal-askShareModal" }
                                            visible={this.state.selectModal}
                                            onCancel={(e)=>this.handleUnSetModal('selectModal')}
                                            onConfirm={this.state.modal_action}
                                            modal_icon={this.state.modal_icon}
                                            modal_title={this.state.modal_title}
                                            modal_content={this.state.modal_content}
                                            btn_name={this.state.btn_name} 
                                            id={this.state.modal_id}
                                            text={this.state.modal_text}
                                           />

                                <AskInviteModal
                                    key={"modal-askInviteModal"}
                                    visible={this.state.selectFriendModal}
                                    onCancel={(e)=>this.handleUnSetModal('selectFriendModal')}
                                    onConfirm={this.state.modal_action}
                                    modal_icon={this.state.modal_icon}
                                    modal_title={this.state.modal_title}
                                    modal_content={this.state.modal_content}
                                    btn_name={this.state.btn_name}
                                    id={this.state.modal_id}
                                    text={this.state.modal_text}
                                />


                                <AskInviteChatroomModal
                                    key={"modal-askInviteChatroomModal"}
                                    visible={this.state.selectInviteChatroomModal}
                                    onCancel={(e)=>this.handleUnSetModal('selectInviteChatroomModal')}
                                    onConfirm={this.state.modal_action}
                                    modal_icon={this.state.modal_icon}
                                    modal_title={this.state.modal_title}
                                    modal_content={this.state.modal_content}
                                    btn_name={this.state.btn_name}
                                    id={this.state.modal_id}
                                    text={this.state.modal_text}
                                    handleCloseInviteChatroomModal = {this.handleCloseInviteChatroomModal}
                                />


                <Drawer 
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open
                    })}
                    classes={{
                        paper: classNames(classes.paper, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })
                    }}
                    open={this.state.open}>
                    <div className={classes.toolbar}>
                        {this.state.open ? (
                            <div>
                                <IconButton onClick={(e)=>this.handleSetModal(modalList[0],createFolder,user_id, '')}>
                                    <CreateNewFolder color="primary"/>

                                </IconButton>

                         
                                <IconButton onClick={(e) => this.handleSetModal(modalList[8], [sharedFolder,unsharedFolder], this.state.folder_id, this.state.permission)}>
                                    <GroupAdd color="primary" />
                                </IconButton>
                              
                                <IconButton
                                    onClick={this.handleDrawerClose}
                                    className={classNames(classes.menuButton)}
                                >
                                <ChevronLeft />
                                </IconButton>
                            </div>
                        ) : (
                            <IconButton
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton)}
                            >
                                <Menu />
                            </IconButton>
                        )}
                    </div>
                    <Divider />
                    <List className={classes.list}>
                        <ListItem 
                            button
                            onClick={event => {
                                this.handleDrawerOpen();
                                this.handlePublicClick();
                            }}
                        >
                            <ListItemIcon>
                                <FolderShared />
                            </ListItemIcon>
                            <ListItemText primary="public" />
                            {this.state.public_navigationOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </ListItem>
                        {/* Open public of main nav */}
                        {sharedList.map((item,id) => (
                            <Collapse
                                in={this.state.public_navigationOpen}
                                timeout="auto"
                                unmountOnExit
                                key={"share-folder-" + item.folder_id}
                            >
                                <List component="div" disablePadding>
                                    {this.FolderContextmenu(item)}
                                </List>
                            </Collapse>
                        ))}
                    </List>
                    <Divider />


                    <List className={classes.list}>
                        <ListItem
                            button
                            onClick={event => {
                                this.handleDrawerOpen();
                                this.handlePrivateClick();
                            }}
                        >
                            <ListItemIcon>
                                <Folder />
                            </ListItemIcon>
                            <ListItemText primary="private" />
                            {this.state.private_navigationOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </ListItem>
                        {/* Open private of nav */}
                        {privateList.map((item, index) => (
                            <Collapse
                                key={"private-folder-" + item.folder_id}
                                in={this.state.private_navigationOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {this.FolderContextmenu(item)}
                                </List>
                            </Collapse>
                        ))}
                    </List>

                    <List className={classes.list} >

                        <ListItem
                            button
                            onClick={event => {
                                this.handleDrawerOpen();
                                this.handleFriendDrawerOpen();
                            }}
                        >
                            <ListItemIcon>
                                <People />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItem>
                    </List>

                    <Divider />

                    <List className={classes.list} >
                        <ListItem
                            button
                            onClick={event => {

                                this.handleChatListDrawerOpen();
                            }}
                        >
                            <ListItemIcon>
                                <Chat />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItem>

                    </List>


                </Drawer>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.SubDrawerClose]: !this.state.SubOpen
                    })}
                    classes={{
                        paper: classNames( {
                            [classes.SubDrawerOpen]: this.state.SubOpen,
                            [classes.SubDrawerClose]: !this.state.SubOpen
                        }),
                    }}
                    open={this.state.SubOpen}>

                    <div className={classes.toolbar}>
                        <div>                                                            
                            <IconButton onClick={(e)=>this.handleSetModal(modalList[3],createNote, this.state.folder_id, '')}>   
                                <NoteAdd color="primary" />
                            </IconButton>
                            
                            <IconButton>
                                <Share color="primary" onClick={this.handleNoteExportPdf} />
                            </IconButton>

                            <IconButton>   
                                <Lock color="primary" onClick={this.handleAccessToFile} />
                            </IconButton>

                            <IconButton
                                onClick={this.handleSubDrawerClose}
                                className={classNames(classes.menuButton)}
                            >
                                {theme.direction === "rtl" ? (
                                    <ChevronRight />
                                ) : (
                                    <ChevronLeft />
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.drawerOverflow}>
                    <List>
                        {noteList.map((item) => (this.FileContextmenu(item)))}
                    </List>
                    </div>

                </Drawer>



                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.FriendDrawerClose]: !this.state.FriendOpen
                    })}
                    classes={{
                        paper: classNames( {
                            [classes.FriendDrawerOpen]: this.state.FriendOpen,
                            [classes.FriendDrawerClose]: !this.state.FriendOpen
                        }),
                    }}
                    open={this.state.FriendOpen}>
                    <div className={classes.toolbar} style={{marginRight: 6}}>

                        <div>
                            <IconButton>
                                <PersonAdd color="primary" onClick={(e)=>{this.handleSetModal(modalList[12], [addFriend, deleteFriend], user_id, '', false)}} />
                            </IconButton>

                            <IconButton
                                onClick={(e)=>this.handleFriendDrawerClose()}
                            >
                                {theme.direction === "rtl" ? (
                                    <ChevronRight />
                                ) : (
                                    <ChevronLeft />
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.drawerOverflow}>

                        {friends.map((item, index) => (
                            <List component="div" disablePadding style = {{cursor : "pointer"}}>
                                {this.FriendContextmenu.call(this, item)}
                            </List>
                        ))}

                    </div>

                </Drawer>


                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.ChatListDrawerClose]: !this.state.ChatListOpen
                    })}
                    classes={{
                        paper: classNames( {
                            [classes.ChatListDrawerOpen]: this.state.ChatListOpen,
                            [classes.ChatListDrawerClose]: !this.state.ChatListOpen
                        }),
                    }}
                    open={this.state.FriendOpen}>

                    {
                        this.hasNotReadChat = (myViewTime, lastUpdateTime) => {
                            return Date.parse(myViewTime) < Date.parse(lastUpdateTime) ? true : false;
                        }}

                    <div className={classes.toolbar} style={{marginRight: 6}}>

                        <div>

                            <IconButton
                                onClick={(e)=>this.handleChatListDrawerClose()}
                            >
                                {theme.direction === "rtl" ? (
                                    <ChevronRight />
                                ) : (
                                    <ChevronLeft />
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.drawerOverflow}>

                        {this.props.privateChatList.map((item, index) => (
                            this.ChatContextmenu.call(this, this.hasNotReadChat(item.get("view_time"), item.get("last_update")), item, index)
                        ))}

                    </div>

                </Drawer>



                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.ChatDrawerClose]: !this.state.ChatOpen
                    })}
                    classes={{
                        paper: classNames( {
                            [classes.ChatDrawerOpen]: this.state.ChatOpen,
                            [classes.ChatDrawerClose]: !this.state.ChatOpen
                        }),
                    }}
                    open={this.state.ChatOpen}>
                    <div className={classes.toolbar} style={{marginRight: 6}}>

                        <div>
                            <IconButton onClick={(e)=>{this.handleSetModal(modalList[13], [addFriend, deleteFriend], {user_id : user_id, chatroom_id : this.state.chatroom_id}, '', false)}}>
                                <PersonAdd color="primary"/>
                            </IconButton>

                            <IconButton
                                onClick={(e)=>this.handleChatDrawerClose()}
                            >
                                {theme.direction === "rtl" ? (
                                    <ChevronRight />
                                ) : (
                                    <ChevronLeft />
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.drawerOverflow}>
                        <ChatBox
                            chats = {this.props.chats}
                            userId = {this.props.user_id}
                            sendChat = {this.props.sendChat}
                            joinChatRoom = {this.props.joinChatRoom}
                            leaveChatRoom = {this.props.leaveChatRoom}

                        />
                    </div>

                </Drawer>
            </div>
        );
    }
}

Directory.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Directory);
