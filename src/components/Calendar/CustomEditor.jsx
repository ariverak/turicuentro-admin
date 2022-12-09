import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns'
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker'
import classNames from 'classnames'
import {
  TextField,
  Box,
  Dialog,
  DialogContent,
  Card,
  CardHeader,
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
import { makeStyles } from '@mui/styles'
import { useCabinsQuery } from '../../services/apis/cabinApi'

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: '1rem'
  }
}))

function CustomEditor({ scheduler }) {
  const { data: cabins } = useCabinsQuery()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [dates, setDates] = React.useState([null, null])
  const [cabin, setCabin] = React.useState(null)

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
          <Typography sx={{ fontSize: 16 }} gutterBottom>
            Agregar reserva
          </Typography>
          <br />
          <FormControl className={classes.input} fullWidth>
            <InputLabel id='select-cabin-label'>Cabaña</InputLabel>
            <Select
              labelId='select-cabin-label'
              value={cabin}
              label='Cabaña'
              onChange={(e) => setCabin(e.target.value)}
            >
              <MenuItem value={null}>Ninguna</MenuItem>
              {cabins.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            className={classes.input}
            control={
              <Switch
                checked={true}
                // onChange={handleChange}
                name='tinaja'
              />
            }
            label='Tinaja'
          />
          <MobileDateRangePicker
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
            onClick={scheduler.onConfirm}
          >
            Confirmar
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  )
}

export default CustomEditor
