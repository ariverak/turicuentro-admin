import React, { useState } from 'react'
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
  MenuItem
} from '@mui/material'
import { styled } from "@mui/material"
import { useCabinsQuery } from '../../services/apis/cabinApi'
import { useCustomersQuery } from '../../services/apis/customerApi'

const useStyles = styled((theme) => ({
  input: {
    marginBottom: '1rem'
  },
}))

function CustomEditor({ scheduler }) {
  const { data: cabins } = useCabinsQuery()
  const { data: customers } = useCustomersQuery()

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState([null, null])
  const [cabin, setCabin] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [tinaja, setTinaja] = useState(false)
  const [comments, setComments] = useState('')

  React.useEffect(() => {
    setTimeout(() => {
      const customEditor = document.getElementsByClassName('custom-editor')[1]
      if (open) {
        customEditor.firstChild.style.display = 'none'
      }
    }, 1)
  }, [open])

  React.useEffect(() => {
    setDates([scheduler.state.start.value, null])
  }, [scheduler])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: 'Entrada', end: 'Salida' }}
    >
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 16 , marginBottom:2}} gutterBottom >
            Agregar reserva
          </Typography>
          <FormControl className={classes.input} fullWidth sx={{marginBottom:2}}>
            <InputLabel id='select-cabin-label'>Cabaña</InputLabel>
            <Select
              labelId='select-cabin-label'
              value={cabin}
              label='Cabaña'
              onChange={(e) => setCabin(e.target.value)}
            >
              <MenuItem value={null}>Ninguna</MenuItem>
              {cabins && cabins.map((cabin) => (
                <MenuItem key={cabin.id} value={cabin.id}>
                  {cabin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.input} fullWidth sx={{marginBottom:2}}>
            <InputLabel id='select-customer-label'>Cliente</InputLabel>
            <Select
              labelId='select-customer-label'
              value={customer}
              label='Cliente'
              onChange={(e) => setCustomer(e.target.value)}
            >
              <MenuItem value={null}>Ninguna</MenuItem>
              {customers && customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
          sx={{marginBottom:2}}
            label='Tinaja'
            labelPlacement="start"
            className={classes.input}
            control={
              <Switch
                onChange={(e) => setTinaja(e.target.checked)}
                name='tinaja'
              />
            }

          />
          <FormControl className={classes.input} fullWidth sx={{marginBottom:2}}>
            <TextField label="Comentarios" variant="outlined" rows={4} onChange={(e)=>setComments(e.target.value)} />
          </FormControl>
          {/* <FormControl className={classes.input} fullWidth >
            <TextField label="Mensajes" variant="outlined" rows={4} />
          </FormControl> */}
          <MobileDateRangePicker
          sx={{marginBottom:2}}
            value={dates}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            className={classNames('custom-editor', classes.input)}
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
            onClick={() => scheduler.handleConfirm({
              cabin,
              customer,
              tinaja,
              comments,
              dates,
            })}
          >
            Confirmar
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  )
}

export default CustomEditor
