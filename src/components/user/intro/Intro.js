import React, { Component } from "react";
import "./Intro.scss";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import PlayButton from "../../../image/btn-play.png";
import { withRouter } from "react-router-dom";

const modalcustom = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  openModal = () => { this.setState({ modalIsOpen: true }); }
  closeModal = () => { this.setState({ modalIsOpen: false }); }

  render() {
    return (
      <div className="intro">
        <section className="intro-left">
          <div className="main-text">
            효율적인 업무 시스템<br />
            협업을 위한 스마트스퀘어,<br />
            <strong>공유 노트 WESPACE</strong><br />
          </div>

          <div className="sub-text">
            <br />문서 동시 편집 및 파일 공유,
            <br />업무 상황을 단번에 확인할 수 있도록
            <br />편리한 사용자 경험을 담았습니다.
          </div>
        </section>

        <section className="intro-right">
          <div className="responsive-wrapper">
            <button className="Buttons" style={{ background: "none", border: "none", outline: "none" }}>
              <img src={PlayButton} alt="Play Button" onClick={this.openModal}
                   style={{ cursor: "pointer", width: 120 }} />
            </button>
          </div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalcustom}>
            <ReactPlayer url="https://youtu.be/PL9iyA3dZ9I" controls playing />
          </Modal>
        </section>
      </div>
    );
  }
}

export default withRouter(intro);
