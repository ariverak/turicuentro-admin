import { Grid } from '@mui/material'
import React from 'react'
import Calendar from '../components/Calendar'
import Layout from '../components/layout'

const Reservations = () => {
  return (
    <>
      <Layout>
        <Grid boxShadow={2} bgcolor="white">
          <Calendar />
        </Grid>
      </Layout>
    </>
  )
}

export default Reservations