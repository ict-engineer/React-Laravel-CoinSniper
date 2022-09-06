import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MainTable from '../MainTable'
import { useAuth, useCoins, useGlobal } from 'store/hooks'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "48.5rem",
    },
    mainHeader: {
      color: "#b49504",
      fontSize: "1.4rem",
      fontWeight: "100",
      textTransform: 'uppercase',
      marginRight: "1rem",
    }
  }),
);

const MainComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { token } = useAuth();
  const { getMainCoins, mainCoins } = useCoins();
  const { showSubType, setShowSubType, showType } = useGlobal();

  const handleShowSubTypeChange = async (range) => {
    await getMainCoins({ type: showType, subType: range });
    setShowSubType(range);
  }
  return (
    <div className={clsx(classes.root, "main-boader rounded-4 px-6 py-4 flex flex-col")}>
      <div className="flex items-center mb-8">
        <p className={classes.mainHeader}>{showType} coins</p>
        {showType === "top ranked" ?
          <>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-2 text-7 " + (showSubType === "all_time" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => { handleShowSubTypeChange('all_time'); }}
            >All Time</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-2 text-7 " + (showSubType === "24hour" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => { handleShowSubTypeChange('24hour'); }}
            >24 hour</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-2 text-7 " + (showSubType === "this_week" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => { handleShowSubTypeChange('this_week'); }}
            >this week</button>
          </> : null}
      </div>

      {
        (showType === "featured" || showType === "favourites") && (token === '' || token === null) ?
          <div className="w-full h-full flex justify-center pt-32">
            <div className="max-w-512">
              <p className="text-11 text-center">Here we show our <b>{showType}</b> coins which are updated on a <b>regular</b> basis. These are coins picked by us
                which we feel show <b>promise</b> and pass our initial <b>due deligence</b> checks.</p>
              <p className="text-11 mt-12 text-center">This information is for <b>registered users only</b>. Please create a <b>free</b> account below.</p>
              <div className="flex mt-32 justify-center">
                <button
                  className="main-boader bg-yellow-custom leading-normal text-black rounded-4 focus:outline-none w-72 py-5 mr-12 hover:bg-yellow-600"
                  onClick={e => history.push('/register')}
                >REGISTER</button>
                <button
                  className="main-boader bg-white leading-normal text-black rounded-4 focus:outline-none w-72 py-5 hover:bg-gray-300"
                  onClick={e => history.push('/login')}
                >SIGN IN</button>
              </div>
            </div>
          </div> :
          <MainTable data={mainCoins}></MainTable>
      }
    </div >
  );
};

export default MainComponent;