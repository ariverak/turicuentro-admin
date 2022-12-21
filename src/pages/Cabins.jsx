import { Box, Button, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Layout from '../components/layout'
import Table from '../components/Table.jsx'
import { useCabinsQuery, useCreateCabinMutation, useUpdateCabinMutation, useDeleteCabinMutation } from '../services/apis/cabinApi'
import FormModal from '../components/FormModal'
import DeleteModal from '../components/DeleteModal'
import { useForm } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Cabins = () => {
  const [deleteCabin, { isLoading: isLoadingDelete }] = useDeleteCabinMutation();
  const [updateCabin, { isLoading: isLoadingUpdate }] = useUpdateCabinMutation();
  const [createCabin, { isLoading: isLoadingCreate }] = useCreateCabinMutation();

  const { data: cabins, refetch: refetchCabin } = useCabinsQuery()

  const [cabinModal, setCabinModal] = useState({ visible: false, cabin: null })
  const [deleteModal, setDeleteModal] = useState({ visible: false, cabinId: null })

  const {
    handleSubmit: handleSubmitCabin,
    register: registerCabin,
    reset: resetCabin,
    setValue: setCabinValue,
  } = useForm();

  const onSubmitCabin = async (data) => {

    const { id, name, price } = data;
    const editedData = { id, name, price }
    data.id ? await updateCabin(editedData) : await createCabin(data);
    refetchCabin();
    resetCabin();
    setCabinModal({ visible: false });
  };

  const handleDeleteCabin = async () => {
    await deleteCabin(deleteModal.cabinId);
    refetchCabin();
    setDeleteModal({ visible: false });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Cabaña',
      headerClassName: 'backgroundColor:#eee',
      flex: 0.1,
      width: 150,
      disableClickEventBubbling: true,
    },

    {
      field: 'price',
      flex: 0.1,
      headerName: 'Precio',
      headerAlign: 'left',
      align: 'left',
      type: 'number',
      disableClickEventBubbling: true,
      width: 150,
    },
    {
      field: 'actions',
      flex: 0.1,
      headerName: 'Acciones',
      sortable: false,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            size="small"
            onClick={() => {
              setCabinModal({ visible: true, cabin: params.row })
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            size="small"
            onClick={() => {
              setDeleteModal({ visible: true, cabinId: params.row.id })
              console.log(params.row.id)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
  ];

  return (
    <>
      <Layout>
        <Grid justifyContent="end" container width='90%'>
          <Button variant="contained" onClick={() => { setCabinModal({ visible: true }) }}>
            Agregar
          </Button>
        </Grid>
        <br />
        <Grid rounded="true" justifyContent="center" container alignItems="center">
          {cabins &&
            <Table
              data={cabins}
              columns={columns}
            />
          }
        </Grid>
      </Layout>
      <FormModal
        id="form-cabin"
        title={!cabinModal.cabin ? 'Agregar Cabaña' : 'Editar Cabaña'}
        open={cabinModal.visible}
        onClose={() => setCabinModal({ visible: false })}

        defaultValues={cabinModal.cabin}
        setValue={setCabinValue}
        reset={resetCabin}>
        <FormControl>
          <form onSubmit={handleSubmitCabin(onSubmitCabin)}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Cabaña"
              name="name"
              {...registerCabin("name")}

            />
            <TextField
              margin="normal"
              fullWidth
              id="price"
              label="Precio"
              type="number"
              name="price"
              {...registerCabin("price")}

            />
            <Grid justifyContent="space-between" container marginTop={3}>
              <Button
                variant="outlined"
                onClick={() => { setCabinModal({ visible: false }) }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Aceptar
              </Button>
            </Grid>
          </form>
        </FormControl>
      </FormModal>

      <DeleteModal
        open={deleteModal.visible}
        onClose={() => setDeleteModal({ visible: false })}
        onConfirm={handleDeleteCabin}
        description={
          <>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
              ¿Quieres eliminar esta cabaña?
            </Typography>
            <Typography>
              Este proceso no puede ser revertido.
            </Typography>
          </>
        }
      />
    </>
  )
}

export default Cabins