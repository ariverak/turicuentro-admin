import React from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import CustomEditor from './CustomEditor'
import { useCabinsQuery } from '../../services/apis/cabinApi'

const Calendar = () => {
  // const cabinsOptions = []
  const { isLoading } = useCabinsQuery()
  return (
    <Scheduler
      view='month'
      loading={isLoading}
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      translations={{
        navigation: {
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          today: 'Hoy'
        },
        form: {},
        event: {
          title: 'Título',
          start: 'Entrada',
          end: 'Salida',
          allDay: 'Todo el día'
        }
      }}
    />
  )
}

export default Calendar
