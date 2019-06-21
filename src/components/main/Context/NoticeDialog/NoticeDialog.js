import React from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';

import DialogContent from '@material-ui/core/DialogContent';

import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

import './NoticeDialog.scss';

export default function NoticeDialog(props) {

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
                    <Typography variant = "body1" style = {{ whiteSpace : 'pre-wrap' }}>
                        { props.List.content }
                    </Typography >
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