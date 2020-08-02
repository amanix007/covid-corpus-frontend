import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";

const headCells = [
  /* { id: "id", firstOrLast: true, disablePadding: false, label: "ID" }, */
  { id: "project_title", firstOrLast: true, disablePadding: false, label: "Project Title" },
  { id: "reference_number", firstOrLast: false, disablePadding: false, label: "Reference Number" },
  { id: "research_project_information", firstOrLast: false, disablePadding: false, label: "Category" },
  // { id: "primary_who_research_priority_subcategories", firstOrLast: false, disablePadding: false, label: "Category" },
  // { id: "secondary_who_research_priority_subcategories", firstOrLast: false, disablePadding: false, label: "Sub-Category" },
  // { id: "countries", firstOrLast: false, disablePadding: false, label: "Countries" },
  { id: "start_end_date", firstOrLast: false, disablePadding: false, label: "Start/End Date" },
  { id: "status", firstOrLast: true, disablePadding: false, label: "Project Status" },
  { id: "open_to_collaborators", firstOrLast: false, disablePadding: false, label: "Open To Collaborators" },
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

function ActivityCollapsibleTableHead(props) {
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
            sortDirection={orderBy === headCell.id  ? order : false}
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

ActivityCollapsibleTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default ActivityCollapsibleTableHead;
