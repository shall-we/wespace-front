import React from "react";
import styles from './ManagingEmployees.scss';
import classNames from 'classnames/bind';
import logo from 'image/employees.png';
import TablesForUser from 'components/admin/TablesForUser';

const cx = classNames.bind(styles);

class ManagingEmployees extends React.Component {
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
    const { userList = [], onAnnouncementDelete } = this.props;

    return (
      <div className={cx('cx-wrapper')}>
        <div className={cx('cx-title')}>
          <img className={cx('logo')} src={logo} alt='logo'/><br />
          <div><p>WESPACE에 가입되어 있는 직원 목록입니다.&nbsp;&nbsp;&nbsp;</p></div>
        </div>
        <div>
          <TablesForUser onDelete={onAnnouncementDelete} userList={userList} />
        </div>
      </div>
    );
  }
}

export default ManagingEmployees;
