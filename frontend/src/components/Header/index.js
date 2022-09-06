import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import UserMenu from './UserMenu';
import Icon from '@material-ui/core/Icon';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCoins } from 'store/hooks';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      backgroundColor: "#0b1621",
      height: "4rem",
    },
    searchInput: {
      backgroundColor: "#1f2634",
      color: "white",
      padding: "0.5rem 0.5rem 0.5rem 40px",
      fontSize: "1rem",
      borderRadius: "0.3rem",
      width: "18rem"
    },
    noOptions: {
      color: "white",
    },
    option: {
      // Hover  
      '&[data-focus="true"]': {
        backgroundColor: '#1f2634',
      },
    },
  }),
);

function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const { searchCoins, getSearchCoins } = useCoins();
  const [searchStr, setSearchStr] = useState('');

  const onHandleChange = async (e) => {
    setSearchStr(e.target.value);
    await getSearchCoins({ searchStr: e.target.value });
  }

  return (
    <AppBar
      id="fuse-toolbar"
      elevation={2}
      className={clsx(classes.appBar, `flex relative z-10 justify-center`)}
    >
      <div className="flex relative justify-center">
        <div className="flex items-center w-full overflow-auto" style={{ maxWidth: "1440px", padding: "0px 1.5rem" }}>

          <div className="hidden sm:block">
            <a className="mr-12 md:mr-24 flex items-center cursor-pointer border-b-0 hover:border-b-0" href="/">
              <img className="md:block hidden" src="/assets/images/Capture2.PNG" alt="" style={{ height: "40px", width: "284px", minWidth: "284px" }}></img>
              <img className="md:hidden" src="/assets/images/logo.png" alt="" style={{ height: "40px", width: "40px", minWidth: "40px" }}></img>
            </a>
          </div>

          {/* <HeaderMenu /> */}
          <Autocomplete
            className="mr-auto"
            classes={{
              noOptions: classes.noOptions,
              option: classes.option,
            }}
            noOptionsText={'No results...'}
            id="custom-input-demo"
            options={searchCoins}
            getOptionLabel={(option) => option.name}
            PaperComponent={({ children }) => (
              <div style={{ background: "#456b6a" }} className="rounded mt-4">{children}</div>
            )}
            renderOption={option => {
              return (
                <div className="flex align-center p-4 w-full" onClick={e => { history.push('/coin/00000' + option.id) }}>
                  <img alt="" src={option.logo} style={{ width: "2.5rem", height: "2.5rem", minWidth: "2.5rem", minHeight: "2.5rem" }} /> {/*Mock image, attribute in option*/}
                  <div className="ml-8">
                    <p className="text-white font-bold">{option.name}</p>
                    <p className="text-white">{option.symbol}</p>
                  </div>
                </div>
              );
            }}
            renderInput={(params) => (
              <div className="flex mr-auto relative" ref={params.InputProps.ref}>
                <Icon className="absolute mt-4 ml-4 ">search</Icon>
                <input
                  {...params.inputProps}
                  placeholder="Search Coins....."
                  name="searchText"
                  autoComplete="off"
                  value={searchStr}
                  onChange={e => onHandleChange(e)}
                  className={clsx(classes.searchInput, 'focus:outline-none')}
                />
              </div>
            )}
          />

          <button className="rounded-full flex justify-center items-center bg-blue-400 w-28 h-28 ml-12 mr-6 min-w-28 min-h-28">
            <TwitterIcon></TwitterIcon>
          </button>
          <button className="rounded-full flex justify-center items-center bg-blue-400 w-28 h-28 mr-20 md:mr-60 min-w-28 min-h-28">
            <TelegramIcon></TelegramIcon>
          </button>

          {/* <button className="text-xs flex justify-center items-center ml-12 mr-20">
            Advertise
          </button> */}

          <UserMenu />

        </div>
      </div>

    </AppBar >
  );
}

export default React.memo(Header);
