import React from 'react';
import styles from './NoteToolTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
const NoteToolTemplate = (props) => {
  console.log('NoteToolTemplate : ',props);

  return(
  <div className={cx('note-tool-template')} style={{width : props.width}} >
        {props.children}
  </div>
)};

export default NoteToolTemplate;