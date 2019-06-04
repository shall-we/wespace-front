import React from 'react';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; 
import styles from './Editor.scss';

import ReconnectingWebSocket from 'reconnectingwebsocket';
const ShareDB = require('sharedb/lib/client');

ShareDB.types.register(require('rich-text').type);

const shareDBSocket = new ReconnectingWebSocket(((window.location.protocol === 'https:') ? 'wss' : 'ws') + '://' + window.location.hostname + ':4000/sharedb');
const shareDBConnection = new ShareDB.Connection(shareDBSocket);




//--------------------------------------------------------------------------------------------------------------------------------------
const cx = classNames.bind(styles);
 
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.reactQuillRef=null;

  }
  componentDidMount(){
    const doc = shareDBConnection.get('documents', this.props.note);
    const quillRef=this.reactQuillRef.getEditor();



    doc.subscribe(function(err) {
      if (err) throw err;
      if (!doc.type)
        doc.create([{
          insert: '\n'
        }], 'rich-text');
    
      quillRef.setContents(doc.data);
    
      // local -> server
      quillRef.on('text-change', function(delta, oldDelta, source) {
        if (source === 'user') {

          doc.submitOp(delta, {
            source: quillRef
          }, function(err) {
            if (err)
              console.error('Submit OP returned an error:', err);
          });
        }
      });
    
    
      // server -> local
      doc.on('op', function(op, source) {
        if (source !== quillRef) {
          quillRef.updateContents(op);
        }
      });
    
   
      
    });
    


 
    
  }

  

  render() {

    return (
      <div className={cx('editor-public')}>
        <ReactQuill 
        ref={(el) => { this.reactQuillRef = el }}
        theme='bubble'
        readOnly
        bounds= '.editor-public'
        />
      </div>
    );
  }
}


 
export default Editor;