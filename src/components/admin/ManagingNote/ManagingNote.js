import React from "react";
import styles from './ManagingNote.scss';
import classNames from 'classnames/bind';
import logo from 'image/folders-and-notes.png';
import TablesForNote from 'components/admin/TablesForNote';

const cx = classNames.bind(styles);

class ManagingNote extends React.Component {
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

  handleClick = () => {
    console.log('accordionPosition: ');
  }

  render() {
    const { noteList = [], onDelete } = this.props;

    return (
      <div className={cx('cx-wrapper')}>
        <div className={cx('cx-title')}>
          <img className={cx('logo')} src={logo} alt='logo'/><br />
          <div><p>현재 WESPACE에 존재하는 노트 목록입니다.&nbsp;&nbsp;&nbsp;</p></div>
        </div>
        <div>
          <TablesForNote onDelete={onDelete} noteList={noteList} />
        </div>
      </div>
    );
  }
}

export default ManagingNote;
