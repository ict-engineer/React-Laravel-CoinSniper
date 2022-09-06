import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { useHistory } from "react-router-dom";
import { useAuth, useCoins, useGlobal } from 'store/hooks';

const useStyles = makeStyles(theme =>
  createStyles({
    activeStar: {
      color: "#f1c40f",
    },
    unactiveStar: {
      color: "#f5f5f5",
    },
  }),
);

const FavouriteStar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useAuth();
  const { setFavourite } = useCoins();
  const { showType } = useGlobal();

  const handleClick = async (e) => {
    e.stopPropagation();
    if (token === '' || token === null || token === undefined) {
      history.push('/login');
      return;
    }

    if (props.data !== undefined) {
      let state = props.data.favourite;
      state = !state;
      await setFavourite({ coin_id: props.data.id, state: state }, showType);
    }
  }

  return (
    <>
      <StarIcon
        className={(props.data !== undefined && props.data.favourite) ? classes.activeStar : classes.unactiveStar}
        onClick={e => handleClick(e)}
      ></StarIcon>
    </>
  );
};

export default FavouriteStar;