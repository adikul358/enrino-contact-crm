import { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';
import UpdateDialog from './UpdateDialog';

export default function ContactsTable() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [contactDeleteDialog, setContactDeleteDialog] = useState({})
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [contactUpdateDialog, setContactUpdateDialog] = useState({})
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const handleEditClick = (id, row) => () => {
    setContactUpdateDialog({ id, ...row })
    setOpenUpdateDialog(true)
  }
  const handleDeleteClick = (id, row) => () => {
    setContactDeleteDialog({ id, ...row })
    setOpenDeleteDialog(true)
  }

  const columns = [
    {
      field: 'fullName',
      headerName: 'Name',
      sortable: true,
      width: 160,
      flex: 1.25,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, row)}
            color="inherit"
          />,
        ];
      },
    },
  ]
  const paginationModel = { page: 0, pageSize: 20 }

  useEffect(() => {
    (async function () {
      const res = await ((await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/contacts`)).json())
      setTimeout(() => {
        setLoading(false)
        setData(res.result)
      }, 500)
    })()
  }, [])

  const refreshData = async () => {
    const res = await ((await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/contacts`)).json())
    setData(res.result)
  }

  return (
    <Paper sx={{ padding: 3 }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<AddIcon />}
        sx={{ marginBottom: 3 }}
        onClick={() => setOpenAddDialog(true)}
      >
        Add Contact
      </Button>
      <DataGrid
        loading={loading}
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        sx={{ border: 0 }}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
      />
      <AddDialog open={openAddDialog} setOpen={setOpenAddDialog} refresh={refreshData} />
      <DeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} data={contactDeleteDialog} refresh={refreshData} />
      <UpdateDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog} data={contactUpdateDialog} refresh={refreshData} />
    </Paper>
  )
}
