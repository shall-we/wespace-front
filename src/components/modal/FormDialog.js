import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  
    return (
        <div>
            <Dialog open={true} onClose={null} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">사용자 정보</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        노트에서 사용할 닉네임을 적어주세요.
                    </DialogContentText>
                    <TextField
                        onChange={props.handleTextChange}
                        autoFocus
                        id="name"
                        label="NickName"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.cancel} color="primary">
                        취소
                    </Button>
                    <Button onClick={props.join} color="primary">
                        입장
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}