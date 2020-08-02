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
import EmailIcon from "@material-ui/icons/Email";

import * as Yup from "yup";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form, Field } from "formik";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Loading from "components/Loading";
import ValidationError from "components/ValidationError";
import { userService } from "services";
import { ccToast } from "helpers/CommonFunctions";
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
  link: {
    textAlign: 'left',
    fontSize: '20px',
  },
  contact: {
    color: '#23B0DE!important',
    cursor: "pointer",
    textDecoration: "underline",
    marginRight: '5px'
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
  status: {
    color: '#33C327'
  },
  des: {
    color: '#4E4E4E',
    fontSize: '16px',
    lineHeight: 2
  }
}));

const LoginSchema = Yup.object().shape({
  sender_name: Yup.string().required("Sender name is required"),
  sender_email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  email_body: Yup.string().required("Description is required"),

});


const ActivitySubTableRow = (props) => {
  /* console.log("SubTableRow row ==> ", row);*/
  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };


  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${(open && classes.isOpen) || ""}`}
        onClick={() => setOpen(!open)}
      >
        {/* <TableCell align="left">{row.id}</TableCell> */}
        <TableCell align="left">{row.project_title}</TableCell>
        <TableCell align="left">{row.reference_number}</TableCell>
        <TableCell align="left">
          {row &&
            row.research_project_information &&
            row.research_project_information.fields.map((data) => {
              return (
                <div style={{ padding: 3 }}>
                  {data.category_full_name && <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={
                      data.category_full_name.length <= 20
                        ? data.category_full_name
                        : data.category_full_name.substring(0, 20) + "..."
                    }
                    title={data.category_full_name}
                  />}

                </div>
              );
            })}
        </TableCell>
        {/* <TableCell align="left">{row.project_title}</TableCell>
        <TableCell align="left">{row.reference_number}</TableCell>
        <TableCell align="left">
          {row &&
            row.primary_who_research_priority_subcategories &&
            row.primary_who_research_priority_subcategories.map((data) => {
              return (
                <div style={{ padding: 3 }}>
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={
                      data.category_name.length <= 20
                        ? data.category_name
                        : data.category_name.substring(0, 20) + "..."
                    }
                    title={data.category_name}
                  />
                </div>
              );
            })}
        </TableCell> */}
        {/*<TableCell align="center">*/}
        {/*  {row &&*/}
        {/*    row.secondary_who_research_priority_subcategories &&*/}
        {/*    row.secondary_who_research_priority_subcategories.map((data) => {*/}
        {/*      return (*/}
        {/*        <div style={{ padding: 3 }}>*/}
        {/*          <Chip*/}
        {/*            className={classes.chip}*/}
        {/*            variant="outlined"*/}
        {/*            size="small"*/}
        {/*            label={*/}
        {/*              data.category_name.length <= 20*/}
        {/*                ? data.category_name*/}
        {/*                : data.category_name.substring(0, 20) + "..."*/}
        {/*            }*/}
        {/*            title={data.category_name}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*</TableCell>*/}
        <TableCell align="center">
          <div style={{ padding: 3 }}>
            {row.start_date && <Chip
              className={classes.chip}
              variant="outlined"
              size="small"
              label={"Start: " + row.start_date}
            />}

          </div>
          <div style={{ padding: 3 }}>
            {row.end_date && <Chip
              className={classes.chip}
              variant="outlined"
              size="small"
              label={"End: " + row.end_date}
            />}
          </div>
        </TableCell>
        <TableCell align="center" className={classes.status}>{row.status}</TableCell>
        <TableCell align="center">
          {row.open_to_collaborators === 1 ? "Yes" : "No"}
        </TableCell>
        <TableCell align='center' >
          <Button color="primary" variant="contained"
            style={{
              color: "#FFF",
              backgroundColor: "#23B0DE",
            }}
          ><i className="fa fa-chevron-down"></i></Button>
          {/* <NavigateNextIcon /> */}
        </TableCell>
      </TableRow>

      {/* ####################### -- Expanded -- ####################### */}

      <TableRow className={classes.isOpenCollapsible}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Box textAlign="justify" mb={2} p={2}>
                    <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                      Research Abstract
                    </Box>
                    <hr />
                    <p className={classes.des}>
                      {row.research_project_information &&
                        row.research_project_information.summary &&
                        row.research_project_information.summary}
                    </p>

                    <Box textAlign="right">
                      <NavLink
                        to={"/Reports/Activity/ActivityReportDetails/" + row.id}
                      >
                        <Button
                          variant="contained"
                          style={{
                            color: "#FFF",
                            backgroundColor: "#23B0DE",
                          }}>
                          More
                      </Button>
                      </NavLink>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <div className={classes.link}>


                      <a className={classes.contact + " dk-btn dk-btn-blue"}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClickOpen(e)
                        }}
                      >
                        <span className={"white-color text-decoration-none"}>Contact Lead Principal Investigator</span>
                      </a>

                    </div>

                    <Dialog
                      open={openModal}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Contact With Lead Principal Investigator "}</DialogTitle>
                      <DialogContent>
                        {row.lead_principal_investigator_email ?
                          <div className="col-12 col-sm-12 col-md-12">

                            {!loading && (
                              <Formik
                                initialValues={{
                                  sender_name: "",
                                  sender_email: "",
                                  subject: "",
                                  email_body: "",
                                  investigator_email: "",
                                }}
                                validationSchema={LoginSchema}
                                validateOnChange={false}
                                validateOnBlur={false}
                                onSubmit={(values, actions) => {
                                  actions.setSubmitting(true);
                                  // setLoading(true)
                                  setMessage(null);
                                  values.investigator_email = row.lead_principal_investigator_email;
                                  userService.send_email_to_lead_principal_investigator(values)
                                    .then(res => {
                                      console.log('resddd:', res)

                                      ccToast("Success", "success")

                                      // setLoading(false)
                                      actions.setSubmitting(false);

                                    })
                                    .catch(error => {

                                      ccToast("Email Sending Failed", "danger")
                                      setLoading(false)
                                      actions.setSubmitting(false);

                                    })
                                    .finally(() => actions.setSubmitting(false));
                                }}
                              >
                                {({ errors, touched, isSubmitting }) => (
                                  <Form>
                                    <div className="form-group">

                                      <label>Sender Name</label>
                                      <Field name="sender_name" type="text" className="form-control" placeholder="Sender Name" />
                                      {errors.sender_name && touched.sender_name ? <ValidationError message={errors.sender_name} /> : null}
                                    </div>
                                    <div className="form-group">
                                      <label>Sender Email</label>
                                      <Field name="sender_email" type="email" className="form-control" placeholder="Sender Email" />
                                      {errors.sender_email && touched.sender_email ? <ValidationError message={errors.sender_email} /> : null}
                                    </div>


                                    <div className="form-group">
                                      <label>Email Subject</label>
                                      <Field name="subject" type="text" className="form-control" placeholder="Subject" />
                                      {errors.subject && touched.subject ? <ValidationError message={errors.subject} /> : null}
                                    </div>
                                    <div className="form-group">
                                      <label>Email Body</label>
                                      <Field name="email_body" as={"textarea"} type="text" className="form-control" placeholder="Email Body" />
                                      {errors.email_body && touched.email_body ? <ValidationError message={errors.email_body} /> : null}
                                    </div>



                                    {message && (
                                      <ValidationError message={message} />
                                    )}

                                    <div className="mb-3 mt-3">
                                      <button type="submit" className="dk-btn dk-btn-blue mr-2" disabled={isSubmitting}
                                      >Send
{" "}
                                        {loading && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
                                      </button>

                                      <button type="submit" className="dk-btn dk-btn-blue"
                                        onClick={handleClose}
                                      >Close</button>
                                    </div>



                                  </Form>
                                )}
                              </Formik>
                            )}
                            {loading && (
                              <React.Fragment>Logging you in, please wait... <Loading /> </React.Fragment>
                            )}

                          </div>
                          : <h4 style={{ color: "red" }}>Lead Investigators Contact Info Not Found.</h4>
                        }




                      </DialogContent>


                    </Dialog>

                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ActivitySubTableRow;
