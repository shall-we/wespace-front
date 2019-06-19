import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as directoryActions from 'store/modules/directory';
import Editor from 'components/main/Editor';
import { withRouter } from 'react-router-dom';
import FormDialog from 'components/modal/FormDialog';

class PublicNoteContainer extends Component {


    state = {
        note: this.props.note,
        flag: false,
        nickName: '',
        note_status: 'PUBLISHED',
        note_lock: '',
    }

    componentWillMount() {
        const {note, DirectoryActions} = this.props;
        DirectoryActions.noteStateCheck(note);
    }

    componentDidMount() {
       
    }

    cancel = () => {
        this.props.history.push('/');
    }

    join = async() => {
        this.setState({
            flag: true,
        })
    }
    handleTextChange = (e) => {
        this.setState({
            nickName: e.target.value,
        })
    }

    componentWillReceiveProps(nextProps) {

        if ((this.props.note_status !== nextProps.note_status)||(this.props.note_lock !== nextProps.note_lock)) {
            this.setState({ note_status: nextProps.note_status, note_lock : nextProps.note_lock });  
            
        }
    }


    render() {
        const { note, note_lock, flag, nickName,note_status } = this.state;
        const { cancel, join, handleTextChange } = this;

        if(note_status!== "PUBLISHED"){
            this.props.history.push("/");
        }
        if (flag) {
            return (
                <Editor key={note} note={note} note_lock={note_lock} name={nickName} profile="https://i1.daumcdn.net/image.hope/site/images/together/thumb_person.png" />
            );
        } else {
            return (
                <FormDialog cancel={cancel} join={join} handleTextChange={handleTextChange} />
            )
        }
    }
}

export default connect(
    (state) => ({
        note_lock: state.directory.get("note_lock"),
        note_status: state.directory.get("note_status"),
    }),
    (dispatch) => ({
        DirectoryActions: bindActionCreators(directoryActions, dispatch),
    })
)(withRouter(PublicNoteContainer));