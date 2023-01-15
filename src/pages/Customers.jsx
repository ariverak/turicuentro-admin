import { Button, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useCustomersQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } from '../services/apis/customerApi'
import { useState } from 'react'
import Layout from '../components/layout'
import Table from '../components/Table.jsx'
import FormModal from '../components/FormModal'
import DeleteModal from '../components/DeleteModal'
import { useForm } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { customerSchema } from '../validations/CustomerValidation'
import { yupResolver } from '@hookform/resolvers/yup'


const Customers = () => {
  const [createCustomer, { isLoading: isLoadingCreate }] = useCreateCustomerMutation();
  const [deleteCustomer, { isLoading: isLoadingDelete }] = useDeleteCustomerMutation();
  const [updateCustomer, { isLoading: isLoadingUpdate }] = useUpdateCustomerMutation();

  const { data:customers, refetch: refetchCustomers } = useCustomersQuery()

  const [customerModal, setCustomerModal] = useState({ visible: false, customer: null })
  const [deleteModal, setDeleteModal] = useState({ visible: false, customerId: null })

  const {
    handleSubmit: handleSubmitCustomer,
    register: registerCustomer,
    reset: resetCustomer,
    setValue: setCustomerValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema)
  });

  const onSubmitCustomer = async (data) => {

    const { id, fullname, email, phone } = data;
    const editedData = { id, fullname, email, phone };
    data.id ? await updateCustomer(editedData) : await createCustomer(data);
    refetchCustomers();
    resetCustomer();
    setCustomerModal({ visible: false });
  };

  const handleDeleteCustomer = async () => {
    await deleteCustomer(deleteModal.customerId);
    refetchCustomers();
    setDeleteModal({ visible: false });
  };

  const columns = [
    {
      field: 'fullname',
      headerName: 'Nombres',
      headerClassName: 'backgroundColor:#eee',
      flex: 0.1,
      width: 150,
      disableClickEventBubbling: true,
    },

    {
      field: 'email',
      flex: 0.1,
      headerName: 'Correo',
      align: 'left',
      type: 'string',
      width: 150,
    },
    {
      field: 'phone',
      flex: 0.1,
      headerName: 'Teléfono',
      align: 'left',
      type: 'string',
      width: 150,
    },
    {
      field: 'actions',
      flex: 0.1,
      headerName: 'Acciones',
      sortable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            size="small"
            onClick={() => {
              setCustomerModal({ visible: true, customer: params.row })
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            size="small"
            onClick={() => {
              setDeleteModal({ visible: true, customerId: params.row.id })
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
          <Button variant="contained" onClick={() => { setCustomerModal({ visible: true }) }}>
            Agregar
          </Button>
        </Grid>
        <br />
        <Grid rounded="true" justifyContent="center" container alignItems="center">
          {customers &&
            <Table
              data={customers}
              columns={columns}
            />
          }
        </Grid>
      </Layout>
      <FormModal
        id="form-customer"
        title={!customerModal.customer ? 'Agregar Cliente' : 'Editar Cliente'}
        open={customerModal.visible}
        onClose={() => setCustomerModal({ visible: false })}

        defaultValues={customerModal.customer}
        setValue={setCustomerValue}
        reset={resetCustomer}>
        <FormControl>
          <form onSubmit={handleSubmitCustomer(onSubmitCustomer)}>
            <TextField
              margin="normal"
              fullWidth
              id="fullname"
              label="Nombre Completo"
              name="fullname"
              error={errors?.fullname && true}
              helperText={errors?.fullname?.message}
              {...registerCustomer("fullname")}

            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              error={errors?.email && true}
              helperText={errors?.email?.message}
              {...registerCustomer("email")}

            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Número de Teléfono"
              name="phone"
              error={errors?.phone && true}
              helperText={errors?.phone?.message}
              {...registerCustomer("phone")}
            />
            <Grid justifyContent="space-between" container marginTop={3}>
              <Button
                variant="outlined"
                onClick={() => { setCustomerModal({ visible: false }) }}
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
        onConfirm={handleDeleteCustomer}
        description={
          <>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
              ¿Quieres eliminar este cliente?
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

export default Customers