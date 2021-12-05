import React, { useEffect } from 'react'
import './popup.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({ status, title, content, onChangeStatus })
{
    const [open, setOpen] = React.useState(status)
    useEffect(() => {
        setOpen(status)
    }, [ status ])
    
    const handleClose = () => {
        setOpen(false)
        onChangeStatus(false)
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {title}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {content}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    ); 
}
