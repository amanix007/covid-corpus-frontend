import React from "react";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from 'components/ListSingle';
import DkTextbox from "components/DkTextbox";
import Loading from 'components/Loading';
import DkDropdown from 'components/DkDropdown';
import {IconButton, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Box} from "@material-ui/core";
import DkTextarea from "components/DkTextarea";
import {Row, Label} from "reactstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import ValidationError from "components/ValidationError";
import {useAppState} from "components/AppState";
import { Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

import {otherResearchFieldSubcategory, projectOtherResourceService, resourceLabelService} from "services";
import {ccToast} from "helpers/CommonFunctions";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const ProjectTypeNonBiomedical = ({selectedItem, otherResearchFieldCategoryId}) => {
    let history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);
    const [newLabel, setNewLabel] = React.useState('');

    const toggle = () => setIsOpen(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [resourceLabels, setResourceLabels] = React.useState([]);
    const [otherResearchFieldSubcategories, setOtherResearchFieldSubcategories] = React.useState(null);

    React.useEffect(() => {
        resourceLabelService.getActive().then(data => {
            setResourceLabels(data)
        });
    }, []);

    React.useEffect(() => {
        console.log('otherResearchFieldSubcategories', otherResearchFieldSubcategories);
    }, [otherResearchFieldSubcategories]);

    React.useEffect(() => {
        if (otherResearchFieldCategoryId)
            otherResearchFieldSubcategory.get(otherResearchFieldCategoryId).then(data => {
                data.push({id: 0, name: 'Others'})
                setOtherResearchFieldSubcategories(data);
                setIsLoading(false);
            });
        else {
            setOtherResearchFieldSubcategories(null);
            setIsLoading(false);
        }
    }, [otherResearchFieldCategoryId]);

    return (
        <React.Fragment>
            {isLoading && <Loading/>}
            {!isLoading && otherResearchFieldSubcategories && (

                <Formik
                    initialValues={{
                        otherResearchFieldList:
                            (selectedItem && selectedItem.fields
                                && otherResearchFieldSubcategories.filter(x => {
                                    return selectedItem.fields.some(t => t.id === x.id);
                                })
                            ) || [],
                        title: (selectedItem && selectedItem.title) || "",
                        resourceLabelId: (selectedItem && selectedItem.resource_type_id) || "",
                        resource_type: (selectedItem && selectedItem.resource_type) || {id: 0, name: ''},
                        summary: (selectedItem && selectedItem.summary) || "",
                        link: (selectedItem && selectedItem.link) || "",
                        tags: (selectedItem && selectedItem.tags) || [],
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required("Title is required"),
                        summary: Yup.string().required("About The Resource is required"),
                        tags: Yup.array().min(1,"Minimum one Keyword is required"),
                    })}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // same shape as initial values
                        console.log('Other NonBio submit', values);
                        setIsLoading(true);
                        if (!selectedItem) {
                            projectOtherResourceService.createNonBiomedical({
                                title: values.title,
                                fieldTypeId: otherResearchFieldCategoryId,
                                fields: values.otherResearchFieldList && values.otherResearchFieldList.map(x => {
                                    return {id: x.id}
                                }),
                                resourceLabelId: values.resourceLabelId,
                                resource_type: values.resource_type,
                                summary: values.summary,
                                link: values.link,
                                tags: values.tags && values.tags.map(x => {
                                    return {name: x.name}
                                }),
                            })
                                .then(data => {
                                    ccToast("Successfully completed!", "success")
                                    history.push("/Home");
                                })
                                .catch(error => {
                                    ccToast("Something went wrong!", "danger")
                                    console.log('ERROR: projectotherResearchFieldService.create', error);
                                });
                        } else {
                            projectOtherResourceService.updateNonBiomedical({
                                id: selectedItem.id,
                                title: values.title,
                                fieldTypeId: otherResearchFieldCategoryId,
                                fields: values.otherResearchFieldList && values.otherResearchFieldList.map(x => {
                                    return {id: x.id}
                                }),
                                resourceLabelId: values.resourceLabelId,
                                resource_type: values.resource_type,
                                summary: values.summary,
                                link: values.link,
                                tags: values.tags && values.tags.map(x => {
                                    return {name: x.name}
                                }),
                            })
                                .then(data => {
                                    ccToast("Successfully updated!", "success")
                                    history.push("/Home");
                                })
                                .catch(error => {
                                    ccToast("Something went wrong!", "danger")
                                    console.log('ERROR: projectotherResearchFieldService.create', error);
                                });
                        }
                        ;
                    }}
                >
                    {({setFieldValue, errors, touched, values}) => (
                        <Form>
                            <Row>
                                <div className="form-group col-sm-12">
                                    <Box mt={3} mb={2}>
                                        <Typography variant="h6">Essential Information</Typography>
                                    </Box>
                                </div>

                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Title"
                                                value={values.title}
                                                propName="title"
                                                errors={errors.title}
                                                touched={touched.title}
                                                setFieldValue={setFieldValue}
                                                required
                                                infoId="project-other-resource-title"
                                            />
                                        </Box>
                                    </div>
                                </div>
                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextarea
                                                title="About The Resource"
                                                value={values.summary}
                                                propName="summary"
                                                errors={errors.summary}
                                                touched={touched.summary}
                                                setFieldValue={setFieldValue}
                                                setInfoId="project-activity-summary"
                                                required
                                                rows={4}
                                            />
                                        </Box>
                                    </div>
                                </div>

                                <div className="form-group col-12">
                                    <AutosuggestMulti title="Keywords"
                                                      required
                                                      max={3}
                                                      list={values.tags}
                                                      suggestions={[]}
                                                      refreshSuggestions={() => {
                                                      }}
                                                      placeholder="Keywords..."
                                                      addToList={(value) => {
                                                          if (!value) return;
                                                          setFieldValue('tags', [...values.tags, {
                                                              id: value,
                                                              name: value
                                                          }]);
                                                      }}
                                                      name="tags"
                                                      errors={errors.tags}
                                                      />

                                    <ListSingle list={values.tags} setList={(data) => setFieldValue('tags', data)}/>
                                </div>


                                <div className="form-group col-sm-12">
                                    <Box mt={3} mb={2}>
                                        <Typography variant="h6">Optional Information</Typography>
                                    </Box>
                                </div>
                                {otherResearchFieldSubcategories && (
                                    <>
                                        <div className="form-group col-12">
                                            <div className="fieldTitle">
                                                Other Research Fields
                                            </div>
                                            <Typeahead
                                                id="otherResearchFieldList"
                                                multiple={true}
                                                onChange={(e) => setFieldValue('otherResearchFieldList', e)}
                                                options={otherResearchFieldSubcategories}
                                                labelKey="name"
                                                autoComplete="off"
                                                placeholder="Other Research Fields..."
                                                selected={values.otherResearchFieldList}
                                            />
                                            {errors.countries && touched.countries ? (
                                                <ValidationError message={errors.countries}/>
                                            ) : null}
                                        </div>
                                    </>
                                )}

                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Link To Resource"
                                                value={values.link}
                                                propName="link"
                                                errors={errors.link}
                                                touched={touched.link}
                                                setFieldValue={setFieldValue}
                                                infoId="project-other-resource-link"
                                            />
                                        </Box>
                                    </div>
                                </div>


                               
                                {resourceLabels && (
                                    <React.Fragment>
                                        <div className="form-group col-sm-12">

                                            <Box display="flex" flexGrow={1}>
                                                <DkDropdown
                                                    title="Resource Labels"
                                                    onChange={(e) => {
                                                        for (let item of resourceLabels) {
                                                            if (item.resource_label_id === e.target.value) {
                                                                setFieldValue('resource_type', {
                                                                    id: item.resource_label_id,
                                                                    name: item.name
                                                                })
                                                            }
                                                        }
                                                    }}
                                                    errors={errors.resourceLabelId}
                                                    touched={errors.resourceLabelId}
                                                    selectedValue={values.resourceLabelId}
                                                    list={resourceLabels.map(x => {
                                                        return ({value: x.resource_label_id, name: x.name})
                                                    })}
                                                />
                                                <IconButton
                                                    aria-label="add"
                                                    size="small"
                                                    color="primary"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsOpen(true);
                                                    }}
                                                >
                                                    <AddIcon/>
                                                </IconButton>
                                            </Box>
                                        </div>
                                        <LabelAdder
                                            toggle={toggle}
                                            isOpen={isOpen}
                                            setNewLabel={setNewLabel}
                                            newLabel={newLabel}
                                            resourceLabels={resourceLabels}
                                            setResourceLabels={setResourceLabels}
                                            setFieldValue={setFieldValue}/>

                                    </React.Fragment>
                                )}

                            </Row>
                            <Row>
                                <div className="form-group col-sm-12">
                                    <button type="submit" className="dk-btn dk-btn-blue pull-right">
                                        Submit
                                    </button>
                                </div>
                            </Row>
                            <FormikErrorHandleFocus/>
                        </Form>
                    )}
                </Formik>
            )}
        </React.Fragment>
    );
};

const LabelAdder = ({
                        isOpen,
                        newLabel,
                        setNewLabel,
                        setResourceLabels,
                        resourceLabels,
                        toggle,
                        setFieldValue
                    }) => {
    const save = () => {
        setFieldValue('resource_type', {id: -1, name: newLabel})
        setFieldValue('resourceLabelId', -1)
        setResourceLabels([...resourceLabels, {id: -1, name: newLabel}])
        toggle()
    };
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
            <ModalHeader toggle={toggle} className="dk-modal-header">Add New Resource Label</ModalHeader>
            <ModalBody>
                <div className="form-group col-sm-12">
                    <div className="inline-form">
                        <Box display="flex" flexGrow={1}>
                            <DkTextbox
                                title="Resource Label"
                                onChange={(e) => setNewLabel(e.target.value)}
                                value={newLabel}
                                infoId="project-other-resource-link"
                            />
                        </Box>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="dk-btn dk-btn-blue" onClick={save}>
                    Save
                </button>
                <button className="dk-btn dk-btn-blue" onClick={toggle}>
                    Cancel
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default ProjectTypeNonBiomedical;
