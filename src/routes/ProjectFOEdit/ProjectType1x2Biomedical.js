import React from "react";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import moment from 'moment';
import ValidationError from "components/ValidationError";
import CategorySelection from "components/CategorySelection";
import {Box, Typography} from "@material-ui/core";
import DkTextbox from "components/DkTextbox";
import Loading from 'components/Loading';
import DatePicker from "react-datepicker";
import {
    Row,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import {useAppState} from "components/AppState";
import {
    projectFundingOpportunityService, whoPriorityCategoryService, whoPrioritySubcategoryService,
    hrcsResearchActivityCategory, hrcsResearchActivitySubcategory
} from "services";
import {toast} from 'react-toastify'
import { ccToast } from "helpers/CommonFunctions";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const ProjectType1x2Biomedical = ({selectedItem, message, setStepIndicator, currentStep}) => {
    let history = useHistory();
    const [{currentUser}, dispatch] = useAppState();

    const [isLoading, setIsLoading] = React.useState(false);

    const [researchActivityCategories, setResearchActivities] = React.useState([]);
    const [researchActivitySubcategories, setResearchActivitySubcategories] = React.useState([]);

    React.useEffect(() => {
        whoPriorityCategoryService.getActive().then((data) => {
            console.log(data);
            setWhoPriorityCategories(data)
        });
        hrcsResearchActivityCategory.getActive().then((data) => setResearchActivities(data));
    }, []);

    const [whoPriorityCategories, setWhoPriorityCategories] = React.useState([]);
    const [whoPrioritySubcategories, setWhoPrioritySubcategories] = React.useState([]);

    const getResearchActivitySubcategories = (categoryId) => {
        if (categoryId)
            hrcsResearchActivitySubcategory
                .getActive(categoryId)
                .then((data) => setResearchActivitySubcategories(data));
        else
            setResearchActivitySubcategories(null);
    }

    const getWhoPrioritySubcategories = (categoryId) => {
        if (categoryId)
            whoPrioritySubcategoryService.get(categoryId).then(data => {
                console.log(data);
                setWhoPrioritySubcategories(data)});
        else
            setWhoPrioritySubcategories(null);
    }

    return (
        <React.Fragment>

            {isLoading && <Loading/>}

            {!isLoading && (
                <React.Fragment>
                    <Formik
                        initialValues={{
                            researchActivities: (selectedItem && selectedItem.fields && selectedItem.fields.map(x => {
                                return {
                                    id: x.id,
                                    name: x.full_name,
                                    categoryName: x.category_full_name
                                }
                            })) || [],
                            whoResearchPriorities: (selectedItem && selectedItem.who_research_priority_subcategories
                                && selectedItem.who_research_priority_subcategories.map(x => {
                                    return {
                                        id: x.id,
                                        name: x.name,
                                        categoryName: x.category_name
                                    }
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
                            console.log('Submited:', values);
                            setIsLoading(true);
                            projectFundingOpportunityService.saveStep2Biomedical({
                                id: selectedItem.id,
                                fields: values.researchActivities && values.researchActivities.map(x => {
                                    return {id: x.id}
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
                                    setIsLoading(false);
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
                                    {console.log('values', values)}
                                    <div className="form-group col-12 mt-2">
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

                                    <div className="form-group col-sm-12 mt-2">
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
                </React.Fragment>
            )}

            {message && <ValidationError message={message}/>}
        </React.Fragment>
    );
};

export default ProjectType1x2Biomedical;
