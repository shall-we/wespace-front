import React from "react";
import styles from "./AskShareModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "../ModalWrapper";
import Button from "../../common/Button";
import IconButton from "@material-ui/core/IconButton";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Members from 'components/common/ChipsArray';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// modules
import * as UserActions from "store/modules/user";
// react-select

import { Add} from "@material-ui/icons";

import Select from 'react-select';

library.add(faUserFriends);
const cx = classNames.bind(styles);

const Switch = (props) => {
    return (
      <div  className={cx('switch')}>
        <label className='label' >
        <input role="switch" type="checkbox" className="input"  onClick={props.handlePermmision} />    
          <span className="text" data-on="관리자" data-off="사용자"></span>
        </label>
      </div>
    );
  };

class AskShareModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              shared: [],
              unshared:[],
              selectedOption: null,
              permission:true
        };
    }

    componentDidMount(){
        const {UserActions}=this.props;
        UserActions.getUserList(this.props.id);
        
    }

    static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.user_list !== nextProps.user_list) {
        let shared = [];
        let unshared = [];
        for (var i = 0; i < nextProps.user_list.length; i++) {
            if (nextProps.user_list[i].isShared)
                shared = shared.concat({
                    value: nextProps.user_list[i].id,
                    label: nextProps.user_list[i].name,
                    permission: nextProps.user_list[i].isShared
                });
            else
                unshared = unshared.concat({
                    value: nextProps.user_list[i].id,
                    label: nextProps.user_list[i].name
                });
        }
        return { shared: shared, unshared: unshared };
    }
    return null;
    }
  
    handleChange=(selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }
      handlePermmision=()=>{
        this.setState({permission:!this.state.permission});
        console.log('권한 체크:::',this.state.permission);
      }

    render() {
        const { visible, onCancel, onConfirm,   
                modal_icon, modal_title, modal_content, btn_name,id,text } = this.props;
        
        const { selectedOption,permission}=this.state;

        return (
            <ModalWrapper visible={visible}>
                <div className={cx("question")}>
                    <div className={cx("title")}>
                        <FontAwesomeIcon icon={modal_icon} size="2x" color="#1C90FB" />
                        &nbsp;&nbsp;&nbsp;&nbsp;<strong>{modal_title}</strong>
                    </div>
                    <br />                    
                    <div className={cx("description")}>{modal_content}</div>
                    <br />
                    <br />
                    
                    <div className={cx("selectform")}>
                    <Select className={cx("select")} value={this.state.selectedOption} onChange={this.handleChange} options={this.state.unshared}/>
                    <Switch  handlePermmision={this.handlePermmision}/>  
                    <IconButton>
                    <Add onClick={()=>onConfirm[0](selectedOption.value,id,(permission)?'MEMBER':'MANAGER')}/>
                    </IconButton>
                    </div>          
                    <br /><br />
                    <Members 
                    folder_id={id}
                    onDelete={onConfirm} 
                    members={this.state.shared} />
                    <br />
                </div>

                <div className={cx("options")}>
                    <Button theme="outline" onClick={onCancel}>
                        {btn_name}
                    </Button>
                </div>
            </ModalWrapper>
        );
    }
}
export default connect(
    (state) => ({
        user_list: state.user.get("user_list"),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(UserActions, dispatch),
    })
)(AskShareModal);