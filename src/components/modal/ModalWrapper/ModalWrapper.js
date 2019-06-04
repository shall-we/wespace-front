import React, { Component } from "react";
import styles from "./ModalWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
    render() {
        const { children, visible } = this.props;
        if (!visible) return null;

        return (
            <div className={cx(visible)}>
                <div className={cx("gray-background")} />
                <div className={cx("modal-wrapper")}>
                    <div className={cx("modal")} >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalWrapper;
