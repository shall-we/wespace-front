import React from 'react';
import classNames from 'classnames';
import { Link } from "react-router-dom";
import style from './checkboxList.scss';
const cx=classNames.bind(style);

class checkboxList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            rows : this.props.rows,
            clickedList : [],
            isChecked : false,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.rows!==nextProps.rows){
            this.setState({rows : nextProps.rows, isChecked : false});
            let allCheckbox=document.getElementsByName(this.props.category+'_checkbox');
            for(let i=0; i<allCheckbox.length;i++){
                allCheckbox[i].checked=false;
            }
        }
    }

    onSelectAllItem=(e)=>{
        const {checked} =e.target;

            let allCheckbox=document.getElementsByName(this.props.category+'_checkbox');
            let ValueArray =[];
            for(let i=0; i<allCheckbox.length;i++){
              //  console.log(i, allCheckbox[i]);
                allCheckbox[i].checked =checked;
                if(allCheckbox[i].value !=="")
                ValueArray.push(allCheckbox[i].value);
            }

            console.log('valueArray', ValueArray);

        if(checked) {
           // console.log(document.getElementsByName('checkbox'));
            this.setState({clickedList : ValueArray, isChecked : true});
        }else{
            this.setState({clickedList : [], isChecked: false});
        }
    };

    onSelectItem=(e)=>{
        console.log(e.target);
        const {checked, value} =e.target;

        if(checked){
            this.setState({clickedList : this.state.clickedList.concat(value), isChecked:true});
        }else{
            let array =this.state.clickedList;
            console.log('before ',array);
            let index = array.indexOf(value);
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({clicekdList: array, isChecked:false});
            }

            console.log('after ', array);
        }
    };

    getChlickboxListItem=(data)=>{
        let labelCss =  (data.header)? cx("checkboxList_label", "head_label") : cx("checkboxList_label");
        let link = '/note/'+data.content;
        let onChangeHandle=(data.header)? this.onSelectAllItem:this.onSelectItem;
        return (
            <div className={cx("checkboxListItem")}>
                <div className={cx("checkboxListItem_checkbox")}>
                    <input name={this.props.category+'_checkbox'} type="checkbox" value={data.notice_id} onChange={onChangeHandle}/>
                </div>

                <div className={cx("checkboxList_info")}>
                    <div className={labelCss}>
                        {(this.props.category==="노트")?(
                        <Link to={link}>
                            <label htmlFor="object">{data.object}</label>
                        </Link>):
                            <label htmlFor="object">{data.object}</label>
                            }
                    </div>
                    <div className={labelCss}>
                    <label  htmlFor="from">{data.from}</label>
                    </div>
                    <div className={labelCss}>
                    <label  htmlFor="message">{data.message}</label>
                    </div>
                    <div className={labelCss}>
                    <label htmlFor="reg_date">{data.reg_date}</label>
                    </div>
                </div>
            </div>
        );
    };

    onDeleteCheckboxListItem=(e)=>{
        const {type, deleteRows}=this.props;
        console.log(this.state.clickedList);
        console.log(this.props.type);
        this.state.clickedList.map((object, idx)=>{
           deleteRows(type, object);
        });
    };

    render(){

        const header = this.getChlickboxListItem(
            {header : true, object :'대상', from :'보낸 분', message : '메세지', reg_date:'시간'});

        const children=this.state.rows.map((data, idx)=>{
           return this.getChlickboxListItem(data);
        });


        let visible =(this.state.isChecked)? cx('checkboxList_delete'): cx('checkboxList_delete', 'non_visible');

      return (
          <div className={cx("checkboxList")}>
              <div className={cx("checkboxListTitle")}>
                  <label htmlFor='checkboxListTitle'>{this.props.category}</label>
                  <input className={visible} type="button" value="delete" onClick={this.onDeleteCheckboxListItem}/>
              </div>
              <div className={cx('checkboxListHeader')}>
              {header}
              </div>
              <div className={cx("checkboxListContent")}>
                  {children}
              </div>
          </div>
      );
    }
}

export default checkboxList;

