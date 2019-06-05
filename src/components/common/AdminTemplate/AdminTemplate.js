import React from "react";
import styles from "./AdminTemplate.scss";
import classNames from "classnames/bind";

import HeaderContainer from "../../../containers/common/HeaderContainer";

const cx = classNames.bind(styles);

const AdminTemplate = ({ children }) => (
  <div className={cx("admin-template")}>
    <HeaderContainer />
    <main>{children}</main>
  </div>
);

export default AdminTemplate;
