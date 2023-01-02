import { Box, Button, Grid, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #eee',
  boxShadow: 24,
  pt: 2,
  pb: 4,
  px: 4,
};
const GenericModal = ({ open, onClose, title, actionButton = false, onConfirm = false, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}

    >
      <Box sx={style}>
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {title}
          </Typography>
          {actionButton &&
            actionButton
          }

        </Box>

        {children}

        {onConfirm &&
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
              color="primary"
              onClick={onConfirm}
            >
              Aceptar
            </Button>
          </Grid>
        }
      </Box>
    </Modal>
  )
}

export default GenericModal