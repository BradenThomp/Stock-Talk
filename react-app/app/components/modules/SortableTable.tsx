import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from "@material-ui/core";

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
  readonly rows: any;
}

export interface Column{
  key: any;
  label: any;
}

export default function SortableTable(props: Props){
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
                <TableCell key={column.key}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <TableRow hover>
                  {props.columns.map((column: Column) => {
                    const value = row[column.key];
                    return(
                      <TableCell key={column.key}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
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