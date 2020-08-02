import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  isOpen: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    color: "#030303",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
    "& > td": {
      color: "#030303",
    },
    "& .MuiChip-root": {
      color: "#030303",
    },
  },
  isOpenCollapsible: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  des:{
    color: '#4E4E4E',
    fontSize: '16px',
    lineHeight: 2
  }
}));

const FundingSubTableRow = (props) => {
  /* console.log("SubTableRow row ==> ", row);*/
  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        className={`${classes.root} ${(open && classes.isOpen) || ""}`}
      >
        <TableCell align="left">{row.funding_call_name}</TableCell>
        <TableCell align="center">{row.reference_number}</TableCell>
        <TableCell align="center">
          {row.who_research_priority_subcategories.map((data) => {
            return (
              <div style={{ padding: 3 }}>
                <Chip
                  className={classes.chip}
                  variant="outlined"
                  size="small"
                  label={
                    data.name.length <= 20
                      ? data.name
                      : data.name.substring(0, 20) + "..."
                  }
                  title={data.name}
                />
              </div>
            );
          })}
        </TableCell>

        <TableCell align="center">
          {row &&
            row.fields &&
            row.fields.map((data) => {
              return (
                <div style={{ padding: 3 }}>
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={
                      (data && data.category_full_name
                        ? (data.category_full_name.length <= 20) ? data.category_full_name : data.category_full_name.substring(0, 20) + "..."
                        : '')
                    }
                    title={data.category_full_name}
                  />
                </div>
              );
            })}
        </TableCell>
        <TableCell align="center">{row.opening_date}</TableCell>
        <TableCell align="center">{row.deadline}</TableCell>
        <TableCell align="center">{row.fields[0].category_name}</TableCell>
        <TableCell align='center' >
        <Button color="primary" variant="contained"
          style={{
            color: "#FFF",
            backgroundColor: "#23B0DE",
          }}
          ><i className="fa fa-chevron-down"></i></Button>
          {/* <NavigateNextIcon/> */}
        </TableCell>
      </TableRow>
      <TableRow className={classes.isOpenCollapsible}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                <Box textAlign="justify" p={2}>
                  <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                    About the Fund
                  </Box>
                  <hr/>
                  <p className={classes.des}>{row.summary}</p>

                  <Box textAlign="right">
                    <NavLink
                      to={"/Reports/Funding/FundingReportDetails/" + row.id}
                    >
                      <Button
                        variant="contained"
                        style={{
                          color: "#FFF",
                          backgroundColor: "#636c77",
                          backgroundImage: 'linear-gradient(to right, #41c7b9 , #23b0e0)'
                        }}>
                        More
                      </Button>
                    </NavLink>
                  </Box>
                </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default FundingSubTableRow;
