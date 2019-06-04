import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Switch from '@material-ui/core/Switch';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Menu, ExpandMore, ExpandLess, CreateNewFolder, FolderShared, Delete, Folder, Share, Lock, 
    GroupAdd, ChevronLeft, ChevronRight, NoteAdd} from "@material-ui/icons";
import OneInputModal from "../../modal/OneInputModal";
import AskShareModal from '../../modal/AskShareModal';
import NoticeModal from '../../modal/NoticeModal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './Contextmenu.css';

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


const modalList=[
    createFolderModalData,
    deleteFolderModalData,
    updateFolderModalData,

    createNoteModalData,
    deleteNoteModalData,
    updateNoteModalData,

    exportNoteModalData,
    lockedNoteModalData,
    shareFolderModalData
]


class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            SubOpen: false,
            public_navigationOpen: false,
            private_navigationOpen: false,

            toggle: false,

            folder_id : 0,
            folder_name : '',
            note_id : 0,
            note_name: '',

            permission:'',
            oneInputModal: false,
            noticeModal: false,
            selectModal: false,

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
        this.setState({ open: false });
        this.setState({ SubOpen: false });
        this.setState({ private_navigationOpen: false });
        this.setState({ public_navigationOpen: false });
    };
    handleSubDrawerOpen = () => {
        this.setState({ SubOpen: true });
    };
    handleSubDrawerClose = () => {
        this.setState({ SubOpen: false });
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
    }

    handleFolderData = (folder_id, folder_name,permission) => {
        this.setState({ folder_name: folder_name, folder_id:folder_id, permission:permission });
        this.props.setFolder(folder_id);
    };

    handleNoteData = (note_id, note_name,note_content) => {
        console.log("note_id : ", note_id);
        this.setState({note_id: note_id , note_name: note_name });
        this.props.setNote({note_content,note_id});
    };

    FolderContextmenu = (item) => (
        <div className='context-menu' key={item.folder_id}>
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
    )

    FileContextmenu = (item) => (
        <div className='context-menu' key={item.id}>
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
    )

    render() {
        const { classes, theme,
             sharedList = [], privateList = [], noteList = [],
             user_id = 0,
             createFolder, sharedFolder,unsharedFolder, deleteFolder, updateFolder,
             createNote, updateNote, deleteNote } = this.props;
        
        return (
            <div className={classes.root}>
                     <OneInputModal 
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
                                            key={this.state.modal_id}
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
                                key={item.folder_id}
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
                                key={item.folder_id}
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
            </div>
        );
    }
}

Directory.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Directory);
