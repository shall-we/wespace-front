import React from 'react';
import UploadModal from '../../modal/UploadModal/index';
import AttachmentList from './AttachmentList/index';
import style from './AttachmentTool.scss';
import classNames from 'classnames';
const cx=classNames.bind(style);

class AttachmentTool extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isShow : false,
        }
    }

    handleShow=(e)=>{
      console.log('handleShow');
        this.setState({
            isShow :!this.state.isShow
        });
    }

    render(){

        const {data, attachment, addAttachment, deleteAttachment, downloadAttachment} = this.props;
        
        return (
            <div className={cx('attach-Template')} >
                <AttachmentList handleShow={this.handleShow} 
                data={data}
                attachment={attachment}
                deleteAttachment={deleteAttachment}
                downloadAttachment={downloadAttachment}/>
                <UploadModal 
                    show={this.state.isShow} 
                    handleShow={this.handleShow}
                    addAttachment = {addAttachment}       
                    />
            </div>
            );
    }
}

export default AttachmentTool;