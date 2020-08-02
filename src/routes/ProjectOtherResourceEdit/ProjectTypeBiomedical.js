import React from "react";
import {useHistory} from 'react-router-dom';
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from 'components/ListSingle';
import DkTextbox from "components/DkTextbox";
import DkTextarea from "components/DkTextarea";
import CategorySelection from "components/CategorySelection";
import Loading from 'components/Loading';
import DkDropdown from 'components/DkDropdown';
import {IconButton, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Box} from "@material-ui/core";
import {Row, Label} from "reactstrap";
import {useAppState} from "components/AppState";
import {toast} from 'react-toastify'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

import {
    hrcsResearchActivityCategory, hrcsResearchActivitySubcategory, whoPrioritySubcategoryService,
    projectOtherResourceService, whoPriorityCategoryService, resourceLabelService
} from "services";
import {ccToast} from "helpers/CommonFunctions";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const ProjectTypeBiomedical = ({selectedItem, message, toggleModalInfo, setSelectedItem}) => {
    let history = useHistory();
    const [{currentUser}, dispatch] = useAppState();
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(false);

    const [newLabel, setNewLabel] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [resourceLabels, setResourceLabels] = React.useState([]);
    const [researchActivityCategories, setResearchActivities] = React.useState([]);
    const [researchActivitySubcategories, setResearchActivitySubcategories] = React.useState([]);

    React.useEffect(() => {
        hrcsResearchActivityCategory.getActive().then((data) => {
            setResearchActivities(data)
        });
        resourceLabelService.getActive().then(data => setResourceLabels(data));
    }, []);

    const getResearchActivitySubcategories = (categoryId) => {
        if (categoryId)
            hrcsResearchActivitySubcategory
                .getActive(categoryId)
                .then((data) => setResearchActivitySubcategories(data));
        else
            setResearchActivitySubcategories(null);
    }


    return (
        <React.Fragment>

            {isLoading && <Loading/>}

            {!isLoading && (
                <Formik
                    initialValues={{
                        researchActivities: (selectedItem && selectedItem.fields && selectedItem.fields.map(x => {
                            return {
                                id: x.id,
                                name: x.full_name,
                                categoryName: x.category_full_name
                            }
                        })) || [],
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
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        console.log(values);
                        setIsLoading(true);
                        if (!selectedItem) {
                            projectOtherResourceService.createBiomedical({
                                title: values.title,
                                fields: values.researchActivities && values.researchActivities.map(x => {
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
                                    console.log('ERROR: projectresearchPriorityService.create', error);
                                });
                        } else {
                            projectOtherResourceService.updateBiomedical({
                                id: selectedItem.id,
                                title: values.title,
                                fields: values.researchActivities && values.researchActivities.map(x => {
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
                                    console.log('ERROR: projectresearchPriorityService.create', error);
                                });
                        };
                    }}
                >
                    {({setFieldValue, errors, touched, values}) => (
                        <Form>
                            {console.log('values', values)}
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
                                <div className="form-group col-sm-12 mt-2">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextarea
                                                title="About The Resource"
                                                placeholder="About The Resource..."
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
                                <div className="form-group col-12">
                                    <CategorySelection
                                        list={values.researchActivities}
                                        name="researchActivities"
                                        title="Research Category"
                                        categoryTitle="Research Category"
                                        max="3"
                                        getSubcategories={getResearchActivitySubcategories}
                                        categories={researchActivityCategories}
                                        subcategories={researchActivitySubcategories}
                                        setSubcategories={setResearchActivitySubcategories}
                                        setFieldValue={setFieldValue}
                                    />
                                </div>


                             
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

                                            <Box display="flex" flexGrow={1} style={{alignSelf: 'center'}}>
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
                                                <IconButton style={{alignSelf: 'center'}}
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
export default ProjectTypeBiomedical;
