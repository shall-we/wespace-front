import React from 'react';
import UploadModal from '../../modal/UploadModal/index';
import AttachmentList from './AttachmentList/index';
import style from './AttachmentTool.scss';
import classNames from 'classnames';
import uploadImg from '../../../image/Attachment/upload.svg';
const cx=classNames.bind(style);

class AttachmentTool extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isClickUploadButton : false,
        }
    }

    handleShow=(e)=>{
      console.log('handleShow');
      console.log(this.state.isClickUploadButton);
        this.setState({
            isClickUploadButton :!this.state.isClickUploadButton
        });
    }

    componentWillMount(){
        console.log(this.props.data);
        if(this.props.data.length<1){
            this.setState({isClickUploadButton : true});
        }else{
            console.log(this.props.data);
            this.setState({isClickUploadButton : false});
        }
    }

    render(){

        const {data, attachment, addAttachment, deleteAttachment, downloadAttachment} = this.props;
        
        return (
            <div className={cx('attach-Template')} >
                <div className={cx("upload-img")}>
                <img src={uploadImg} alt="" onClick={this.handleShow} />
                </div>
                {(!this.state.isClickUploadButton)? (
                <AttachmentList
                data={data}
                attachment={attachment}
                deleteAttachment={deleteAttachment}
                downloadAttachment={downloadAttachment}/>):(
                <UploadModal 
                    handleShow={this.handleShow}
                    addAttachment = {addAttachment}       
                    />)}
            </div>
            );
    }
}

export default AttachmentTool;