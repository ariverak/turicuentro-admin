import { Box, Modal, Typography } from '@mui/material'
import { useEffect } from 'react'

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
const FormModal = ({ open, onClose,title, defaultValues, reset=() => {}, setValue, children }) => {
  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      })
    } else reset();
  }, [defaultValues, reset, setValue]);
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}

export default FormModal