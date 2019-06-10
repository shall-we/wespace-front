import React from 'react';
import style from './uploadItem.scss';
import classNames from 'classnames';
import closeImg from '../../../../image/Attachment/close.svg';

const cx = classNames.bind(style);

class uploadItem extends React.Component {


    getFileInfo=(file)=>{

        let fileType = file.name.split('.');
        fileType = fileType[fileType.length - 1];

        return{
            name: file.name.substring(0, file.name.length - fileType.length - 1),
            type: fileType.toUpperCase(),
            size: file.size,
        };
    }

    getImage=(name)=>{
        if(name === "css"|| name==="mp3" || name==="pdf" || name==="psd" || name==="docx") return "blue";

        if(name === "csv"|| name==="xlsx" ) return "green";

        if(name === "html"|| name==="zip" || name==="svg" || name==="gif") return "yellow";

        if(name === "mov"|| name==="png" || name==="ppt" || name==="txt") return "red";
    };

    render(){

    const {key, data, onDelete} =this.props;

    const fileInfo=this.getFileInfo(data);
    const {name, type} = fileInfo;
    const color= 'fileType-'+this.getImage(type.toLowerCase());
    
    return (
        <div className={cx("fileType")} key ={key}>
                <input type="text" value={type} className={cx(color)} readOnly />
                <div className={cx("uploadItemInfo")}>
                    <label htmlFor="filename" >{name}</label>
                    {/* <progress value="60" max="100" /> */}
                </div>
                <img src={closeImg} className={cx("deleteItem")} htmlFor="X" onClick={onDelete} alt="close"/>
            </div>
    );
}




}
export default uploadItem;

