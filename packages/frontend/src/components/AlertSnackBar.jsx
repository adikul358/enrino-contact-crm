import Snackbar from '@mui/material/Snackbar';
import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert';

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function AlertSnackbar({open, setOpen, message}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={GrowTransition}
        autoHideDuration={1500}
      >
        <Alert
            onClose={handleClose}
            severity={message.severity}
            variant="standard"
            sx={{ width: '100%' }}
        >
            {message.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
