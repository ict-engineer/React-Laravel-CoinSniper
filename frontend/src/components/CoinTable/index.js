import _ from '@lodash';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import CoinTableHead from './CoinTableHead';
import { useCoins } from 'store/hooks';
import NumberFormat from 'react-number-format';
import TablePaginationActions from 'components/TablePaginationActions'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditCoinModal from 'components/EditCoinModal';

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

function CoinTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id'
  });
  const { getAllCoins, allCoins, deleteCoin } = useCoins();
  const [showEditDlg, setShowEditDlg] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const init = async () => {
      await getAllCoins();
    }

    init();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

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

  const handleEdit = async (e, n) => {
    e.preventDefault();
    setEditData(n);
    setShowEditDlg(true);
  }

  const handleDelete = async (e, n) => {
    e.preventDefault();
    await deleteCoin({ id: n.id });
  }

  return (
    <div className="w-full flex flex-col overflow-auto h-full">
      <Table>
        <CoinTableHead
          order={order}
          onRequestSort={handleRequestSort}
        />

        <TableBody>
          {_.orderBy(
            allCoins,
            [
              o => {
                if (order.id === 'marketcap' || order.id === 'price_usd')
                  return parseFloat(o[order.id]);
                else
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
                  key={index}
                >
                  <StyledTableCell component="td" scope="row">
                    {"00000" + n.id}
                  </StyledTableCell>
                  <StyledTableCell
                    className="w-40 px-4 md:px-0"
                    component="td"
                    scope="row"
                    padding="none"
                  >
                    <img
                      src={n.logo}
                      alt=""
                      style={{ height: "2.8rem", width: "2.8rem !important" }}
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
                        <NumberFormat value={n.marketcap} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    }
                  </StyledTableCell>

                  <StyledTableCell component="td" scope="row">
                    {
                      n.presale ? <NumberFormat value={Math.ceil((new Date(n.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                        <NumberFormat value={parseFloat(n.price_usd)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    }
                  </StyledTableCell>

                  <StyledTableCell component="td" scope="row">
                    {
                      n.presale ? <NumberFormat value={Math.ceil((new Date(n.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                        <NumberFormat value={Math.ceil((new Date().getTime() - new Date(n.launch_date).getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' days'} />
                    }
                  </StyledTableCell>

                  <StyledTableCell component="td" scope="row">
                    <NumberFormat value={n.total_votes} displayType={'text'} thousandSeparator={true} />
                  </StyledTableCell>
                  <StyledTableCell component="td" scope="row">
                    {n.promoted ? "YES" : "NO"}
                  </StyledTableCell>
                  <StyledTableCell component="td" scope="row">
                    {n.featured ? "YES" : "NO"}
                  </StyledTableCell>
                  <StyledTableCell component="td" scope="row">
                    <div className="flex">
                      <button onClick={e => handleEdit(e, n)}><EditIcon></EditIcon></button>
                      <button onClick={e => handleDelete(e, n)}><DeleteIcon></DeleteIcon></button>
                    </div>
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
          count={allCoins.length}
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
          ActionsComponent={TablePaginationActions}
        />
      </div>
      {showEditDlg ? <EditCoinModal setShowEditDlg={setShowEditDlg} data={editData}></EditCoinModal> : null}
    </div >
  );
}

export default withRouter(CoinTable);
