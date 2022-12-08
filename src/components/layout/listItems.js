import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HouseIcon from '@mui/icons-material/House';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
export const mainListItems = (
  <>
    <Link to={'/'} style={{ textDecoration: 'none'}}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Reservas" />
      </ListItemButton>
    </Link>
    <Link to={'/cabins'} style={{ textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
        <ListItemText primary="Cabañas" />
    </ListItemButton>
      </Link>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Configuraciones" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Otras opciones
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Mi perfil" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutOutIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar sesión" />
    </ListItemButton>

  </>
);