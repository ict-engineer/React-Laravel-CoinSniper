import _ from '@lodash';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import ShareIcon from '@material-ui/icons/Share';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import MainTableHead from './MainTableHead';
import FavouriteStar from '../FavouriteStar';
import { useHistory } from "react-router-dom";
import { useCoins, useGlobal, useAuth } from 'store/hooks';
import NumberFormat from 'react-number-format';
import TablePaginationActions from 'components/TablePaginationActions'

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

function MainTable(props) {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id'
  });
  const { setUpvote, setShare } = useCoins();
  const { showType, showSubType } = useGlobal();
  const { token } = useAuth();

  useEffect(() => {
    setPage(0);
  }, [showType]);// eslint-disable-line react-hooks/exhaustive-deps

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

  const setUpvoteCoin = async (e, id) => {
    e.stopPropagation();
    if (token === null || token === '' || token === undefined) {
      history.push('/login');
      return;
    }
    await setUpvote({ coin_id: id }, showType, showSubType);
  }

  const handleShare = async (e, item) => {
    e.stopPropagation();
    navigator.clipboard.writeText('https://apeinsight.com/coin/00000' + item.id);
    await setShare()
  }

  const hendleRowClick = (e, id) => {
    e.preventDefault();
    history.push('/coin/00000' + id);
  }
  return (
    <div className="w-full flex flex-col overflow-auto h-full">
      <Table>
        <MainTableHead
          order={order}
          onRequestSort={handleRequestSort}
        />

        <TableBody>
          {_.orderBy(
            props.data,
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
                  onClick={e => hendleRowClick(e, n.id)}
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
                        (n.marketcap === "0" ? "---" : <NumberFormat value={n.marketcap} displayType={'text'} thousandSeparator={true} prefix={'$'} />)
                    }
                  </StyledTableCell>

                  <StyledTableCell component="td" scope="row">
                    {
                      n.presale ? <NumberFormat value={Math.ceil((new Date(n.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                        (n.price_usd === "0" ? '---' : <NumberFormat value={parseFloat(n.price_usd)} displayType={'text'} thousandSeparator={true} prefix={'$'} />)
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
                    <div className="flex">
                      <button className={clsx(classes.upvoteBtn, 'rounded-4 uppercase')} onClick={e => setUpvoteCoin(e, n.id)}>upvote</button>
                      <button className={clsx(classes.shareBtn, 'rounded-4 uppercase flex items-center')}
                        onClick={e => handleShare(e, n)}
                      >share<ShareIcon style={{ color: "white", fontSize: '0.7rem' }}></ShareIcon></button>
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
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </div >
  );
}

export default withRouter(MainTable);
