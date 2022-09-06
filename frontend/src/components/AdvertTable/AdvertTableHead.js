import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: "transparent",
      color: "white",
      fontSize: "1rem",
      whiteSpace: "nowrap",
      fontWeight: "medium",
      textTransform: 'uppercase',
      border: "0px solid white",
      padding: '0.5rem 0.2rem',
      ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
        padding: '0.5rem 0.5rem'
      },
    },
  }),
)(TableCell);

const rows = [
  {
    id: 'index',
    align: 'left',
    label: '#',
    sort: true,
  },
  {
    id: 'advert_url',
    align: 'center',
    label: 'Content',
    sort: false,
  },
  {
    id: 'display',
    align: 'left',
    label: 'Display',
    sort: false,
  },
];

function AdvertTableHead(props) {

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-12">
        {rows.map((row, index) => {
          return (
            <StyledTableCell
              key={index}
              align={row.align}
            >
              {row.sort ? (
                <Tooltip
                  title={"Sort By " + row.label}
                  placement='bottom-start'
                  enterDelay={300}
                >
                  <TableSortLabel
                    className="text-white"
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                <span className="pt-1">
                  {row.label}
                </span>
              )}
            </StyledTableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default AdvertTableHead;
