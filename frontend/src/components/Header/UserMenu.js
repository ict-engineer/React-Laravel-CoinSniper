import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
import React from 'react';
// import { Link } from 'react-router-dom';
import { useUser, useAuth } from '../../store/hooks'
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import StarIcon from '@material-ui/icons/Star';
import { useHistory } from "react-router-dom";

function UserMenu(props) {
  const history = useHistory();
  const { user } = useUser();
  const { token, logOut } = useAuth();

  // const [userMenu, setUserMenu] = useState(null);

  // const userMenuClick = event => {
  //   setUserMenu(event.currentTarget);
  // };

  // const userMenuClose = () => {
  //   setUserMenu(null);
  // };
  const handleLogout = async () => {
    // setUserMenu(null);
    const result = await logOut();
    if (result)
      history.push('/home');
  }

  return (
    <>
      {token === "" ? (
        <>
          <button className="primary-btn rounded-full px-12 py-6" onClick={e => history.push('/login')}>
            LOGIN
          </button >
          <button className="primary-btn rounded-full px-12 py-6 ml-4" onClick={e => history.push('/register')}>
            REGISTER
          </button >
        </>
      ) :
        (<>
          <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={handleLogout}>
            <div className="flex mx-2 items-center">
              <p component="span" className="normal-case flex text-xs">
                {user.full_name !== null && user.full_name !== undefined ? user.full_name.split(" ")[0] : ""}|SignOut
              </p>
            </div >
          </Button >

          {/* <Popover
            open={Boolean(userMenu)}
            anchorEl={userMenu}
            onClose={userMenuClose}
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
            <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <StarIcon></StarIcon>
              </ListItemIcon>
              <ListItemText primary="Watchlist" />
            </MenuItem>
            <MenuItem onClick={handleLogout}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Popover> */}
        </>)
      }
    </>
  );
}

export default UserMenu;
