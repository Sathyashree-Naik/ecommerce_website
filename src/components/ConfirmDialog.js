import React from 'react'
//external imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//internal imports
import "./product.css";

const ConfirmDialog = ({open,onClose,message}) => {
  return (
    <div><Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">
      <CheckCircleIcon style={{color:"#343A40" ,height:"100px" ,width:"max-content" , margin:"0px 100px"} }/>
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{margin:"0px 60px"}}>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button   className="btn-signup" onClick={onClose} autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog></div>
  )
}

export default ConfirmDialog