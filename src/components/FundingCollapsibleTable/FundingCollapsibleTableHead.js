import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";

const headCells = [
  /* { id: "id", firstOrLast: true, disablePadding: false, label: "ID" }, */
  { id: "funding_call_name", firstOrLast: true, disablePadding: false, label: "Funding Call Name" },
  { id: "reference_number", firstOrLast: false, tadisablePadding: false, label: "Reference Number" },
  { id: "research_project_information", firstOrLast: false, disablePadding: false, label: "Categories" },
  // { id: "research_project_information", firstOrLast: false, disablePadding: false, label: "WHO Research Priorities" },
  { id: "category_full_name", firstOrLast: false, disablePadding: false, label: "Research Category" },
  { id: "opening_date", firstOrLast: false, disablePadding: false, label: "Opening Date" },
  { id: "deadline", firstOrLast: false, disablePadding: false, label: "Deadline" },
  { id: "funding_type", firstOrLast: false, disablePadding: false, label: "Funding type" },
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

function FundingCollapsibleTableHead(props) {
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

FundingCollapsibleTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default FundingCollapsibleTableHead;
