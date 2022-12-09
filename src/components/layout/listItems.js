import React from 'react';
import { ListItemButton, ListItemText, ListSubheader, ListItemIcon } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HouseIcon from '@mui/icons-material/House';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { logOut } from '../../services/slices/authSlice'
import { useDispatch } from 'react-redux'


export const MainListItems = () => {
  return (
    <>
      <Link to={'/reservations'} style={{ textDecoration: 'none' }}>
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
  )
};


export const SecondaryListItems = () => {
  const dispatch = useDispatch()

  return (
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
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <ListItemButton onClick={() => dispatch(logOut())}>
          <ListItemIcon>
            <LogoutOutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
      </Link>

    </>
  )
};