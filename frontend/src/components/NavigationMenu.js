import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';  

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import handleToken from '../store/utils/handleToken';

import { useDispatch } from 'react-redux';
import { getUserInfo } from '../store/slices/users';

export default function BasicMenu() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    handleToken.removeToken();
    navigate('/');
    window.location.reload();
  }

  const handleProfileNavigation = () => {
    navigate('/profile');
    handleClose()
  }

  return (
    <div>
      <Button onClick={() => navigate('/')}>Home</Button>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfileNavigation}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Outlet />
    </div>
  );
}
