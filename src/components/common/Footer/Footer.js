/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import Github from "../../../image/ic-github.png";
import License from "../../../image/ic-mit.png";

const cx = classNames.bind(styles);

const Footer = () => (
  <footer className={cx("footer")}>
    <div className={cx("brand")}>

      <p style={{ alignSelf: "center", justifyContent: "center" }}>
        Copyright 2019.{" "}<i><strong>Shall-We</strong></i>{" "}Team. All rights reserved.
      </p>
    </div>

      <div className={cx("icon")}>
        <a href="https://github.com/shall-we/wespace-front/blob/master/LICENSE.md" target="_blank">
          <img src={License} alt="MIT License" style={{ width: "2.5rem" }} />
        </a>
        <a href="https://github.com/shall-we/wespace-front" target="_blank">
          <img src={Github} alt="Go to WESPACE on Github" style={{ width: "2.5rem" }} />
        </a>
      </div>
  </footer>
);

export default Footer;
