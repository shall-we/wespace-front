import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Administration from "components/admin/Administration";
import Context from "components/admin/Context";
import NoticeForm from "components/admin/NoticeForm";
import ManageEmployees from "components/admin/ManageEmployees";
import * as adminActions from "store/modules/admin";
import * as userActions from "store/modules/user";

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoticeOpened: false,
      isNoticeWritable: false,
      isManageEmployees: false,

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
        // noteCount: nextProps.noteCount
      };
    }
    return null;
  }

  handleContextOpen = (isNoticeOpened) => {
    this.setState({
      isNoticeOpened: isNoticeOpened,
      isNoticeWritable: false,
      isManageEmployees: false,
      onModify: false
    });
  }
  
  handleWriteNotice = (isNoticeWritable) => {
    this.setState({
      isNoticeOpened: false,
      isNoticeWritable: isNoticeWritable,
      isManageEmployees: false,
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
      isManageEmployees: false,
      id: id,
      title: title,
      content: content,
    });
  }

  handleUpdate = (id, title, content) => {
    this.props.AdminActions.updateAnnouncement(id, title, content);
    this.props.AdminActions.getAnnouncementList();
    this.handleContextOpen(true);
  }

  handleDeleteAnnouncement = (id) => {
    this.props.AdminActions.deleteAnnouncement(id);
    this.props.AdminActions.getAnnouncementList();
    this.handleContextOpen(true);
  }

  handleManageEmployees = (isManageEmployees) => {
    this.props.UserActions.getAllUserList();
    // this.props.AdminActions.getNoteCount();
    this.setState({
      isNoticeOpened: false,
      isNoticeWritable: false,
      isManageEmployees: isManageEmployees,
    });
  }

  handleDeleteUser = (id) => {
    this.props.UserActions.deleteUser(id);
    this.props.UserActions.getAllUserList();
  }

  handleCreateAnnouncement = (title, content) => {
    this.props.AdminActions.createAnnouncement(title, content);
    this.props.AdminActions.getAnnouncementList();
    this.handleContextOpen(true);
  }

  handleChangeTitle = (e) => { this.setState({ title: e.target.value }) }
  handleChangeContent = (e) => { this.setState({ content: e.target.value }) }

  render() {
    const { title, content } = this.state;
    console.log('admincontainer: ', this.state.userList);
    return (
      <div style={{ display: "flex" }}>
        <Administration noticeOpen={this.handleContextOpen} visible={this.handleManageEmployees} />

        {this.state.isNoticeOpened ?
         (<Context announcementList={this.state.announcementList} onWrite={this.handleWriteNotice} onModify={this.handleModifyNotice} onDelete={this.handleDeleteAnnouncement} />) : null}
        
        {this.state.isNoticeWritable ?
          (<NoticeForm title={title} content={content} onConfirm={this.handleCreateAnnouncement} onCancel={this.handleContextOpen} changeTitle={this.handleChangeTitle} changeContext={this.handleChangeContent} onModify={this.state.onModify} id={this.state.id} onUpdate={this.handleUpdate} />) : null
        }
        
        {this.state.isManageEmployees ?
         (<ManageEmployees userList={this.state.userList} onDelete={this.handleDeleteUser} />) : null}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    announcementList: state.admin.get("announcement_list"),
    userList: state.user.get("all_user_list"),
    // noteCount: state.admin.get("note_count")
  }),
  (dispatch) => ({
    AdminActions: bindActionCreators(adminActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(withRouter(AdminContainer));
