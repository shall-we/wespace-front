import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button';
import logo from '../../../image/logo.png';
import miniLogo from '../../../image/mini-logo.png';

const cx = classNames.bind(styles);
 
const Header = ({name,profile,logout}) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
      {(name) ? 
          ( <Link to='/note'>
            <img className={cx('logo')} src={logo} alt='logo'/>
            {/*<img className={cx('mini-logo')} src={miniLogo} alt='mini-logo'/>*/}
            </Link>
          ) : (
          <Link to='/'>
            <img className={cx('logo')} src={logo} alt='logo'/>
            {/*<img className={cx('mini-logo')} src={miniLogo} alt='mini-logo'/>*/}
            </Link>
          )}
      </div>
      <div className={cx('right')}>
      {
        
          // flex를 유지하려고 배열 형태로 렌더링합니다.
          (name)?( [
            <div key='login' className={cx('login')}><img src={profile} alt='이미지'/>
            <span>{name}</span></div>,<Button key='logout' theme='outline' to='/' onClick={logout}>로그아웃</Button>
          ]):[ <Button key='login' theme='outline' to='/login'>로 그 인</Button>,
          <Button  key='logout' theme='outline' to='/join'>회원가입</Button>]
        }
       
      </div>
    </div>
  </header>
);
 
export default Header;