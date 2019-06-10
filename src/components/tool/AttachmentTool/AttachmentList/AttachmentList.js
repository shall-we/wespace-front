import React, { Fragment } from 'react';
import * as mime from 'react-native-mime-types';
import style from './AttachmentList.scss';
import classNames from 'classnames';
const cx=classNames.bind(style);

//image directory load
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../../../image/Attachment', false, /\.(png|jpe?g|svg)$/));

class AttachmentItem extends React.Component { 

    fileDownload=async(e)=>{
        e.preventDefault();

        const {downloadAttachment , data} = this.props;
        
        //console.log('url : '+data.url);
        await downloadAttachment(data.url);

        let {attachment} = this.props;
        
        console.log('after actions',attachment);
        if(attachment.result==='success'){
            //attachment(content of file) to Blob(File)
            let file = new Buffer(attachment.data, 'base64');  
            console.log('file :'+file);
            console.log('mimeType', mime.contentType(data.type));
            const url = window.URL.createObjectURL(new Blob([file]), {type : mime.contentType(data.type)});
            console.log('url'+url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data.title}.${data.type}`);
            link.click();
            window.URL.revokeObjectURL(url);
        }else{
            alert(attachment.failType);
        }
    };

    onItemDelete=(e)=>{
        const {id} = this.props.data;
        const {onDelete} = this.props;
        onDelete(id);
    }

    
    render() {

    const { id ,title, type } =this.props.data;

        console.log('type : '+ type);

    return (
        <div className={cx("fileItem")} key={id} >
            <img className={cx("ItemDelete")} src={images['close.svg']} data-src={images['close.svg']} onClick={this.onItemDelete} alt=""/>
            <div  className={cx("fileImage")}onClick={this.fileDownload}>
                <img className={cx("img")}src={images[type+'.svg']} data-src={images[type+'.svg']} alt="" />
                <label className={cx("label")}>{title}</label>
            </div>
        </div>
    );
}
}

//////////////////////////    Attachment List    //////////////////////////////////////////

function AttachmentList(props) {

    const {data, attachment, deleteAttachment, downloadAttachment} =props;

    let dataList=[];

    if(data){

    for(var i=0; i<data.length; i++){
        if(i===data.length-1 && data.length%2===1){
            dataList.push(
            <AttachmentItem style="align-items : flex-start" key={i} data={data[i]} attachment={attachment}
            onDelete={deleteAttachment} downloadAttachment={downloadAttachment}/>
            );
        }else{

        dataList.push(
            <AttachmentItem key={i} data={data[i]} attachment={attachment}
            onDelete={deleteAttachment} downloadAttachment={downloadAttachment}/>
            );
        }
    }

}
    
    return (
        <div className={cx('attachment')}>
            <div className={cx("list")}>
                {dataList}
            </div>
        </div>
    );
};

export default AttachmentList;
