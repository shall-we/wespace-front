import React from 'react';
import styles from './NoteTemplate.scss';
import classNames from 'classnames/bind';

import HeaderContainer from '../../../containers/common/HeaderContainer'

const cx = classNames.bind(styles);
 
const NoteTemplate = ({children}) => (
  <div className={cx('note-template')}>
    <HeaderContainer/>
    <main>
      {children}
    </main>
  </div>
);

export default NoteTemplate;