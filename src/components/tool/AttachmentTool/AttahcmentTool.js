import React from 'react';
import AttachmentList from './AttachmentList/index';
import style from './AttachmentTool.scss';
import classNames from 'classnames';
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
    };

    // drag를 끝낼경우, 파일내용 보여주는 browser 기능 제지.
    fileDragOverHandler=(e)=>{
        e.stopPropagation();
        e.preventDefault();
    };


    //drag 후, file를 놓을때, 파일 리스트에 추가.
    fileDropHandler=(e)=>{
        //부모 태그로의 이벤트 전파를 저지함.
        e.stopPropagation();
        //지정한 행위외의 별도의 행위를 저지함.
        e.preventDefault();

        console.log(e.dataTransfer.files);

        let file=e.dataTransfer.files[0];

        this.addAttachment(file);
    };



    fileOpenHandler=(e)=>{
        console.log('fileOpen');
        e.stopPropagation();
        e.preventDefault();
        let fileTag = document.createElement("input");
        fileTag.setAttribute("type", "file");
        fileTag.onchange=(e)=>{
            console.log('change : '+ e.target.files[0]);
            let {files} = e.target;
            if(files[0]){
                this.addAttachment(files[0]);
            }
        };

        fileTag.click();
    }

    addAttachment = (data)=>{
        let formData = new FormData();
        formData.append("attachment", data);

        this.props.addAttachment(formData);
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
        const {fileDropHandler,fileDragOverHandler, fileOpenHandler} = this;

        return (
            <div className={cx('attach-Template')} >
                <div className={cx("attach-content")}>
                    <AttachmentList
                        data={data}
                        attachment={attachment}
                        deleteAttachment={deleteAttachment}
                        downloadAttachment={downloadAttachment}/>
                </div>
                <div className={cx("selectFile")}
                     onDrop={fileDropHandler}
                     onDragOver={fileDragOverHandler}
                     onClick={fileOpenHandler}>
                    <label>Drag files here or Browser</label>
                </div>
            </div>
        );
    }
}

export default AttachmentTool;