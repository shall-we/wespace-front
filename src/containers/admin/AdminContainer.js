import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Administration from "components/admin/Administration";
import Context from "components/admin/Context";
import NoticeForm from "components/admin/NoticeForm";
import ManagingEmployees from "components/admin/ManagingEmployees";
import ManagingFolder from "components/admin/ManagingFolder";
import ManagingNote from "components/admin/ManagingNote";
import * as adminActions from "store/modules/admin";
import * as userActions from "store/modules/user";
import * as directoryActions from "store/modules/directory";

import socketio from "socket.io-client";
const socket = socketio.connect("http://localhost:4000");

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Switch states
      onAnnouncement: false,
      onAnnouncementForm: false,
      onModify: false,
      onEmployee: false,
      onFolder: false,
      onNote: false,

      announcementList: [],
      userList: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        announcementList: nextProps.announcementList,
        userList: nextProps.userList,
        folderList: nextProps.folderList,
        noteList: nextProps.noteList
      };
    }
    return null;
  }

  handleOnAnnouncement = onAnnouncement => {
    this.setState({
      onAnnouncement: onAnnouncement,
      onAnnouncementForm: false,
      onEmployee: false,
      onFolder: false,
      onNote: false,

      onModify: false,
    });
  };

  handleOnEmployees = onEmployee => {
    this.props.UserActions.getAllUserList();
    this.setState({
      onAnnouncement: false,
      onAnnouncementForm: false,
      onEmployee: onEmployee,
      onFolder: false,
      onNote: false
    });
  };

  handleOnFolder = onFolder => {
    this.props.AdminActions.getAllFolderList();
    this.setState({
      onAnnouncement: false,
      onAnnouncementForm: false,
      onEmployee: false,
      onFolder: onFolder,
      onNote: false
    });
  };

  handleOnNote = onNote => {
    this.props.AdminActions.getAllNoteList();
    this.setState({
      onAnnouncement: false,
      onAnnouncementForm: false,
      onEmployee: false,
      onFolder: false,
      onNote: onNote
    });
  };

  handleWriteAnnouncement = onAnnouncementForm => {
    this.setState({
      onAnnouncement: false,
      onAnnouncementForm: onAnnouncementForm,
      onEmployee: false,
      onFolder: false,
      onNote: false,

      title: "",
      content: ""
    });
  };

  handleModifyAnnouncement = (id, title, content) => {
    this.props.AdminActions.getAnnouncement(id);
    this.setState({
      onModify: true,
      onAnnouncement: false,
      onAnnouncementForm: true,
      onEmployee: false,
      onFolder: false,
      onNote: false,
      
      id: id,
      title: title,
      content: content
    });
  };

  handleUpdate = (id, title, content) => {
    this.props.AdminActions.updateAnnouncement(id, title, content);
    this.props.AdminActions.getAnnouncementList();
    this.handleOnAnnouncement(true);
  };

  handleDeleteAnnouncement = id => {
    this.props.AdminActions.deleteAnnouncement(id);
    this.props.AdminActions.getAnnouncementList();
    this.handleOnAnnouncement(true);
  };

  handleDeleteUser = async(id) => {
    // console.log("[handleDeleteUser] user id is ", id);
    await this.props.UserActions.deleteUser(id);
    this.props.UserActions.getAllUserList();
  };

  handleDeleteFolder = async(folder_id) => {
    // console.log("[handleDeleteFolder] folder_id is ", folder_id);
    await this.props.DirectoryActions.deleteFolder(folder_id);
    socket.emit("updateFolderList", { msg: "deleteFolder" });
  };

  handleDeleteNote = async(note_id) => {
    // console.log("[handleDeleteNote] note_id is ", note_id);
    await this.props.AdminActions.permanentDeleteNote(note_id);
    socket.emit("updateFolderList", { msg: "deleteNote" });
    socket.emit("updateNoteList", { msg: "deleteNote" });
  };

  componentDidMount() {
    console.log('[updateFolderList] -> componentDidMount');
    socket.on("updateFolderList", obj => {
      this.props.AdminActions.getAllFolderList();
    });
    socket.on("updateNoteList", obj => {
      this.props.AdminActions.getAllNoteList();
    });
  }

  handleCreateAnnouncement = (title, content) => {
    this.props.AdminActions.createAnnouncement(title, content);
    this.props.AdminActions.getAnnouncementList();
    this.handleOnAnnouncement(true);
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  render() {
    const { title, content } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <Administration
          onNotice={this.handleOnAnnouncement}
          onEmployees={this.handleOnEmployees}
          onFolder={this.handleOnFolder}
          onNote={this.handleOnNote}
        />

        {this.state.onAnnouncement ? (
          <Context
            announcementList={this.state.announcementList}
            onWrite={this.handleWriteAnnouncement}
            onModify={this.handleModifyAnnouncement}
            onDelete={this.handleDeleteAnnouncement}
          />
        ) : null}

        {this.state.onAnnouncementForm ? (
          <NoticeForm
            key={this.state.id}
            title={title}
            content={content}
            onConfirm={this.handleCreateAnnouncement}
            onCancel={this.handleOnAnnouncement}
            changeTitle={this.handleChangeTitle}
            changeContext={this.handleChangeContent}
            onModify={this.state.onModify}
            id={this.state.id}
            onUpdate={this.handleUpdate}
          />
        ) : null}

        {this.state.onEmployee ? (
          <ManagingEmployees
            userList={this.state.userList}
            onAnnouncementDelete={this.handleDeleteUser}
          />
        ) : null}

        {this.state.onFolder ? (
          <ManagingFolder
            folderList={this.state.folderList}
            onDeleteFolder={this.handleDeleteFolder}
          />
        ) : null}

        {this.state.onNote ? (
          <ManagingNote
            noteList={this.state.noteList}
            onDelete={this.handleDeleteNote}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    announcementList: state.admin.get("announcement_list"),
    userList: state.user.get("all_user_list"),
    folderList: state.admin.get("all_folder_list"),
    noteList: state.admin.get("all_note_list"),
    folder: state.directory.get("folder"),
  }),
  (dispatch) => ({
    AdminActions: bindActionCreators(adminActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    DirectoryActions: bindActionCreators(directoryActions, dispatch),
    // NoticeActions: bindActionCreators(noticeActions, dispatch)
  })
)(withRouter(AdminContainer));
