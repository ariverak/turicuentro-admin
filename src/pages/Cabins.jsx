import React from 'react'
import Layout from '../components/layout'
import { useCabinsQuery } from '../services/apis/cabinApi'

const Cabins = () => {
  const { data: cabins } = useCabinsQuery()
  console.log(cabins)
  return (
    <>
      <Layout>
        <div>CABAÑAS</div>
      </Layout>
    </>
  )
}

export default Cabins