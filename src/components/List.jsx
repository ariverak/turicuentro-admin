import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatter } from '../config/constants';

const List = ({ prepaids }) => {
  return (
      <List>
        {prepaids && prepaids.map((prepaid) => (
          <ListItem
            secondaryAction={
              <>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={formatter.format(prepaid.amount)}
            />
          </ListItem>
        ))}
      </List>
  )
}

export default List