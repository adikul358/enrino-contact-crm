import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from './AlertSnackBar'
import { useEffect, useState } from 'react'

const DeleteDialog = ({ open, setOpen, data, refresh }) => {
  const [fullName, setFullName] = useState(`${data.firstName || ''} ${data.lastName || ''}`)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState({
    severity: 'success',
    message: `Deleted ${fullName} successfully`
  })

  useEffect(() => {
    setFullName(`${data.firstName || ''} ${data.lastName || ''}`)
    setAlertMsg({
      severity: 'success',
      message: `Deleted ${data.firstName || ''} ${data.lastName || ''} successfully`
    })
  }, [data])

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    const res = await (await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/contacts/${data.id}`, { method: 'DELETE' })).json()
    console.log(res)
    if (res.error) {
      setAlertMsg({
        severity: 'error',
        message: res.error
      })
      setAlertOpen(true)
    } else {
      setAlertOpen(true)
      setOpen(false)
      refresh()
    }
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Delete Contact?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Delete {fullName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={handleClose}>Cancel</Button>
            <Button variant='outlined' onClick={handleDelete}>Delete</Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <AlertSnackbar open={alertOpen} setOpen={setAlertOpen} message={alertMsg} />
    </>
  )
}

export default DeleteDialog
