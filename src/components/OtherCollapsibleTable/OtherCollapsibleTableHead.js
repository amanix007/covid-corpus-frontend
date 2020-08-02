import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";

const headCells = [
  /* { id: "id", firstOrLast: true, disablePadding: false, label: "ID" }, */
  { id: "title", firstOrLast: true, disablePadding: false, label: "Title" },
  { id: "reference_number", firstOrLast: false, disablePadding: false, label: "Reference Number" },
  { id: "fields", firstOrLast: false, disablePadding: false, label: "Research Category" },
  { id: "resource_type", firstOrLast: false, disablePadding: false, label: "Resource Type" },
    { id: "icon", firstOrLast: false, disablePadding: false, label: "" },
];

const headerStyles = makeStyles({
    tableHead: {
        fontWeight: "bold",
        backgroundColor: "#fafafa",
        color: "black",
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
      }
  });

function OtherCollapsibleTableHead(props) {
  const classes = headerStyles();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.firstOrLast ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id  ? orderBy : false}
            className={classes.tableHead}
          >
            <TableSortLabel
              active={orderBy === headCell.id }
              direction={orderBy === headCell.id  ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >

            {headCell.label}
            {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}

            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OtherCollapsibleTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default OtherCollapsibleTableHead;
