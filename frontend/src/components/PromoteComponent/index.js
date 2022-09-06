import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PromoteTable from '../PromoteTable'

const useStyles = makeStyles(theme =>
  createStyles({
    promoteRoot: {
      backgroundColor: "#091016",
    },
    promoteHeader: {
      color: "#b49504",
      fontSize: "1.4rem",
      fontWeight: "100",
      textTransform: 'uppercase',
    }
  }),
);

const PromoteComponent = (props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.promoteRoot, "main-boader rounded-4 px-6 pt-4 pb-12")}>
      <p className={classes.promoteHeader}>Promoted</p>
      <PromoteTable data={props.data}></PromoteTable>
    </div>
  );
};

export default PromoteComponent;