import ContactsTable from './components/ContactsTable'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from './components/Drawer'
import Box from '@mui/material/Box'

const drawerWidth = 210

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#171821',
      paper: '#171821'
    },
    primary: {
      main: '#A9DFD8'
    }
  },
  typography: {
    fontFamily: 'Outfit, system-ui, sans-serif',
    body1: { fontWeight: 600 }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#A9DFD8 !important'
          }
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontWeight: 400
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: 400
        }
      }
    },
    'MuiDrawer-paperAnchorDockedLeft': {
      styleOverrides: {
        root: {
          background: '#171821 !important'
        }
      }
    }
  }
})

function App (props) {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Drawer />
          <Box
            component='main' sx={{
              flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }
            }}
          >
            <ContactsTable />
          </Box>
        </Box>
      </ThemeProvider>;
    </div>
  )
}

export default App
