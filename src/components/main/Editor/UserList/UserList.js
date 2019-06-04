import React from 'react';
import styles from './UserList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const User = (props) => (
    <div className={cx('user')}>
      <img src={ props.imgUrl } 
        alt={ props.alt || 'Image' } />
         
      <div className={cx('user-content')} style={{'border-right':props.content+ ' solid 1rem'}}>
        <h2>{ props.title }</h2>
      </div>
    </div>
  );
  
  const UserContainer = (props) => (
    <div className={cx('users-container')}>
      {
        props.users.map((user) => (
          <User title={ user.title }
            content={ user.content }
            imgUrl={ user.imgUrl } />
        ))
      }
    </div>
  );


  const UserList = (props) => (
    <div className={cx('userlist')}>
    <UserContainer users={ props.users } />
    </div>
  );



export default UserList;