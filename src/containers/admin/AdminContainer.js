import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Administration from "components/admin/Administration";
import Context from "components/admin/Context";
import NoticeForm from "components/admin/NoticeForm";
import ManageEmployees from "components/admin/ManageEmployees";
import ManagingFolder from "components/admin/ManagingFolder";
import * as adminActions from "store/modules/admin";
import * as userActions from "store/modules/user";
import * as directoryActions from "store/modules/directory";

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoticeOpened: false,
      isNoticeWritable: false,
      isManagingEmployees: false,
      isManagingFolder: false,

      announcementList: [],
      userList: [],
      noteCount: [],
      onModify: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        announcementList: nextProps.announcementList,
        userList: nextProps.userList,
        folderList: nextProps.folderList,
        // noteCount: nextProps.noteCount
      };
    }
    return null;
  }

  handleOnNotice = (isNoticeOpened) => {
    this.setState({
      isNoticeOpened: isNoticeOpened,
      isNoticeWritable: false,
      isManagingEmployees: false,
      onModify: false,
      isManagingFolder: false,
    });
  }

  handleOnEmployees = (isManagingEmployees) => {
    this.props.UserActions.getAllUserList();
    this.setState({
      isNoticeOpened: false,
      isNoticeWritable: false,
      isManagingEmployees: isManagingEmployees,
      isManagingFolder: false,
    });
  }

  handleOnFolder = (isManagingFolder) => {
    this.props.AdminActions.getAllFolderList();
    console.log("=======================");
    this.setState({
      isNoticeOpened: false,
      isNoticeWritable: false,
      isManagingEmployees: false,
      isManagingFolder: isManagingFolder,
    });
  }
  
  handleWriteNotice = (isNoticeWritable) => {
    this.setState({
      isNoticeOpened: false,
      isNoticeWritable: isNoticeWritable,
      isManagingEmployees: false,
      isManagingFolder: false,
      title: '',
      content: ''
    });
  }

  handleModifyNotice = (id, title, content) => {
    this.props.AdminActions.getAnnouncement(id);
    this.setState({
      onModify: true,
      isNoticeOpened: false,
      isNoticeWritable: true,
      isManagingEmployees: false,
      isManagingFolder: false,
      id: id,
      title: title,
      content: content,
    });
  }

  handleUpdate = (id, title, content) => {
    this.props.AdminActions.updateAnnouncement(id, title, content);
    this.props.AdminActions.getAnnouncementList();
    this.handleOnNotice(true);
  }

  handleDeleteAnnouncement = (id) => {
    this.props.AdminActions.deleteAnnouncement(id);
    this.props.AdminActions.getAnnouncementList();
    this.handleOnNotice(true);
  }

  handleDeleteUser = (id) => {
    this.props.UserActions.deleteUser(id);
    this.props.UserActions.getAllUserList();
  }

  handleDeleteFolder = async(folder_id) => {
    console.log('handleDeleteFolder: ', folder_id);
    await this.props.DirectoryActions.deleteFolder(folder_id);
    this.handleOnFolder(true);
  }

  handleCreateAnnouncement = (title, content) => {
    this.props.AdminActions.createAnnouncement(title, content);
    this.props.AdminActions.getAnnouncementList();
    this.handleOnNotice(true);
  }

  handleChangeTitle = (e) => { this.setState({ title: e.target.value }) }
  handleChangeContent = (e) => { this.setState({ content: e.target.value }) }

  render() {
    const { title, content } = this.state;
    console.log('admincontainer: ', this.state.userList);
    return (
      <div style={{ display: "flex" }}>
        <Administration onNotice={this.handleOnNotice} onEmployees={this.handleOnEmployees} onFolder={this.handleOnFolder} />

        {this.state.isNoticeOpened ?
         (<Context announcementList={this.state.announcementList} onWrite={this.handleWriteNotice} onModify={this.handleModifyNotice} onDelete={this.handleDeleteAnnouncement} />) : null}
        
        {this.state.isNoticeWritable ?
          (<NoticeForm title={title} content={content} onConfirm={this.handleCreateAnnouncement} onCancel={this.handleOnNotice} changeTitle={this.handleChangeTitle} changeContext={this.handleChangeContent} onModify={this.state.onModify} id={this.state.id} onUpdate={this.handleUpdate} />) : null
        }
        
        {this.state.isManagingEmployees ?
         (<ManageEmployees userList={this.state.userList} onDelete={this.handleDeleteUser} />) : null}

        {this.state.isManagingFolder ?
         (<ManagingFolder folderList={this.state.folderList} onDelete={this.handleDeleteFolder} />) : null}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    announcementList: state.admin.get("announcement_list"),
    userList: state.user.get("all_user_list"),
    folderList: state.admin.get("all_folder_list"),
    // noteCount: state.admin.get("note_count")
  }),
  (dispatch) => ({
    AdminActions: bindActionCreators(adminActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    DirectoryActions: bindActionCreators(directoryActions, dispatch),
  })
)(withRouter(AdminContainer));
