import React from "react";
import styles from './ManagingFolder.scss';
import classNames from 'classnames/bind';
import logo from 'image/employees.png';
import FolderTables from 'components/admin/FolderTables';

const cx = classNames.bind(styles);

class ManageEmployees extends React.Component {
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
    const { folderList = [], onDelete } = this.props;

    return (
      <div className={cx('cx-wrapper')}>
        <div className={cx('cx-title')}>
          <img className={cx('logo')} src={logo} alt='logo'/><br />
          <div><p>현재 WESPACE에 존재하는 폴더 목록입니다.&nbsp;&nbsp;&nbsp;</p></div>
        </div>
        <div>
          <FolderTables onDelete={onDelete} folderList={folderList} />
        </div>
      </div>
    );
  }
}

export default ManageEmployees;
