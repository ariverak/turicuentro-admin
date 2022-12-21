import { Box, Button, Grid, Modal } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import React from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #eee',
  boxShadow: 24,
  p: 4,
};
const DeleteModal = ({ open, onClose, description, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <Grid justifyContent="center" container>

          <HighlightOffIcon color="error" sx={{ fontSize: 64 }}  />
        </Grid>
        <Grid justifyContent="center" container marginTop={2}>
          {description}
        </Grid>
        <Grid justifyContent="space-between" container marginTop={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            Eliminar
          </Button>
        </Grid>
      </Box>
    </Modal>
  )
}

export default DeleteModal