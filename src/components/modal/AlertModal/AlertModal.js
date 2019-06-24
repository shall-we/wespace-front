import React from "react";
import styles from "../NoticeModal/NoticeModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Button from "../../common/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Add fontawesome icons
library.add(faExclamationCircle);

const cx = classNames.bind(styles);

class AlertModal extends React.Component {
    static defaultProps = {
        modal_icon: 'exclamation-circle'
    };

    handleIcon = () => {
        this.setState(
            ({icon}) => ({
                modal_icon: icon
            })
        );
    }

    render() {
        const { visible, onCancel,
            modal_icon, modal_title, modal_content } = this.props;

        return (
            <div tabIndex="-1"
                 onKeyDown={(e) => {
                     if(e.key === 'Enter') {
                         onCancel();
                     }
                     if(e.keyCode === 27) {
                         onCancel();
                     }
                 }}>
                <ModalWrapper visible={visible}>
                    <div className={cx("question")} >
                        <div className={cx("title")}>
                            <FontAwesomeIcon icon={modal_icon} size="2x" color="#1C90FB" />
                            &nbsp;&nbsp;&nbsp;&nbsp;<strong>{modal_title}</strong>
                        </div>

                        <br />

                        <div className={cx("description")} style={{marginTop: '0.25rem', height: '0em', fontSize : '1rem'}}>
                            {modal_content}
                        </div>

                        <br />
                    </div>

                    <div className={cx("options")}>
                        <Button theme="outline" onClick={() => { onCancel(); }}>
                            확인
                        </Button>
                    </div>

                </ModalWrapper>
            </div>
        );
    }
}

export default AlertModal;