import React from "react";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import moment from 'moment';
import ValidationError from "components/ValidationError";
import CategorySelection from "components/CategorySelection";
import {Box, IconButton, Typography} from "@material-ui/core";
import DkTextbox from "components/DkTextbox";
import Loading from 'components/Loading';
import DatePicker from "react-datepicker";
import {
    Row,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from "../../components/ListSingle";
import {useAppState} from "components/AppState";
import {projectFundingOpportunityService, whoPriorityCategoryService, whoPrioritySubcategoryService} from "services";
import {toast} from 'react-toastify'
import { ccToast } from "helpers/CommonFunctions";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";


const ProjectType1x2Other = ({selectedItem, message, setStepIndicator, currentStep}) => {
    let history = useHistory();
    const [{currentUser}, dispatch] = useAppState();

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        whoPriorityCategoryService.getActive().then((data) => {
            console.log(data);
            setWhoPriorityCategories(data)
        });
    }, []);

    const [whoPriorityCategories, setWhoPriorityCategories] = React.useState([]);
    const [whoPrioritySubcategories, setWhoPrioritySubcategories] = React.useState([]);

    const getWhoPrioritySubcategories = (categoryId) => {
        if (categoryId)
            whoPrioritySubcategoryService.getActive(categoryId).then(data => setWhoPrioritySubcategories(data));
        else
            setWhoPrioritySubcategories(null);
    }

    return (
        <React.Fragment>

            {isLoading && <Loading/>}

            {!isLoading && (
                <Formik
                    initialValues={{
                        whoResearchPriorities: (selectedItem && selectedItem.who_research_priority_subcategories
                            && selectedItem.who_research_priority_subcategories.map(x => {
                                return {
                                    id: x.id,
                                    name: x.name,
                                    categoryName: x.category_name
                                }
                            })) || [],
                        fields: (selectedItem && selectedItem.fields
                            && selectedItem.fields.map(x => {
                                return {name: x.title}
                            })) || [],
                        otherMilestones: (selectedItem && selectedItem.other_milestones) || "",
                        fundingDecisionAnnounced: (selectedItem && selectedItem.funding_decision_announced
                            && moment(selectedItem.funding_decision_announced).toDate()) || "",
                        eligibility: (selectedItem && selectedItem.eligibility) || "",
                    }}
                    validationSchema={Yup.object().shape({})}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // same shape as initial values
                        console.log('x');
                        setIsLoading(true);
                        projectFundingOpportunityService.saveStep2Other({
                            id: selectedItem.id,
                            fields: values.fields && values.fields.map(x => {
                                return {title: x.name}
                            }),
                            whoResearchPriority: values.whoResearchPriorities && values.whoResearchPriorities.map(x => {
                                return {subcategory_id: x.id}
                            }),
                            otherMilestones: values.otherMilestones,
                            fundingDecisionAnnounced: values.fundingDecisionAnnounced && moment(values.fundingDecisionAnnounced).format('YYYY-MM-DD'),
                            eligibility: values.eligibility,
                        })
                            .then(data => {
                                ccToast("Successfully completed!", "success")
                                // toast.info('Successfully created!', {
                                //     position: "top-center",
                                //     autoClose: 5000,
                                //     hideProgressBar: false,
                                //     closeOnClick: true,
                                //     pauseOnHover: true,
                                //     draggable: true,
                                //     progress: undefined,
                                // });
                                console.log('projectResearchActivityService.create success', data);
                                history.push("/Home");
                            })
                            .catch(error => {
                                ccToast("Something went wrong!", "danger")
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
                                <div className="form-group col-12 mt-2">
                                    <Box mt={3} mb={2}>
                                        <Typography variant="h6">Optional Information</Typography>
                                    </Box>
                                </div>
                                <div className="form-group col-12">
                                    <AutosuggestMulti title="Other Fields"
                                                      max={3}
                                                      list={values.fields}
                                                      suggestions={[]}
                                                      refreshSuggestions={() => {
                                                      }}
                                                      placeholder="Input Other Fields"
                                                      addToList={(value) => {
                                                          if (!value) return;
                                                          setFieldValue('fields', [...values.fields, {
                                                              id: value,
                                                              name: value
                                                          }]);
                                                      }}/>

                                    <ListSingle list={values.fields} setList={(data) => setFieldValue('fields', data)}/>
                                </div>

                                <div className="form-group col-12">
                                    <CategorySelection
                                        list={values.whoResearchPriorities}
                                        name="whoResearchPriorities"
                                        title="WHO Research Priority"
                                        categoryTitle="WHO Research Priority"
                                        max="3"
                                        getSubcategories={getWhoPrioritySubcategories}
                                        categories={whoPriorityCategories}
                                        subcategories={whoPrioritySubcategories}
                                        setSubcategories={setWhoPrioritySubcategories}
                                        setFieldValue={setFieldValue}
                                    />
                                </div>

                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Other Milestones"
                                                value={values.otherMilestones}
                                                propName="otherMilestones"
                                                errors={errors.otherMilestones}
                                                touched={touched.otherMilestones}
                                                setFieldValue={setFieldValue}
                                                infoId="project-fo-otherMilestones"
                                            />
                                        </Box>
                                    </div>
                                </div>

                                <div className="form-group col-6">
                                    <div className="fieldTitle">Funding Decision To Be Announced On</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-fw fa-calendar"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <DatePicker
                                            id="fundingDecisionAnnounced"
                                            name="fundingDecisionAnnounced"
                                            showMonthDropdown
                                            showYearDropdown
                                            autoComplete="off"
                                            className={
                                                "bg-white form-control" +
                                                (errors.fundingDecisionAnnounced && touched.fundingDecisionAnnounced ? " is-invalid" : "")
                                            }
                                            selected={values.fundingDecisionAnnounced}
                                            showMonthDropdown
                                            showYearDropdown
                                            onChange={(date) => {
                                                setFieldValue("fundingDecisionAnnounced", date);
                                            }}
                                        />
                                        {errors.fundingDecisionAnnounced && touched.fundingDecisionAnnounced && (
                                            <ValidationError message={errors.fundingDecisionAnnounced}/>
                                        )}
                                    </InputGroup>
                                </div>

                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Eligiblity"
                                                value={values.eligibility}
                                                propName="eligibility"
                                                errors={errors.eligibility}
                                                touched={touched.eligibility}
                                                setFieldValue={setFieldValue}
                                                infoId="project-fo-eligibility"
                                            />
                                        </Box>
                                    </div>
                                </div>

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

            {message && <ValidationError message={message}/>}

        </React.Fragment>
    );
};

export default ProjectType1x2Other;
