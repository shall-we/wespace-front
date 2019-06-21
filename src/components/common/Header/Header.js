import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button';
import logo from '../../../image/logo.png';

const cx = classNames.bind(styles);


 
const Header = ({name,profile,logout, chatNoticeCount}) => {


    return (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to={name===null?'/':'/note'}>
        <img className={cx('logo')} src={logo} alt='logo'/>
        </Link>
      </div>
      <div className={cx('right')}>

      {

          // flex를 유지하려고 배열 형태로 렌더링합니다.
          (name)?( [
            <div key='login' className={cx('login')}> <img src={profile} alt='이미지'/>
                <span>{name}</span></div>,<span className={cx('stick')}>|</span>,<Button key='logout' theme='profile' to='/' onClick={logout}>로그아웃</Button>,
              <Link to="/note"><div key='alert' className={cx('notify') + " " + cx('notification') + " " + cx('show-count')} dataCount = {chatNoticeCount}/></Link>
          ]):[ <Button key='login' theme='profile' to='/login'>로 그 인</Button>,<span className={cx('stick')}>|</span>,
          <Button  key='logout' theme='profile' to='/join'>회원가입</Button>]
        }

      </div>
    </div>
  </header>
);}
 
export default Header;