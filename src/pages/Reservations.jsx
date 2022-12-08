import React from 'react'
import Calendar from '../components/Calendar'
import Layout from '../components/layout'
import Title from '../components/Title'

const Reservations = () => {
  return (
    <>
      <Title>Reservas</Title>
      <Layout>
        <Calendar />
      </Layout>
    </>
  )
}

export default Reservations