import React, { useMemo, useState } from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import CustomEditor from './CustomEditor'
import { useCabinsQuery } from '../../services/apis/cabinApi'
import { useCreateReservationMutation, useDeleteReservationMutation, useReservationsQuery } from '../../services/apis/reservationApi'
import moment from 'moment'
import { Box } from '@mui/material'

const Calendar = () => {
  // const cabinsOptions = []
  const { isLoading } = useCabinsQuery()
  const [dates, setDates] = useState(null)
  const { data: reservations, refetch: refetchReservations } = useReservationsQuery(dates, {
    skip: !dates
  })
  const getRemoteEvents = (e) => {
    setDates({
      startDate: moment(e.start).format('YYYY-MM-DD'),
      endDate: moment(e.end).format('YYYY-MM-DD')
    })
  }

  const formattedEvents = useMemo(() => {
    const events = []
    console.log(reservations)
    reservations?.map((reservation) => (
      // events.push({
      //   event_id: 1,
      //   title: `Reserva`,
      //   start: new Date(moment(reservation.startDate).format('YYYY-M-D HH:mm')),
      //   end: new Date(moment(reservation.endDate).format('YYYY-M-D HH:mm')),
      //   color: reservation.cabin.color
      // })
      events.push({
        event_id: 1,
        title: "Event 1",
        start: new Date("2022/12/2"),
        end: new Date("2021/12/10"),
      })
    ))
    return events
  }, [reservations]);

  const [createReservation, { isLoading: isLoadingCreate }] = useCreateReservationMutation();

  const handleConfirm = async (data) => {
    const { cabin, customer, comments, dates, tinaja } = data
    const reservation = { cabinId:cabin, customerId:customer, startDate: dates[0], endDate: dates[1], tinaja, comments }
    console.log(reservation)
    createReservation(reservation)
    refetchReservations()
  }

  const [deleteReservation, { isLoading: isLoadingDelete }] = useDeleteReservationMutation();

  const handleDelete = async (deletedId) => {
    deleteReservation(deletedId)
    refetchReservations()
  }
  
  return (
      <Scheduler
        view='month'
        customEditor={(scheduler) => <CustomEditor scheduler={{ ...scheduler, handleConfirm }} />}
        getRemoteEvents={getRemoteEvents}
        loading={isLoading}
        events={formattedEvents}
        translations={{
          navigation: {
            month: 'Mes'
          },
          form: {
            addTitle: "Agregar Reserva",
            editTitle: "Editar Reserva",
            confirm: "Confirmar",
            delete: "Eliminar",
            cancel: "Cancelar"
          },
          event: {
            title: 'Título',
            start: 'Entrada',
            end: 'Salida',
            allDay: 'Todo el día'
          }
        }}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />
  )
}

export default Calendar
