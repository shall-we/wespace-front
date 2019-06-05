import React from "react";
import styles from "./Context.scss";
import classNames from "classnames/bind";
import logo from "image/welcome.png";
import Collapsible from "./component/Collapsible";
import Button from "components/common/Button";

const cx = classNames.bind(styles);

class Context extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewClicked: true,
    }
  }

  handleCreate = (data) => {
    const { notification } = this.state;
    this.setState({
      notification: notification.concat({ id: this.id++, ...data })
    });
  }

  handleClick = (index) => {
    console.log('[Context.js] handleClick: ', index);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.announcementList !== prevState.announcementList) {
      return { announcementList: nextProps.announcementList };
    }
    return null;
  }

  render() {
    const { announcementList = [], onModify, onDelete } = this.props;

    return (
      <div className={cx('cx-wrapper')}>
        <div className={cx('cx-title')}>
          <img className={cx('logo')} src={logo} alt='logo'/><br />
          <div>
              현재 등재된 공지사항 목록입니다.&nbsp;&nbsp;&nbsp;
              <Button key='btn-add-notice' theme='outline' onCreate="true" onClick={this.props.onWrite}>
                공지사항 추가하기
              </Button>
          </div>
        </div>

        <div>
          <ul>
            {announcementList.map((item, index) => {
              return (
                <Collapsible key={item.id} transitionTime={200} trigger={item.title} triggerWhenOpen={this.handleClick(item.id)} onOpen={(e) => console.log(index)}>
                <div className={cx('right')}>
                  <Button key='btn-update' theme='outline' onClick={() => onModify(item.id, item.title, item.content)}>수정</Button>
                  <Button key='btn-delete' theme='outline' onClick={() => onDelete(item.id)}>삭제</Button>
                </div>
                <div><p>{item.content.split('\n').map(line => { return (<span key={item.id}>{line}<br /></span>) })}</p></div>
                </Collapsible>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Context;
