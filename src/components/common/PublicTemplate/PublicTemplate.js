import React from 'react';
import styles from './PublicTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
const PublicTemplate = ({children}) => (
  <div className={cx('public-template')}>
    <main>
      {children}
    </main>
    
  </div>
);

export default PublicTemplate;