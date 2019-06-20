import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './NoteDialog.scss';

export default function NoteDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = scrollType => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    function handleClose() {
        setOpen(false);
    }

    return (
        <div className="announcementList">
            <button className="announcement-button"
                onClick={handleClickOpen('paper')}>{props.List.title}
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="customized-dialog-title"
            >
                <DialogTitle id="customized-dialog-title">{props.List.title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText>
                        {props.List.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}