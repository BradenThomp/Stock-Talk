import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TableSortLabel } from "@material-ui/core";
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

interface Props{
  readonly columns: Column[];
  readonly rows: LinkableRow[];
  readonly order: any,
  readonly setOrder: any,
  readonly orderBy: any,
  readonly setOrderBy: any,
}

export interface Column{
  key: any;
  label: any;
}

export interface LinkableRow{
  link: any;
  data: any;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order:'asc'|'desc', orderBy) {
  return order === 'desc'
    ? (a:LinkableRow, b:LinkableRow) => descendingComparator(a.data, b.data, orderBy)
    : (a:LinkableRow, b:LinkableRow) => -descendingComparator(a.data, b.data, orderBy);
}

function stableSort(rows: LinkableRow[], comparator) {
  const stabilizedThis = rows.map((row, index) => [row, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map((row) => row[0]);
}

export default function SortableTableWithLinks(props: Props){
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const createSortHandler = (property) => (event) => {
    const isAsc = props.orderBy === property && props.order === 'asc';
    props.setOrder(isAsc ? 'desc' : 'asc');
    props.setOrderBy(property);
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return(
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {props.columns.map((column: Column) => (
                <TableCell key={column.key} sortDirection={props.orderBy === column.key ? props.order : false}>
                  <TableSortLabel active={props.orderBy === column.key} direction={props.orderBy === column.key ? props.order : 'asc'} onClick={createSortHandler(column.key)}>
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(props.rows, getComparator(props.order, props.orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <Link href={row.link} passHref>
                  <TableRow hover>
                      {props.columns.map((column: Column) => {
                        const value = row.data[column.key];
                        return(
                          <TableCell key={column.key}>
                            {value}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </Link>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}