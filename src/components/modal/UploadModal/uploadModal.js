import React from 'react';
import styles from './uploadModal.scss';
import UploadItem from './uploadItem/index';
import closeImg from 'image/Attachment/close.svg';
import classNames from 'classnames';
const cx = classNames.bind(styles);

    /** 
     * fileList={
     * 
     * name : ,
     * type : ,
     * file : ,
     * color : blue | red | yellow | green, 
     * }
     * 
     * */ 

class UploadModal extends React.Component{

    constructor(props){
        super(props);
        this.state={
            fileList:[]
        }
    }
    
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

        this.addFileList(file);
    };

    

    fileOpenHandler=(e)=>{

        let fileTag = document.createElement("input");
        fileTag.setAttribute("type", "file");
        fileTag.onchange=(e)=>{
            console.log('change : '+ e.target.files[0]);
            let file =e.target.files[0];
            this.addFileList(file);
        };

        fileTag.click();
    }

    addFileList = (file) => {
        
        var maxSize = 5 * 1024 * 1024;//5MB
    
        if(maxSize< file.size){
            alert('업로드 가능한 최대사이즈는 5MB입니다.');
            return;
        }
    
        this.setState({
            fileList :[...this.state.fileList, file]
        });

         console.log(this.state.fileList);
    };

    handleOnClick = async(e)=>{
        let formData = new FormData();
        
        const fileList = this.state.fileList;
        
        this.setState({
            fileList : []
        });

        this.props.handleShow();

        //fileList -> formData,
        for(let i = 0; i<fileList.length; ++i){
            console.log('data', fileList[i]);
            formData.append("data"+i, fileList[i]);

        }

        this.props.addAttachment(formData);
    }

    onItemDelete = (key)=>{
        console.log('onItemDelete');
        const list=this.state.fileList;
        console.log(key);
        list.splice(key, 1);
        this.setState({
            fileList : list,
        })
    } 

    render() { 

    if(!this.props.show) return (<null/>); 

    const {fileDropHandler,fileDragOverHandler, fileOpenHandler} = this;


    return (<div className={cx("uploadModal", "modal_"+this.props.show) } >
    <div className={cx("dialog")}>
        <img className={cx("closeModal")} src={closeImg} data-src={closeImg} alt="" onClick={this.props.handleShow}/>
           
            {/* <label id="submitFile">Upload</label> */}
            
            <div className={cx("selectFile")}
            onDrop={fileDropHandler}
            onDragOver={fileDragOverHandler}
            onClick={fileOpenHandler}
             >
                <label>Drag files here or Browser</label>
            </div>

            {
                this.state.fileList.map((data, index)=>{

                    return(<div className={cx("uploadItem")}><UploadItem key={index} data={data} onDelete={(e)=>{this.onItemDelete(index)}}/> </div>)

                })
                            
            }
        
        <input type="button"  value="Upload" 
        className={(this.state.fileList.length<1)?cx("button_nolist","uploadButton"):cx("uploadButton")}
        onClick={this.handleOnClick}
        />
        </div>
        </div>
  )
}
}

export default UploadModal;
