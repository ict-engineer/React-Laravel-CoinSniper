import _ from '@lodash';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import AdvertTableHead from './AdvertTableHead';
import { useGlobal } from 'store/hooks'

const StyledTableCell = withStyles((theme) =>
  createStyles({
    body: {
      color: "white",
      border: "0px solid white",
      whiteSpace: "nowrap",
      padding: '0.5rem 0.2rem',
      verticalAlign: 'top',
      ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
        padding: '0.5rem 0.5rem'
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
  upvoteBtn: {
    backgroundColor: "#ad541a",
    color: "white",
    fontSize: '0.6rem',
    padding: '0.3rem',
    marginRight: '0.4rem'
  },
  shareBtn: {
    backgroundColor: "#afafaf",
    color: "white",
    fontSize: '0.6rem',
    padding: '0.3rem',
  }
}));

function AdvertTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id'
  });
  const { changeAdvertDisplay } = useGlobal();

  function handleChangePage(event, value) {
    setPage(value);
  }

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

  const handleDisplayChange = async (e, n) => {
    await changeAdvertDisplay({ state: e.target.value, id: n.id });
  }

  return (
    <div className="w-full flex flex-col overflow-auto h-full">
      <Table>
        <AdvertTableHead
          order={order}
          onRequestSort={handleRequestSort}
        />

        <TableBody>
          {_.orderBy(
            props.data,
            [
              o => {
                return o[order.id];
              }
            ],
            [order.direction]
          ).slice(page * 10, page * 10 + 10)
            .map((n, index) => {
              return (
                <TableRow
                  style={index % 2 === 0 ? { background: "#0d212d" } : { background: "transparent" }}
                  classes={{ hover: classes.hover }}
                  className={clsx("h-36 cursor-pointer", classes.tableRow)}
                  hover
                  tabIndex={-1}
                  key={n.index}
                >
                  <StyledTableCell component="td" scope="row">
                    {n.index}
                  </StyledTableCell>
                  <StyledTableCell
                    component="td"
                    scope="row"
                    padding="none">
                    <img src={n.advert_url} alt="" className="mx-auto"></img>
                  </StyledTableCell>
                  <StyledTableCell component="td" scope="row">
                    <select
                      style={{ backgroundColor: "#0b1621" }}
                      className="w-full py-5 px-6 form-select rounded focus:outline-none focus:border-blue-500"
                      value={n.display}
                      onChange={e => handleDisplayChange(e, n)}
                    >
                      <option value="Main Page">Main Page</option>
                      <option value="Information Page">Information Page</option>
                      <option value="None">None</option>
                    </select>
                  </StyledTableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-auto">
        <TablePagination
          style={{ color: "white" }}
          className="flex-shrink-0 text-base"
          component="div"
          count={props.data.length}
          rowsPerPage={10}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          rowsPerPageOptions={[]}
          onChangePage={handleChangePage}
        />
      </div>
    </div >
  );
}

export default withRouter(AdvertTable);
