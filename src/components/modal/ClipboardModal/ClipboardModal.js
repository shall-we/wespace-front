import React from "react";
import styles from "./ClipboardModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "../ModalWrapper";
import Button from "../../common/Button";
import OutlinedTextField from "../OutlinedTextField";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserFriends, faFileAlt, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUserFriends);
library.add(faFileAlt);
library.add(faFileSignature);

const cx = classNames.bind(styles);

class ClipboardModal extends React.Component{

    handleCopy = (event) => {
        var text = document.createElement("textarea");
        document.body.appendChild(text);
        text.value = this.props.text;
        text.select();
        document.execCommand('copy');
        alert('클립보드에 복사되었습니다');
        document.body.removeChild(text);
    }

    render(){
        const { visible, onConfirm, onCancel, id,
                modal_icon, modal_title, modal_content, btn_name } = this.props;
        return (
            <div tabIndex="-1"
            onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    onConfirm(id);
                    onCancel();
                }
                if(e.keyCode === 27) {
                    onCancel(id);
                    onConfirm();
                }
            }}>
            <ModalWrapper visible={visible}>
                <div className={cx("question")}>
                    <div className={cx("title")}>
                        <FontAwesomeIcon icon={modal_icon} size="2x" color="#1C90FB" />
                        &nbsp;&nbsp;&nbsp;&nbsp;<strong>{modal_title}</strong>
                    </div>
                    <br />
                    <div className={cx("description")}>
                        {modal_content}
                    </div>
                    <br />
                    {/* <h3>폴더명</h3> */}
                    <OutlinedTextField readonly={true} value={this.props.text}/>
                </div>

                <div className={cx("options")}>
                    <Button theme='outline' onClick={(e)=>{ this.handleCopy(); }}>복사하기</Button>
                    <Button theme='outline' onClick={(e)=>{ onConfirm(id); onCancel(); }}>
                        {btn_name}
                    </Button>
                </div>
            </ModalWrapper>
            </div>
        )
    }
}

export default ClipboardModal;
