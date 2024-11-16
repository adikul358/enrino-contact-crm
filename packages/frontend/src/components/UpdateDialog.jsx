import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from './AlertSnackBar'

const UpdateDialog = ({ open, setOpen, data, refresh }) => {
  const [alertOpen, setAlertOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  })
  const [alertMsg, setAlertMsg] = useState({
    severity: 'success',
    message: `Updated ${formData.firstName} ${formData.lastName} successfully`
  })

  useEffect(() => {
    setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      jobTitle: data.jobTitle
    })
  }, [data])

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = async () => {
    const res = await (await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/contacts/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })).json()
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

  const handleFieldUpdate = (field) => (e) => {
    const delta = {}
    delta[field] = e.target.value
    setFormData({ ...formData, ...delta })
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
          Update Contact
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} direction='column' sx={{ paddingTop: 1 }}>
            <Stack spacing={2} direction='row' sx={{ display: 'flex' }}>
              <TextField
                label='First Name'
                value={formData.firstName}
                onChange={handleFieldUpdate('firstName')}
                sx={{ width: '100%' }}
              />
              <TextField
                label='Last Name'
                value={formData.lastName}
                onChange={handleFieldUpdate('lastName')}
                sx={{ width: '100%' }}
              />
            </Stack>
            <TextField
              label='Email'
              value={formData.email}
              onChange={handleFieldUpdate('email')}
              sx={{ width: '100%' }}
            />
            <TextField
              label='Phone'
              value={formData.phone}
              onChange={handleFieldUpdate('phone')}
              sx={{ width: '100%' }}
            />
            <TextField
              label='Company'
              value={formData.company}
              onChange={handleFieldUpdate('company')}
              sx={{ width: '100%' }}
            />
            <TextField
              label='Job Title'
              value={formData.jobTitle}
              onChange={handleFieldUpdate('jobTitle')}
              sx={{ width: '100%' }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction='row'>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleUpdate}>Update</Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <AlertSnackbar open={alertOpen} setOpen={setAlertOpen} message={alertMsg} />
    </>
  )
}

export default UpdateDialog
