import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "store/modules/admin";
import { withRouter } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpenText, faUserEdit, faFolderOpen, faClone } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelopeOpenText);
library.add(faUserEdit);
library.add(faFolderOpen);
library.add(faClone);

const drawerWidth = 250;

const styles = {
  root: {
      display: 'flex',
      color: 'white',
      background: 'black'
  },
  drawer: {
      width: drawerWidth,
      height: 'calc(100vh - 4rem)',
      flexShrink: 0,
  },
  paper: {
      position : "unset",
      background: "#000000"
  },
  nav: {
      padding: '1rem',
      borderBottom: '3px groove white',
  },
  list: {
      overflowX: "hidden",
      overflowY: "auto",
      borderBottom: '1px solid white',
  },
  lit: {
      fontSize: '1.2rem',
      textAlign: 'center'
  }
};

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: true,
        manageEmployeesOpen: true,
    };
  }

  handleManagingNotice = () => {
    this.setState({ visible: true });
    this.props.AdminActions.getAnnouncementList();
    this.props.onNotice(this.state.visible);
  };

  handleManagingEmployees = () => {
    this.setState({ visible: true });
    this.props.onEmployees(this.state.visible);
  };

  handleManageFolder = () => {
    this.setState({ visible: true });
    this.props.onFolder(this.state.visible);
  }

  handleManageNote = () => {
    this.setState({ visible: true });
    this.props.onNote(this.state.visible);
  }

  render() {
    const { classes } = this.props;
      
    return (
      <div className={classes.root}>
        <Drawer variant="permanent"
                className={classNames(classes.drawer)}
                classes={{paper: classNames(classes.paper)}}>
          <List className={classes.nav}>
            <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: "#FFF" }}>관리자 카테고리</Typography>
          </List>
          {/* 공지사항 관리 */}
          <List className={classes.list}>
            <ListItem button onClick={(e) => this.handleManagingNotice()}>
              <ListItemIcon>
                <FontAwesomeIcon icon="envelope-open-text" size="2x" color="#fff" />
              </ListItemIcon>
              <ListItemText className={classes.lit} disableTypography primary={"공지사항 관리"} style={{ color: "#FFF" }} />
            </ListItem>
          </List>
          {/* 직원 현황 관리 */}
          <List className={classes.list}>
            <ListItem className={classes.item} button onClick={(e) => this.handleManagingEmployees()}>
              <ListItemIcon>
                <FontAwesomeIcon icon="user-edit" size="2x" color="#fff" />
              </ListItemIcon>
              <ListItemText className={classes.lit} disableTypography primary={"직원현황 관리"} style={{ color: "#FFF" }} />
            </ListItem>
          </List>
          {/* 폴더 현황 관리 */}
          <List className={classes.list}>
            <ListItem className={classes.item} button onClick={(e) => this.handleManageFolder()}>
              <ListItemIcon>
                <FontAwesomeIcon icon="folder-open" size="2x" color="#fff" />
              </ListItemIcon>
              <ListItemText className={classes.lit} disableTypography primary={"폴더현황 관리"} style={{ color: "#FFF" }} />
            </ListItem>
          </List>
          {/* 파일 현황 관리 */}
          <List className={classes.list}>
            <ListItem className={classes.item} button onClick={(e) => this.handleManageNote()}>
              <ListItemIcon>
                <FontAwesomeIcon icon="clone" size="2x" color="#fff" />
              </ListItemIcon>
              <ListItemText className={classes.lit} disableTypography primary={"노트현황 관리"} style={{ color: "#FFF" }} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

Administration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
  (state) => ({
    announcementList: state.admin.get("announcement_list")
  }),
  (dispatch) => ({
    AdminActions: bindActionCreators(adminActions, dispatch)
  })
)(withRouter(Administration)));
