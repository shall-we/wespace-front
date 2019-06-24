import React from 'react';
import classNames from 'classnames';
import style from './imageList.scss';
import { Link } from "react-router-dom";
const cx = classNames.bind(style);

// const imageListItem=(props)=>{
//     console.log('imageListItem');
//     console.log(props.data);
//     let link = '/note/'+props.data.content;
//     return (
//
//         <div className={cx("imageListItem")}>
//             <div className={cx("imageListItem_profile")}>
//                 <img src="/static/media/default_profile.002f04d.png"/>
//             </div>
//
//             <div className={cx("imageListItem_info")}>
//                 <div className={cx("imageListItem_header")}>
//                 <label className={cx("imageListItem_from")} htmlFor="imageListItem_from">[{props.data.object}] {props.data.from}</label>
//                     <label className={cx("imageListItem_reg_date")} htmlFor="imageListItem_reg_date">{props.data.reg_date}</label>
//                     </Link>
//                 </div>
//                 <label className={cx("imageListItem_message")} htmlFor="imageListItem_message">{props.data.message}</label>
//             </div>
//
//         </div>
//
//     )
// }

class imageList extends React.Component{

    onEnterNoteContent=async (idx, note_content, note_id, note_lock )=>{

        const {deleteRows, type,handeleGetNoticlist} = this.props;
        //제거
        await deleteRows(type, idx);
        await handeleGetNoticlist({note_content, note_id, note_lock});
    };

    render()
    {

        //console.log(props.rows);
        console.log('imageList', this.props);

        const children = this.props.rows.map((data, idx) => {
            console.log('data', data);
            return (
                <Link to={'/note/'+data.content} onClick={(e)=>{this.onEnterNoteContent(data.notice_id,data.content,data.note_id, data.lock)}}>
                    <div className={cx("imageListItem")} >
                        <div className={cx("imageListItem_profile")}>
                            <img src={data.profile}/>
                        </div>
                        <div className={cx("imageListItem_info")}>
                            <div className={cx("imageListItem_header")}>
                                <label className={cx("imageListItem_reg_date")} htmlFor="imageListItem_reg_date">{data.reg_date}</label>
                                <label className={cx("imageListItem_from")} htmlFor="imageListItem_from">[{data.object}] {data.from}</label>
                            </div>
                            <label className={cx("imageListItem_message")} htmlFor="imageListItem_message">{data.message}</label>
                        </div>
                    </div>
                </Link>
            );
        });

        return (
            <div className={cx("imageList")}>
                <div className={cx("imageListTile")}>
                    <label htmlFor="iamgeListTile">{this.props.category}</label>
                </div>
                <div className={cx("imageListContent")}>
                    {children}
                </div>
            </div>)
    }
}

export default imageList;