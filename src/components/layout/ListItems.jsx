import React from 'react';
import { ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HouseIcon from '@mui/icons-material/House';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutOutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { logOut } from '../../services/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";

const ListItems = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
        <ListItemButton onClick={()=> {navigate('/reservations')}} selected={location.pathname === '/reservations'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Reservas" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/cabins')} selected={location.pathname === '/cabins'}>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <ListItemText primary="Cabañas" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/customers')} selected={location.pathname === '/customers'}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/settings')} selected={location.pathname === '/settings'}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuraciones" />
        </ListItemButton>
      <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={() => dispatch(logOut())}>
          <ListItemIcon>
            <LogoutOutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
    </>
  )
};

export default ListItems