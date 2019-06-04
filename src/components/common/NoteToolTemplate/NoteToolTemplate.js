import React from 'react';
import styles from './NoteToolTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
const NoteToolTemplate = ({children}) => (
  <div className={cx('note-tool-template')}>
    
    
      {children}
    
  </div>
);

export default NoteToolTemplate;