import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TodayIcon from '@material-ui/icons/Today';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function HeaderMenu(props) {
  const [headerMenu, setHeaderMenu] = useState(null);

  const headerMenuClick = event => {
    setHeaderMenu(event.currentTarget);
  };

  const headerMenuClose = () => {
    setHeaderMenu(null);
  };

  return (
    <>
      <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={headerMenuClick}>
        <div className="flex mx-2 items-center justify-center">
          <Typography component="span" className="normal-case font-bold flex" style={{ fontSize: "1.5rem" }}>
            Coins
          </Typography>
          <ArrowDropDownIcon className="text-2xl"></ArrowDropDownIcon>
        </div >
      </Button >

      <Popover
        open={Boolean(headerMenu)}
        anchorEl={headerMenu}
        onClose={headerMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        <MenuItem component={Link} to="/pages/profile" onClick={headerMenuClose} role="button">
          <ListItemIcon className="min-w-40">
            <TodayIcon></TodayIcon>
          </ListItemIcon>
          <ListItemText primary="Todays Best" />
        </MenuItem>
        <MenuItem component={Link} to="/apps/mail" onClick={headerMenuClose} role="button">
          <ListItemIcon className="min-w-40">
            <AvTimerIcon></AvTimerIcon>
          </ListItemIcon>
          <ListItemText primary="All Time Best" />
        </MenuItem>
        <MenuItem
        >
          <ListItemIcon className="min-w-40">
            <FiberNewIcon></FiberNewIcon>
          </ListItemIcon>
          <ListItemText primary="New Listings" />
        </MenuItem>
        <MenuItem
        >
          <ListItemIcon className="min-w-40">
            <AttachMoneyIcon></AttachMoneyIcon>
          </ListItemIcon>
          <ListItemText primary="By Marketcap" />
        </MenuItem>
        <MenuItem
        >
          <ListItemIcon className="min-w-40">
            <TimerIcon></TimerIcon>
          </ListItemIcon>
          <ListItemText primary="Presales" />
        </MenuItem>
      </Popover>
    </>
  );
}

export default HeaderMenu;
