import React, { Component } from 'react';
import styles from './Context.scss';
import classNames from 'classnames/bind';
import NoteDialog from './NoticeDialog/NoteDialog';
import CheckboxList from './checkboxList/index';
import IamgeList from './imageList/index';
const cx = classNames.bind(styles);

class Context extends Component {

  state={
    folder_notice:this.props.folderNotice,
    note_notice:this.props.noteNotice,
    chat_notice :this.props.chatNotice,
  }
  componentWillReceiveProps(nextProps, nextContext) {

    if(this.props.folderNotice!==nextProps.folderNotice||this.props.noteNotice!==nextProps.noteNotice
    || this.props.chatNotice!==nextProps.chatNotice){
      this.setState({folder_notice:nextProps.folderNotice,note_notice:nextProps.noteNotice, chat_notice :nextProps.chatNotice})
    }

  }


  render() {
    return (
      <div className={cx('context')}>
        <div className={cx('system')}>
          <div className={cx('text')}>최근 공지 사항</div>
          <NoteDialog List={this.props.announcementList} />
        </div>
        <div className={cx('notice')} >
          <div className={cx('directory')} >
            <div className={cx('comment')}>
              <IamgeList category='알림' rows={this.state.chat_notice}/>
            </div>
            <div className={cx('folder')}>
              <CheckboxList category='폴더' type='FOLDER' rows={this.state.folder_notice} deleteRows={this.props.deleteNotice}/>
            </div>
            <div className={cx('note')}>
              <CheckboxList category='노트' type='NOTE' rows={this.state.note_notice} deleteRows={this.props.deleteNotice}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Context;