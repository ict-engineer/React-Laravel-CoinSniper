import _ from '@lodash';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import PromoteTableHead from './PromoteTableHead';
import FavouriteStar from '../FavouriteStar';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) =>
  createStyles({
    body: {
      color: "white",
      border: "0px solid white",
      whiteSpace: "nowrap",
      padding: '0.1rem 0.2rem',
      ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
        padding: '0.1rem 0.5rem'
      },
    },
  }),
)(TableCell);

const useStyles = makeStyles(theme => ({
  hover: {
    "&:hover": {
      backgroundColor: "#456b6a !important",
    },
  },
}));

function PromoteTable(props) {
  const classes = useStyles();
  const history = useHistory();

  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id'
  });

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id
    });
  }

  const hendleRowClick = (e, id) => {
    e.preventDefault();
    history.push('/coin/00000' + id);
  }

  return (
    <div className="w-full flex flex-col overflow-auto">
      <Table>
        <PromoteTableHead
          order={order}
          onRequestSort={handleRequestSort}
        />

        <TableBody>
          {_.orderBy(
            props.data,
            [
              o => {
                if (order.id === 'marketcap')
                  return parseFloat(o[order.id]);
                else
                  return o[order.id];
              }
            ],
            [order.direction]
          ).map(n => {
            return (
              <TableRow
                classes={{ hover: classes.hover }}
                className={clsx("h-16 cursor-pointer", classes.tableRow)}
                onClick={e => hendleRowClick(e, n.id)}
                hover
                tabIndex={-1}
                key={n.index}
              >
                <StyledTableCell component="td" scope="row">
                  {n.index}
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <FavouriteStar data={n}></FavouriteStar>
                </StyledTableCell>
                <StyledTableCell
                  className="w-32 px-4 md:px-0"
                  component="td"
                  scope="row"
                  padding="none"
                >
                  <img
                    src={n.logo}
                    alt=""
                    style={{ height: "1.5rem" }}
                  />
                </StyledTableCell>

                <StyledTableCell component="td" scope="row">
                  {n.name}
                </StyledTableCell>

                <StyledTableCell component="td" scope="row">
                  {n.symbol}
                </StyledTableCell>

                <StyledTableCell component="td" scope="row">
                  {
                    n.presale ? <NumberFormat value={Math.ceil((new Date(n.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                      (n.marketcap === "0" ? '---' : <NumberFormat value={n.marketcap} displayType={'text'} thousandSeparator={true} prefix={'$'} />)
                  }
                </StyledTableCell>

                <StyledTableCell component="td" scope="row">
                  {
                    n.presale ? <NumberFormat value={Math.ceil((new Date(n.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                      <NumberFormat value={Math.ceil((new Date().getTime() - new Date(n.launch_date).getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' days'} />
                  }
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div >
  );
}

export default withRouter(PromoteTable);
