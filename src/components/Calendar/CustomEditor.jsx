import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns'
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker'
import classNames from 'classnames'
import {
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete
} from '@mui/material'
import { styled } from '@mui/material'
import { useCabinsQuery } from '../../services/apis/cabinApi'
import { useCustomersQuery } from '../../services/apis/customerApi'
import moment from 'moment'
import { formatter } from '../../config/constants'

function CustomEditor({ scheduler }) {
  const { data: cabins } = useCabinsQuery()
  const { data: customers } = useCustomersQuery()

  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState([null, null])
  const [cabin, setCabin] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [customer, setCustomer] = useState(null)
  const [tinaja, setTinaja] = useState(false)
  const [comments, setComments] = useState('')

  const reservationDays =
    dates[1] && moment.duration(moment(dates[1]).diff(moment(dates[0]))).days()
  const amount = (cabin?.price && cabin.price * reservationDays) || 0
  const totalAmount = amount - discount

  const verifyDiscount = (disc) => {
    if (!discount) {
      return false
    }
    if (+discount === amount * disc) {
      return true
    }
    return false
  }
  useEffect(() => {
    setTimeout(() => {
      const customEditor = document.getElementsByClassName('custom-editor')[1]
      if (open) {
        customEditor.firstChild.style.display = 'none'
      }
    }, 1)
  }, [open])

  useEffect(() => {
    setDates([scheduler.state.start.value, null])
  }, [scheduler])

  const customerOptions = customers?.map((customer) => ({
    customer,
    label: customer.fullname
  }))

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: 'Entrada', end: 'Salida' }}
    >
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 16, marginBottom: 2 }} gutterBottom>
            Agregar reserva
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id='select-cabin-label'>Cabaña</InputLabel>
            <Select
              labelId='select-cabin-label'
              value={cabin}
              label='Cabaña'
              onChange={(e) => setCabin(e.target.value)}
            >
              <MenuItem value={null}>Ninguna</MenuItem>
              {cabins &&
                cabins.map((cabin) => (
                  <MenuItem key={cabin.id} value={cabin}>
                    {cabin.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Autocomplete
              disablePortal
              options={customerOptions}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) =>
                option.customer.id === value.customer.id
              }
              onChange={(_, { customer }) => {
                setCustomer(customer.id)
              }}
              renderInput={(params) => (
                <TextField {...params} label='Cliente' />
              )}
            />
          </FormControl>
          <FormControlLabel
            sx={{ marginBottom: 2, ml: 1 }}
            label='Tinaja'
            labelPlacement='start'
            control={
              <Switch
                onChange={(e) => setTinaja(e.target.checked)}
                name='tinaja'
              />
            }
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label='Comentarios'
              variant='outlined'
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <Grid marginBottom={2} alignItems='center' container>
            <Grid item sm={11}>
              <FormControl sx={{ marginBottom: 2 }}>
                <TextField
                  focused
                  disabled
                  value={formatter.format(amount)}
                  label='Monto'
                />
              </FormControl>
            </Grid>

            <Grid sm={4}>
              <FormControl>
                <TextField
                  value={discount}
                  type='number'
                  label='Descuento'
                  onChange={(e) => {
                    if (e.target.value > amount) return
                    if (discount < 0) return
                    setDiscount(e.target.value, amount)
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item sm={8}>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.05)
                }}
                variant={verifyDiscount(0.05) ? 'contained' : ''}
              >
                5%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.1)
                }}
                variant={verifyDiscount(0.1) ? 'contained' : ''}
              >
                10%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.2)
                }}
                variant={verifyDiscount(0.2) ? 'contained' : ''}
              >
                20%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.3)
                }}
                variant={verifyDiscount(0.3) ? 'contained' : ''}
              >
                30%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.4)
                }}
                variant={verifyDiscount(0.4) ? 'contained' : ''}
              >
                40%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(0)
                }}
                variant={discount === 0 ? 'contained' : ''}
              >
                No Aplica
              </Button>
            </Grid>
          </Grid>
          <FormControl sx={{ marginBottom: 2 }}>
            <TextField
              focused
              disabled
              value={formatter.format(totalAmount)}
              label='Monto + Descuento'
            />
          </FormControl>

          {/* <FormControl className={classes.input} fullWidth >
            <TextField label="Mensajes" variant="outlined" rows={4} />
          </FormControl> */}

          <MobileDateRangePicker
            sx={{ marginBottom: 2 }}
            value={dates}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            className={classNames('custom-editor')}
            onChange={(newValue) => {
              setDates(newValue)
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> hasta </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            sx={{ marginLeft: 'auto' }}
            onClick={scheduler.close}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              scheduler.handleConfirm({
                cabin,
                customerId: customer,
                tinaja,
                comments,
                amount: totalAmount,
                discount,
                dates
              })
              scheduler.close()
            }}
          >
            Confirmar
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  )
}

export default CustomEditor
