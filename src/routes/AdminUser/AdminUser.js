import React from "react";
import { useAppState } from 'components/AppState';
import Loading from 'components/Loading';
import AdminMenu from "components/AdminMenu/AdminMenu";
import { Formik, Form, Field } from "formik";
import ValidationError from "components/ValidationError";
import * as Yup from "yup";
import Paging from 'components/Paging';
import DkTextbox from 'components/DkTextbox';
import DkRadioButtons from 'components/DkRadioButtons';
import { rbUserStatus, rbYesNo } from 'const';
import { userService } from "services";
import AssignCategory from "./AssignCategory";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


import { DialogContent, DialogActions } from "@material-ui/core";
import { ccToast } from "helpers/CommonFunctions";


const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  status: Yup.string().required("Status is required"),
  isAdmin: Yup.string().required("Is Admin is required"),
  isEditor: Yup.string().required("Is Editor is required")
});

const AdminUser = (props) => {

  let { match: {
    params: { userType }
  } } = props;
  const [{ currentUser }, dispatch] = useAppState();

  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState(null);
  let [users, setUsers] = React.useState([]);
  const [editEnable, setEditEnable] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);


  const [assignEnable, setassignEnable] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [showUserType, setshowUserType] = React.useState("editor");

  React.useEffect(() => {
    userService.get()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    setIsLoading(true);


    userService.getById(id).then((item) => {
      setSelectedItem(item);
      setEditEnable(true);
      setIsLoading(false);
    });
  };
  const handleAssign = (user) => {
    setUser(user);
    setassignEnable(true)
  };

  const handleNew = (e) => {
    e.preventDefault();
    setEditEnable(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setMessage(null);
    setSelectedItem(null);
    setEditEnable(false);
  };

  users = users.filter((user) => user.roles.includes(userType))

  const handleDelete = (u) => {
    setSelectedItem(u.id);
    setOpen(true)
  }

  const [open, setOpen] = React.useState(false);


  const deleteUser = async () => {
    await setOpen(false);
    let id = selectedItem;
    userService.deleteUser({ id }).then((res) => {
      console.log('res:', res)
      ccToast("Delete Successful", "success")

    }).catch((error) => {
      ccToast(error, "danger")

    });
    console.log('selectedItem:', selectedItem)


  }
  const handleClose = (value) => {
    setOpen(false);
  };


  return (
    <main id="sj-main" className="sj-main sj-haslayout">
      <div className="sj-content">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-5 col-lg-3">
              <AdminMenu
                showUserType={showUserType}
                setshowUserType={setshowUserType}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-9 table-responsive">
              <div className="dk-page-title">User Administration</div>
              {/* {!editEnable && (
                <div>
                  <button className="dk-btn dk-btn-blue pull-right mb-3" onClick={handleNew}>
                    New
                  </button>
                </div>
              )} */}
              {isLoading && (
                <Loading />
              )}
              {!isLoading && (
                <React.Fragment>
                  {(!users || users.length === 0) && !editEnable && "No Users yet"}
                  {users && !editEnable && !assignEnable && (
                    <React.Fragment>
                      <table className="table table-striped mt-3">
                        <thead>
                          <tr>
                            <th>Surname</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((x) => {
                            return (
                              <tr key={x.id}>
                                <td>{x.surname}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td className="text-center">{x.isAdmin && 'Admin'} {x.isEditor && 'Editor'} </td>
                                <td className="text-center">{x.status}</td>
                                <td className="text-right">
                                  {x.roles.includes("editor") && <button style={{ marginRight: 4 }} onClick={(e) => handleAssign(x)} className="list-link">Assign</button>}
                                  <button onClick={(e) => handleEdit(x.id)} className="list-link">Edit</button>
                                  <button style={{ marginLeft: 4 }} onClick={(e) => handleDelete(x)} className="list-link">Delete</button>

                                </td>
                              </tr>
                            );
                          })}

                          <SimpleDialog open={open}
                            delete={deleteUser}
                            onClose={handleClose} />
                        </tbody>
                      </table>
                      {/* <div className="mt-3">
                        <Paging pageId={pageId} totalNumber={13} recordsPerPage={10} setPageId={setPageId} />
                      </div> */}
                    </React.Fragment>
                  )}

                  {console.log('selectedItem:', (selectedItem && selectedItem.roles && selectedItem.roles.find(x => x == "admin") && 1) || 0)}
                  {editEnable && (
                    <React.Fragment>
                      <Formik
                        initialValues={{
                          name: (selectedItem && selectedItem.name) || "",
                          surname: (selectedItem && selectedItem.surname) || "",
                          email: (selectedItem && selectedItem.email) || "",
                          status: (selectedItem && selectedItem.status) || "",
                          isAdmin: (selectedItem && selectedItem.roles && selectedItem.roles.find(x => x == "admin") && "1") || "0",
                          isEditor: (selectedItem && selectedItem.roles && selectedItem.roles.find(x => x == "editor") && "1") || "0",
                        }}
                        validationSchema={ValidationSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(values, actions) => {
                          console.log('x1111111111111111111111111', selectedItem, values);
                          if (currentUser.user && currentUser.user.isAdmin) {
                            userService.updateAsAdmin({
                              id: selectedItem.id,
                              status: values.status,
                              isAdmin: values.isAdmin == "1",
                              isEditor: values.isEditor == "1"
                            })
                              .then(res => {
                                actions.setSubmitting(false);
                                ccToast("Updated successfully", "success")
                              })
                              .catch(error => {
                                setMessage(error.message);
                                ccToast("Updated failed", "error")
                              })
                              .finally(() => actions.setSubmitting(false));
                          }
                          else if (currentUser.user && currentUser.user.isEditor) {
                            userService.updateAsEditor({
                              id: selectedItem.id,
                              isEditor: values.isEditor == "1"
                            })
                              .then(res => {
                                actions.setSubmitting(false);
                                ccToast("Updated successfully", "success")
                              })
                              .catch(error => {
                                setMessage(error.message);
                                ccToast("Updated failed", "error")
                              })
                              .finally(() => actions.setSubmitting(false));
                          }

                        }}
                      >
                        {({ setFieldValue, errors, touched, values, isSubmitting }) => (
                          <Form>
                            {console.log('values', values)}
                            <DkTextbox title="Name" required value={values.name} propName="name" infoId="user-admin-name" readonly
                              errors={errors.name} touched={touched.name} setFieldValue={setFieldValue} />

                            <DkTextbox title="Surname" required value={values.surname} propName="surname" infoId="user-admin-surname" readonly
                              errors={errors.surname} touched={touched.surname} setFieldValue={setFieldValue} />

                            <DkTextbox title="Email" required value={values.email} propName="email" readonly
                              errors={errors.email} touched={touched.email} setFieldValue={setFieldValue} />

                            <DkRadioButtons
                              disabled={!currentUser.user.isAdmin}
                              title="Status"
                              rbName="status"
                              options={rbUserStatus}
                              setFieldValue={setFieldValue}
                              errors={errors.status}
                              touched={touched.status}
                              selectedValue={values.status}
                            />

                            <DkRadioButtons
                              disabled={!currentUser.user.isAdmin}
                              title="Is Admin"
                              rbName="isAdmin"
                              options={rbYesNo}
                              setFieldValue={setFieldValue}
                              errors={errors.isAdmin}
                              touched={touched.isAdmin}
                              selectedValue={(values.isAdmin)}
                            />

                            <DkRadioButtons
                              title="Is Editor"
                              rbName="isEditor"
                              options={rbYesNo}
                              setFieldValue={setFieldValue}
                              errors={errors.isEditor}
                              touched={touched.isEditor}
                              selectedValue={values.isEditor}
                            />
                            {console.log("aaaaaaaaaaaaaaaaaaaaaaaaa" + values.isEditor)}
                            {message && <div className="form-group"><ValidationError message={message} /></div>}

                            <div className="form-group mt-4">
                              <button type="submit" className="dk-btn dk-btn-blue pull-left" disabled={isSubmitting}>
                                {(selectedItem && "Update") || "Submit"}
                              </button>
                              <button href="#" className="dk-btn dk-btn-link pull-left ml-3" disabled={isSubmitting} onClick={handleCancel}>
                                Cancel
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </React.Fragment>


                  )}
                  {assignEnable && <AssignCategory
                    cancel={() => setassignEnable(false)}

                    user={user} />}

                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminUser;








function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };



  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
      open={open}>
      <DialogTitle id="simple-dialog-title">Are  you sure ?</DialogTitle>


      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.delete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}