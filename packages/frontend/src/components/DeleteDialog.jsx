import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertSnackbar from './AlertSnackBar';
import { useState } from 'react';

const DeleteDialog = ({ open, setOpen, data, refresh }) => {
  const [alertOpen, setAlertOpen] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const res = await (await fetch(`http://localhost:3000/contacts/${data.id}`, { method: "DELETE" })).json()
    console.log(res)
    setOpen(false)
    setAlertOpen(true)
    refresh()
  };

  return (
    <>
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Contact?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete {data.fullName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleDelete}>Delete</Button>
        </Stack>
      </DialogActions>
    </Dialog>
    <AlertSnackbar open={alertOpen} setOpen={setAlertOpen} message={`Deleted ${data.fullName} successfully`} />
    </>
  );
}

export default DeleteDialog