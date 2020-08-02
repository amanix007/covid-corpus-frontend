import React from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";

import ValidationError from "components/ValidationError";
import CategorySelection from "components/CategorySelection";
import DkDropdown from 'components/DkDropdown';
import ListSingle from 'components/ListSingle';
import {Box, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Loading from 'components/Loading';
import {Alert, Row, Label} from "reactstrap";
import {
    whoPriorityCategoryService, whoPrioritySubcategoryService, whoImmediateResearchActionService,
    projectResearchActivityService
} from "services";
import {toast} from 'react-toastify'
import { ccToast } from "helpers/CommonFunctions";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const ProjectType1x2 = ({selectedItem, message, setStepIndicator, setSelectedItem, currentStep}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    let history = useHistory();

    const [whoImmediateResearchActions, setWhoImmediateResearchActions] = React.useState(null);
    const [categories, setCategories] = React.useState(null);
    const [subcategories, setSubcategories] = React.useState(null);

    React.useEffect(() => {
        whoPriorityCategoryService.getActive().then((data) => {
            data.push({id: -1, name: 'Others'});
            setCategories(data)
        });
        whoImmediateResearchActionService.getActive().then((data) => {
            data.push({id: -1, name: 'Others'});

            setWhoImmediateResearchActions(data);
        });
    }, []);

    React.useEffect(() => {
        if (whoImmediateResearchActions && categories)
            setIsLoading(false);
    }, [whoImmediateResearchActions, categories]);

    const getWhoResearchPrioritySubcategories = (categoryId) => {
        if (categoryId) {
            if (categoryId === -1) {
                setSubcategories([{id: -2, name: 'Others'}])
            } else if (categoryId === -2) {
                setSubcategories(null)
            } else {
                whoPrioritySubcategoryService.getActive(categoryId).then(data => {
                    data.push({id: -1, name: 'Others'});
                    setSubcategories(data)
                });
            }
        } else
            setSubcategories(null);
    };

    return (
        <React.Fragment>
            <Box mt={2} mb={2}>
                <Typography variant="h6">WHO Covid-19 Research Classification (Optional)</Typography>
            </Box>

            {isLoading && <Loading/>}

            {!isLoading && (
                <Formik
                    initialValues={{
                        primaryList: (
                            selectedItem
                            && selectedItem.primary_who_research_priority_subcategories
                            && selectedItem.primary_who_research_priority_subcategories.map(x => {
                                return {
                                    id: x.id,
                                    name: x.name,
                                    categoryName: x.category_name
                                }
                            })) || [],
                        secondaryList: (
                            selectedItem
                            && selectedItem.secondary_who_research_priority_subcategories
                            && selectedItem.secondary_who_research_priority_subcategories.map(x => {
                                return {
                                    id: x.id,
                                    name: x.name,
                                    categoryName: x.category_name
                                }
                            })) || [],
                        whoImmediateResearchActions: (selectedItem && selectedItem.who_immediate_research_actions) || [],
                    }}
                    // validationSchema={ValidationSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // same shape as initial values
                        setIsLoading(true);
                        projectResearchActivityService.saveStep2({
                            id: selectedItem.id,
                            primaryWhoResearchPriority: values.primaryList.map(x => {
                                return {subcategory_id: x.id}
                            }),
                            secondaryWhoResearchPriority: values.secondaryList.map(x => {
                                return {subcategory_id: x.id}
                            }),
                            whoImmediateResearchAction: values.whoImmediateResearchActions.map(x => {
                                return {action_id: x.id}
                            }),
                        })
                            .then(data => {
                                setSelectedItem(data);
                                setIsLoading(false);
                                // toast.info('Successfully created!', {
                                //     position: "top-center",
                                //     autoClose: 5000,
                                //     hideProgressBar: false,
                                //     closeOnClick: true,
                                //     pauseOnHover: true,
                                //     draggable: true,
                                //     progress: undefined,
                                // });
                                ccToast("Successfully completed!", "success")
                                history.push("/Home");

                            })
                            .catch(error => {
                                ccToast('Something went wrong!', "error")
                                // toast.error('Something went wrong!', {
                                //     position: "top-center",
                                //     autoClose: 5000,
                                //     hideProgressBar: false,
                                //     closeOnClick: true,
                                //     pauseOnHover: true,
                                //     draggable: true,
                                //     progress: undefined,
                                // });
                                console.log('ERROR: projectResearchActivityService.create', error);
                            });
                    }}
                >
                    {({setFieldValue, errors, touched, values}) => (
                        <Form>

                            <Row>

                                <div className="form-group col-12">
                                    <h4>WHO Research Priorities</h4>
                                    <CategorySelection
                                        list={values.primaryList}
                                        name="primaryList"
                                        title="Primary"
                                        categoryTitle="WHO Research Priority"
                                        max="3"
                                        getSubcategories={getWhoResearchPrioritySubcategories}
                                        categories={categories}
                                        subcategories={subcategories}
                                        setSubcategories={setSubcategories}
                                        setFieldValue={setFieldValue}
                                    />
                                </div>

                                <div className="form-group col-12">
                                    <CategorySelection
                                        list={values.secondaryList}
                                        name="secondaryList"
                                        title="Secondary"
                                        categoryTitle="WHO Research Priority"
                                        max="4"
                                        getSubcategories={getWhoResearchPrioritySubcategories}
                                        categories={categories}
                                        subcategories={subcategories}
                                        setSubcategories={setSubcategories}
                                        setFieldValue={setFieldValue}
                                    />
                                </div>

                                {whoImmediateResearchActions && (
                                    <React.Fragment>
                                        <div className="form-group col-12 mt-2">
                                            <h4>WHO Immediate Research Actions</h4>
                                            <DkDropdown
                                                title=""
                                                propName="whoImmediateResearchActions"
                                                errors={errors.whoImmediateResearchActions}
                                                touched={errors.whoImmediateResearchActions}
                                                list={whoImmediateResearchActions.map(x => {
                                                    return ({value: x.id, name: x.name})
                                                })}
                                                disabled={values.whoImmediateResearchActions && values.whoImmediateResearchActions.length >= 3}
                                                onChange={(e) => {
                                                    if (e.target.value === "-1")
                                                        return;
                                                    const x = whoImmediateResearchActions.find(f => f.id === e.target.value);
                                                    setFieldValue("whoImmediateResearchActions", [...values.whoImmediateResearchActions, x]);
                                                    e.target.value = "-1";
                                                }}
                                            />
                                            <ListSingle list={values.whoImmediateResearchActions}
                                                        setList={(e) => setFieldValue('whoImmediateResearchActions', e)}/>
                                        </div>

                                    </React.Fragment>
                                )}

                                {message && <ValidationError message={message}/>}

                            </Row>
                            <Row>
                                <div className="form-group col-sm-12">
                                    <button type="button" className="dk-btn dk-btn-blue" onClick={(e) => {
                                        e.preventDefault();
                                        setStepIndicator(currentStep - 1);
                                    }}>
                                        Back
                                    </button>
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

export default ProjectType1x2;
