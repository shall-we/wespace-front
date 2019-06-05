import React from "react";
import formStyles from "./NoticeForm.scss";
import classNames from "classnames/bind";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "../../common/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faFeatherAlt);

const cx = classNames.bind(formStyles);
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: "40rem",
    fontWeight: "bold"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  notchedOutline: {
    borderColor: "#1C90FB !important"
  },
  placeholderText: {
    fontWeight: "bold"
  },
  size: {
    width: "38rem"
  }
});

class NoticeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoticeWritable: true,
      title: '',
      content: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return { id: nextProps.id, title: nextProps.title, content: nextProps.content };
    }
    return null;
  }

  handleWriteNotice = () => {
    this.props.onConfirm(this.state.title, this.state.content);
  }

  handleModifyNotice = () => {
    this.props.onUpdate(this.props.id, this.state.title, this.state.content);
  }

  render() {
    const { onCancel, classes, changeTitle, changeContext, onModify } = this.props;
    const { title, content } = this.state;

    return (
      <div className={cx("nf-wrapper")}>
        <div className={cx("title")}>
        {
          onModify ? [
              <div className={cx("title")}>
              <FontAwesomeIcon icon="feather-alt" size="1x" color="#1C90FB" />
              &nbsp;&nbsp;공지사항 수정
              <div><p>공지하고자 하는 제목과 내용을 기입 후 하단의 작성 버튼을 클릭하세요.</p></div>
            </div>
          ] : [
            <div className={cx("title")}>
              <FontAwesomeIcon icon="feather-alt" size="1x" color="#1C90FB" />
              &nbsp;&nbsp;공지사항 입력
              <div><p>공지하고자 하는 제목과 내용을 기입 후 하단의 작성 버튼을 클릭하세요.</p></div>
            </div>
          ]
        }

        <div className={cx("form")}>
          <form noValidate autoComplete="off">
            <TextField className={classes.textField} rows="1" id="outlined-multiline-static" multiline
            margin="normal" variant="outlined" placeholder="제목을 입력하세요." name="title"
            value={title} onChange={changeTitle} />
            <TextField InputProps={{ classes: { input: classes.size } }} rows="10" id="outlined-multiline-static" multiline
            margin="normal" variant="outlined" placeholder="내용을 입력하세요." name="content"
            value={content} onChange={changeContext} />
          </form>
        </div>

        <div className={cx("btn")}>
          <Button key="notice-cancel" theme="outline" to="/admin" onClick={onCancel}>
            취소
          </Button>
          { onModify ? [<Button key="notice-confirm" theme="outline" onClick={this.handleModifyNotice}>수정</Button>] : [<Button key="notice-confirm" theme="outline" onClick={this.handleWriteNotice}>작성</Button>] }
        </div>
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(NoticeForm);
