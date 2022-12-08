import React from 'react'
import { Typography, Link } from '@mui/material'

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://turismoelencuentro.cl/">
        Turismo el Encuentro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright