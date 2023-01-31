import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Scheduler } from "react-scheduler-fix";
import CustomEditor from "./CustomEditor";
import {
  useDeleteReservationMutation,
  useLazyReservationsQuery,
} from "../../services/apis/reservationApi";
import {
  useCreatePrepaidMutation,
  useDeletePrepaidMutation,
  usePrepaidsQuery,
} from "../../services/apis/prepaidApi";
import {
  Alert,
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import FormModal from "../FormModal";
import GenericModal from "../GenericModal";
import { useForm } from "react-hook-form";
import { useConfirm } from "material-ui-confirm";
import { formatter } from "../../config/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Calendar = () => {
  const confirm = useConfirm();
  const [prepaidAmount, setPrepaidAmount] = useState(0);
  const [addPrepaidModal, setAddPrepaidModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [prepaidDate, setPrepaidDate] = useState(moment().format("YYYY-MM-DD"));
  const [listModal, setListModal] = useState({
    visible: false,
    prepaids: null,
  });

  const [fetchEvents, { data: reservations, isLoading }] =
    useLazyReservationsQuery({}, true);

  const [deleteReservation] = useDeleteReservationMutation();

  const {
    handleSubmit: handleSubmitPrepaid,
    //register: registerPrepaid,
    //reset: resetPrepaid,
    setValue: setPrepaidValue,
  } = useForm();

  const [deletePrepaid] = useDeletePrepaidMutation();
  const [createPrepaid] = useCreatePrepaidMutation();

  const { data: prepaids, refetch: refetchPrepaid } = usePrepaidsQuery(
    selectedReservation?.query,
    {
      skip: !selectedReservation?.query,
    },
    [selectedReservation?.query]
  );

  const reservationAmount = selectedReservation?.content?.amount;
  const totalAmountPrepaids = prepaids?.reduce(
    (prev, { amount }) => prev + amount,
    0
  );
  const remainingAmount = reservationAmount - totalAmountPrepaids || 0;

  const refetch = useCallback(() => {
    const element = document.querySelector('[data-testid="view-navigator"]');
    setTimeout(() => {
      element.childNodes[2].click();
    }, 100);
    setTimeout(() => {
      element.childNodes[1].click();
    }, 200);
  }, []);

  const getRemoteEvents = async (e) => {
    const _dateRange = {
      startDate: moment(e.start).format("YYYY-MM-DD"),
      endDate: moment(e.end).format("YYYY-MM-DD"),
    };
    const { data: reservations } = await fetchEvents(_dateRange);
    const events = [];
    reservations &&
      reservations.map((reservation) =>
        events.push({
          event_id: reservation.id,
          title: `Reserva - ${reservation?.cabin?.name} ${moment(
            reservation.startDate
          ).format("DD")} al  ${moment(reservation.endDate).format("DD")}`,
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate),
          color: reservation?.cabin?.color,
          reservation,
        })
      );
    return new Promise((res) => {
      setTimeout(() => {
        res(events);
      }, 500);
    });
  };

  useEffect(() => {
    if (selectedReservation?.content) {
      setPrepaidValue("amount", prepaidAmount);
      setPrepaidValue("date", prepaidDate);
      setPrepaidValue("reservationId", selectedReservation.content?.id);
    }
  }, [
    prepaidAmount,
    prepaidDate,
    selectedReservation?.content,
    setPrepaidValue,
  ]);
  const handleDeleteReservation = async (deletedId) => {
    await deleteReservation(deletedId);
    refetch();
  };

  const onSubmitPrepaid = async (data) => {
    await createPrepaid(data);
    refetchPrepaid();
    refetch();
    setAddPrepaidModal(false);
  };

  const handleDeletePrepaid = async (prepaid) => {
    try {
      await confirm({
        title: "¿Estas seguro?",
        description: `Se descontarán los ${formatter.format(
          prepaid.amount
        )} abonados en esta reserva.`,
      });
      await deletePrepaid(prepaid.id);
      refetchPrepaid();
    } catch (e) {
      console.log(e);
    }
  };

  const getReservationsByDate = useCallback(
    (date) => {
      const reservationsByDate = reservations?.filter((reservation) => {
        const startDate = moment(reservation.startDate);
        const endDate = moment(reservation.endDate);
        return date.isBetween(startDate, endDate, "day", "[]");
      });
      return reservationsByDate || [];
    },
    [reservations]
  );

  return (
    <>
      <Scheduler
        view="month"
        loading={isLoading}
        customEditor={(scheduler) => {
          return (
            <CustomEditor
              scheduler={{
                ...scheduler,
                reservations: getReservationsByDate(scheduler.date),
                refetch,
              }}
            />
          );
        }}
        week={false}

        locale={{
          code: "es",
          formatLong: {
            date: (n) => moment().format("DD/MM/YYYY"),
            time: (n) => moment().format("HH:mm"),
            dateTime: (n) => moment().format("DD/MM/YYYY HH:mm"),
          },

          localize: {
            month: (n) => moment().month(n).format("MMMM"),
            day: (n) => moment().day(n).format("ddd").toUpperCase(),
            dayPeriod: (n) => moment().format("A"),
            quarter: (n) => moment().quarter(n).format("Q"),
            era: (n) => moment().format("GGGG"),
            ordinalNumber: (n) => moment().format("Do"),
          },
        }}
        getRemoteEvents={getRemoteEvents}
        onDelete={handleDeleteReservation}
        viewerExtraComponent={(fields, event) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedReservation({
                    query: { reservationId: event.reservation.id },
                    content: event.reservation,
                  });
                  setListModal({ visible: true, prepaids });
                  setPrepaidAmount("");
                }}
              >
                Listar abonos
              </Button>
            </Box>
          );
        }}
        translations={{
          navigation: {
            today: "Hoy",
            month: "Mes",
            day: "Día",
          },
          form: {
            addTitle: "Agregar Reserva",
            editTitle: "Editar Reserva",
            confirm: "Confirmar",
            delete: "Eliminar",
            cancel: "Cancelar",
          },
          event: {
            title: "Título",
            start: "Entrada",
            end: "Salida",
            allDay: "Todo el día",
          },
          moreEvents: "Reserva más...",
        }}
      />

      <FormModal
        id="form-prepaid"
        title="Agregar abono"
        open={addPrepaidModal}
        onClose={() => {
          setAddPrepaidModal(false);
        }}
      >
        <FormControl>
          <form onSubmit={handleSubmitPrepaid(onSubmitPrepaid)}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <TextField
                type="number"
                margin="normal"
                value={prepaidAmount}
                id="amount"
                label="Monto"
                name="amount"
                onChange={(e) => {
                  if (e.target.value > remainingAmount) return;
                  setPrepaidAmount(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setPrepaidAmount(remainingAmount);
                }}
              >
                Autocompletar
              </Button>
            </Box>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              id="date"
              name="date"
              value={prepaidDate}
              label="Fecha"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setPrepaidDate(e.target.value);
              }}
            />

            <Grid justifyContent="space-between" container marginTop={3}>
              <Button
                variant="outlined"
                onClick={() => {
                  setAddPrepaidModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Aceptar
              </Button>
            </Grid>
          </form>
        </FormControl>
      </FormModal>

      <GenericModal
        open={listModal.visible}
        title="Abonos"
        onClose={() => {
          setListModal({ visible: false });
          refetch();
        }}
        actionButton={
          <Button
            endIcon={<AddCircleIcon />}
            variant="contained"
            onClick={() => {
              setAddPrepaidModal(true);
            }}
          >
            Agregar
          </Button>
        }
      >
        <List>
          {prepaids?.length > 0 ? (
            prepaids.map((prepaid) => (
              <ListItem
                key={prepaid.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleDeletePrepaid(prepaid);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "white" }}>
                    <PaymentsIcon color="success" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={formatter.format(prepaid.amount)} />
              </ListItem>
            ))
          ) : (
            <Alert severity="warning" sx={{ my: 2 }}>
              Aún no se han agregado abonos!
            </Alert>
          )}
          <>
            <Divider sx={{ my: 1 }} />
            <ListItem secondaryAction={formatter.format(totalAmountPrepaids)}>
              <ListItemText primary={"Abono total:"} />
            </ListItem>
            <ListItem secondaryAction={formatter.format(remainingAmount)}>
              <ListItemText primary={"Por pagar:"} />
            </ListItem>
          </>
        </List>
      </GenericModal>
    </>
  );
};

export default Calendar;
