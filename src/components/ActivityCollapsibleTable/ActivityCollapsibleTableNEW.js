import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import CollapsibleTableHead from "./ActivityCollapsibleTableHead";
import SubTableRow from "./ActivitySubTableRow";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        boxShadow: "unset"
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function ActivityCollapsibleTableNEW(props) {
    /* console.log("CollapsibleTable ==> rows", rows); */
    const { rows } = props;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("id");
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        props.setPage_size(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        // setPage(newPage);
        props.setPage(newPage + 1);
    };

    /* const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage); */

    var currentPage = stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
            return { row };
        });

    //bug fix for pagging if exist filtered data, but the data is not on current page
    if (currentPage.length === 0 && rows.length > 0) {
        setPage(0);
        setRowsPerPage(rows.length);
    }

    return (
        <div className={classes.root}>
            {(rows && rows.length && (
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table className={classes.table} aria-label="collapsible table">
                            <CollapsibleTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        console.log('index:', index)
                                        return <SubTableRow key={row.id} row={row} />;
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    {console.log('props.page_size:', props.page_size)}
                    <TablePagination
                        rowsPerPageOptions={[25, 50, 75, 100]}
                        component="div"
                        count={props.meta.total}
                        rowsPerPage={props.page_size}
                        // page={props.SearchType !== "Relative" ? props.page + 1 : props.page}
                        page={props.page - 1}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            )) || (
                    <tr>
                        <td colSpan={6}>No Results Found!</td>
                    </tr>
                )}
        </div>
    );
}
