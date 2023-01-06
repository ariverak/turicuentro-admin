import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import classNames from "classnames";
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
} from "@mui/material";
import { useCabinsQuery } from "../../services/apis/cabinApi";
import { useCustomersQuery } from "../../services/apis/customerApi";
import moment from "moment";
import { formatter } from "../../config/constants";
import { useSettingsQuery } from "../../services/apis/settingApi";


function CustomEditor({ scheduler }) {
  const { data: cabins } = useCabinsQuery();
  const { data: customers } = useCustomersQuery();
  const { data: settings } = useSettingsQuery();

  const [open, setOpen] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [dates, setDates] = useState([null, null]);
  const [cabinId, setCabinId] = useState(-1);
  const [customerId, setCustomerId] = useState(-1);
  const [discount, setDiscount] = useState(0);
  const [tinaja, setTinaja] = useState(false);
  const [comments, setComments] = useState("");

  const settingTinaja = settings?.reduce((setting) => setting.key === "Tinaja");
  const amountTinaja = tinaja ? +settingTinaja?.value : 0;
  const reservationDays =
    dates[1] && moment.duration(moment(dates[1]).diff(moment(dates[0]))).days();
  const cabinPrice = cabins?.filter((cabin) => cabin.id === cabinId)[0]?.price;
  const amount = cabinPrice * reservationDays || cabinPrice || 0;
  const totalAmount = amount - discount + amountTinaja;

  const verifyDiscount = (disc) => {
    if (!discount) {
      return false;
    }
    if (+discount === amount * disc) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setTimeout(() => {
      const customEditor = document.getElementsByClassName("custom-editor")[1];
      if (open) {
        customEditor.firstChild.style.display = "none";
      }
    }, 1);
  }, [open]);

  useEffect(() => {
    setDates([scheduler.state.start.value, null]);
  }, [scheduler]);

  useEffect(() => {
    console.log(scheduler.edited);
    if (scheduler?.edited) {
      const {
        id,
        cabin,
        customer,
        tinaja,
        comments,
        discount,
        startDate,
        endDate,
      } = scheduler?.edited?.reservation;
      setReservationId(id);
      setCabinId(cabin.id);
      setCustomerId(customer.id);
      setTinaja(tinaja);
      setComments(comments);
      setDiscount(discount);
      setDates([startDate, endDate]);
    }
  }, [scheduler?.edited]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: "Entrada", end: "Salida" }}
    >
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 16, marginBottom: 2 }} gutterBottom>
            Agregar reserva
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="select-cabin-label">Cabaña</InputLabel>
            <Select
              labelId="select-cabin-label"
              value={cabinId}
              label="Cabaña"
              onChange={(e) => setCabinId(e.target.value)}
            >
              <MenuItem value={-1}>NO SELECCIONADO</MenuItem>
              {cabins &&
                cabins.map((cabin) => (
                  <MenuItem key={cabin.id} value={cabin.id}>
                    {cabin.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="select-customer-label">Cliente</InputLabel>
            <Select
              labelId="select-customer-label"
              value={customerId}
              label="Cliente"
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <MenuItem value={-1}>NO SELECCIONADO</MenuItem>
              {customers &&
                customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.fullname}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControlLabel
            sx={{ marginBottom: 2, ml: 1 }}
            label="Tinaja"
            labelPlacement="start"
            control={
              <Switch
                checked={tinaja}
                onChange={(e) => setTinaja(e.target.checked)}
                name="tinaja"
              />
            }
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Comentarios"
              variant="outlined"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <Grid marginBottom={2} container>
            <Grid sm={11}>
              <FormControl sx={{ marginBottom: 2 }}>
                <TextField
                  focused
                  disabled
                  value={formatter.format(amount)}
                  label="Valor Cabaña + Noches"
                />
              </FormControl>
            </Grid>

            <Grid sm={4}>
              <FormControl>
                <TextField
                  value={discount}
                  type="number"
                  label="Descuento"
                  onChange={(e) => {
                    if (e.target.value > amount) return;
                    if (discount < 0) return;
                    setDiscount(e.target.value, amount);
                  }}
                />
              </FormControl>
            </Grid>

            <Grid sx={{ ml: 1, mt: 1 }} sm={6}>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.05);
                }}
                variant={verifyDiscount(0.05) ? "contained" : ""}
              >
                5%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.1);
                }}
                variant={verifyDiscount(0.1) ? "contained" : ""}
              >
                10%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.2);
                }}
                variant={verifyDiscount(0.2) ? "contained" : ""}
              >
                20%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.3);
                }}
                variant={verifyDiscount(0.3) ? "contained" : ""}
              >
                30%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(amount * 0.4);
                }}
                variant={verifyDiscount(0.4) ? "contained" : ""}
              >
                40%
              </Button>
              <Button
                onClick={() => {
                  setDiscount(0);
                }}
                variant={discount === 0 ? "contained" : ""}
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
              label="Total + Descuento"
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
            className={classNames("custom-editor")}
            onChange={(newValue) => {
              setDates(newValue);
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
            variant="outlined"
            sx={{ marginLeft: "auto" }}
            onClick={scheduler.close}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              scheduler.handleConfirm({
                id: reservationId,
                cabinId,
                customerId,
                tinaja,
                comments,
                amount: totalAmount,
                discount,
                dates,
              }, scheduler.close);
            }}
          >
            Confirmar
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  );
}

export default CustomEditor;
