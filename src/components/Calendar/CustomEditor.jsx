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
  Autocomplete,
  Alert
} from '@mui/material'
import { useCabinsQuery } from '../../services/apis/cabinApi'
import { useCustomersQuery } from '../../services/apis/customerApi'
import moment from 'moment'
import { formatter } from '../../config/constants'
import { useSettingsQuery } from '../../services/apis/settingApi'
import { reservationSchema } from '../../validations/ReservationValidation'
import {
  useCreateReservationMutation,
  useReservationsQuery,
  useUpdateReservationMutation
} from '../../services/apis/reservationApi'

function CustomEditor({ scheduler }) {
  const [createReservation] = useCreateReservationMutation()
  const [updateReservation] = useUpdateReservationMutation()
  const { data: cabins } = useCabinsQuery()
  const { data: customers } = useCustomersQuery()
  const { data: settings } = useSettingsQuery()

  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [reservationId, setReservationId] = useState(null)
  const [dates, setDates] = useState([null, null])
  const [cabinId, setCabinId] = useState(-1)
  const [customer, setCustomer] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [tinaja, setTinaja] = useState(false)
  const [comments, setComments] = useState('')

  const settingTinaja = settings?.reduce((setting) => setting.key === 'Tinaja')
  const amountTinaja = tinaja ? +settingTinaja?.value : 0
  const reservationDays =
    dates[1] && moment.duration(moment(dates[1]).diff(moment(dates[0]))).days()
  const cabinPrice = cabins?.filter((cabin) => cabin.id === cabinId)[0]?.price
  const amount = cabinPrice * reservationDays || cabinPrice || 0
  const totalAmount = amount - discount + amountTinaja

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

  const resetErrors = () => {
    setErrors({})
  }

  useEffect(() => {
    if (scheduler?.edited) {
      const {
        id,
        cabin,
        customer,
        tinaja,
        comments,
        discount,
        startDate,
        endDate
      } = scheduler?.edited?.reservation
      setReservationId(id)
      setCabinId(cabin.id)
      setCustomer(customer)
      setTinaja(tinaja)
      setComments(comments)
      setDiscount(discount)
      setDates([startDate, endDate])
    }
  }, [scheduler?.edited])

  scheduler.handleConfirm = async (data) => {
    const isValidReservation = await reservationSchema
      .validate(data, { abortEarly: false })
      .catch((errors) => {
        return errors?.inner
      })
    if (Array.isArray(isValidReservation)) {
      const errors = isValidReservation?.reduce(
        (obj, item) => ((obj[item.path] = item.errors[0]), obj),
        {}
      )
      setErrors(errors)
      return
    }
    !data.id ? await createReservation(data) : await updateReservation(data)
    scheduler.close()
    scheduler.refetch()
  }

  console.log('errors', errors)

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
          <FormControl fullWidth sx={{ marginBottom: 2 }} required>
            <InputLabel id='select-cabin-label'>Cabaña</InputLabel>
            <Select
              required
              labelId='select-cabin-label'
              defaultValue={null}
              value={cabinId}
              onBlur={resetErrors}
              label='Cabaña'
              placeholder='Cabaña'
              onChange={(e) => setCabinId(e.target.value)}
            >
              {cabins &&
                cabins.map((cabin) => (
                  <MenuItem key={cabin.id} value={cabin.id}>
                    {cabin.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Autocomplete
              onBlur={resetErrors}
              options={customers || []}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.fullname}
              value={customer}
              onChange={(_, c) => {
                setCustomer(c)
              }}
              renderInput={(params) => (
                <TextField {...params} label='Cliente' required />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              onBlur={resetErrors}
              label='Comentarios'
              variant='outlined'
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <Grid marginBottom={2} alignItems='center' container>
            <Grid item sm={12}>
              <FormControl sx={{ marginBottom: 2 }}>
                <TextField
                  focused
                  disabled
                  value={formatter.format(amount)}
                  label='Valor Cabaña + Noches'
                />
              </FormControl>
            </Grid>

            <Grid item sm={4}>
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
          <Grid container alignItems='center' marginBottom={2}>
            <Grid item sm={4}>
              <FormControl>
                <TextField
                  focused
                  disabled
                  value={formatter.format(totalAmount)}
                  label='Total + Descuento'
                />
              </FormControl>
            </Grid>
            <Grid item sm={8}>
              <FormControlLabel
                label='Tinaja'
                labelPlacement='start'
                control={
                  <Switch
                    checked={tinaja}
                    onChange={(e) => setTinaja(e.target.checked)}
                    name='tinaja'
                  />
                }
              />
            </Grid>
          </Grid>
          {/* <FormControl className={classes.input} fullWidth >
            <TextField label="Mensajes" variant="outlined" rows={4} />
          </FormControl> */}

          <MobileDateRangePicker
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
                <TextField {...startProps} required />
                <Box sx={{ mx: 2 }}> hasta </Box>
                <TextField {...endProps} required />
              </>
            )}
          />
          {Object.keys(errors).length > 0 && (
            <Alert sx={{ mt: 2 }} severity='error'>
              {Object.values(errors).map((error) => (
                <div key={error}>{error}</div>
              ))}
            </Alert>
          )}
        </CardContent>
        <CardActions sx={{ margin: 2 }}>
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
              scheduler.handleConfirm(
                {
                  id: reservationId,
                  cabinId,
                  customerId: customer?.id,
                  tinaja,
                  comments,
                  amount: totalAmount,
                  discount,
                  startDate: dates[0],
                  endDate: dates[1]
                },
                scheduler
              )
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
