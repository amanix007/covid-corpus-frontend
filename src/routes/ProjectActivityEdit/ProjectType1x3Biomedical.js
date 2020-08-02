import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import CategorySelection from "components/CategorySelection";
import { Row } from "reactstrap";
import DkTextbox from "components/DkTextbox";
import Loading from 'components/Loading';
import DkTextarea from "components/DkTextarea";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from "components/ListSingle";
import { Box, Typography } from "@material-ui/core";
import { hrcsResearchActivityCategory, hrcsResearchActivitySubcategory, projectResearchActivityService } from "services";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const prevStep = 1;

const ProjectType1x3Biomedical = ({ selectedItem, message, setStepIndicator, setSelectedItem, currentStep }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const [researchActivityCategories, setResearchActivities] = React.useState([]);
    const [researchActivitySubcategories, setResearchActivitySubcategories] = React.useState([]);

    React.useEffect(() => {
        hrcsResearchActivityCategory.getActive().then((data) => setResearchActivities(data));
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

            {isLoading && <Loading />}

            {!isLoading && (
                <React.Fragment>
                    <Formik
                        initialValues={{
                            researchActivities: (selectedItem && selectedItem.research_project_information
                                && selectedItem.research_project_information.fields.map(x => {
                                    return {
                                        id: x.id,
                                        name: x.full_name,
                                        categoryName: x.category_full_name
                                    }
                                })) || [],
                            researchQuestion:
                                (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.research_questions
                                    && selectedItem.research_project_information.research_questions.map(x => {
                                        return { name: x.content }
                                    })) || [],
                            studyDesignMethods:
                                (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.study_design) || "",
                            population: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.population) || "",
                            intervention: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.intervention) || "",
                            comparator: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.comparator) || "",
                            outcome: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.outcome) || "",
                            summary: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.summary) || "",
                            otherTags: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.tags) || [],
                            fileContent: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.fileContent) || null,
                            hyperlink: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.link) || "",
                        }}

                        validationSchema={Yup.object().shape({
                            summary: Yup.string().required("Research Abstract is required"),
                            otherTags: Yup.array().min(1, "Minimum one Keyword is required"),
                            researchActivities: Yup.array().min(1, "At least 1 Research Category is required"),
                        })}
                        validateOnChange={true}
                        validateOnBlur={false}
                        onSubmit={(values) => {
                            // same shape as initial values
                            setIsLoading(true);
                            projectResearchActivityService.saveStep3Biomedical({
                                id: selectedItem.id,
                                fields: values.researchActivities && values.researchActivities.map(x => {
                                    return { id: x.id }
                                }),
                                researchQuestions: values.researchQuestion && values.researchQuestion.map(x => {
                                    return { content: x.name }
                                }),
                                studyDesign: values.studyDesignMethods,
                                tags: values.otherTags && values.otherTags.map(x => {
                                    return { name: x.name }
                                }),
                                population: values.population,
                                intervention: values.intervention,
                                comparator: values.comparator,
                                outcome: values.outcome,
                                summary: values.summary,
                                attachment: null,
                                link: values.hyperlink,
                                status: 'A'
                            })
                                .then(data => {
                                    console.log('projectResearchActivityService.create success', data);
                                    setIsLoading(false);
                                    setSelectedItem(data);
                                    setStepIndicator(currentStep + 1);
                                })
                                .catch(error => {
                                    console.log('ERROR: projectResearchActivityService.create', error);
                                });
                        }}
                    >
                        {({ setFieldValue, errors, touched, values }) => (
                            <Form>
                                {console.log('values', values)}
                                <Row>
                                    <div className="form-group col-12 mt-3">
                                        <Typography variant="h6">Essential Information</Typography>
                                    </div>

                                    <div className="form-group col-12">
                                        <CategorySelection
                                            list={values.researchActivities}
                                            name="researchActivities"
                                            title="Research Category"
                                            categoryTitle="Research Category"
                                            max="3"
                                            required
                                            getSubcategories={getResearchActivitySubcategories}
                                            categories={researchActivityCategories}
                                            subcategories={researchActivitySubcategories}
                                            setSubcategories={setResearchActivitySubcategories}
                                            setFieldValue={setFieldValue}
                                            errors={errors.researchActivities} 
                                        />
                                    </div>

                                    <div className="form-group col-12 mt-2">
                                        <DkTextarea
                                            title="Research Abstract"
                                            value={values.summary}
                                            propName="summary"
                                            errors={errors.summary}
                                            touched={touched.summary}
                                            setFieldValue={setFieldValue}
                                            setInfoId="project-activity-summary"
                                            required
                                            rows={4}
                                        />
                                    </div>


                                    <div className="form-group col-12">
                                        <AutosuggestMulti title="Keywords"
                                            required
                                            max={3}
                                            list={values.otherTags}
                                            suggestions={[]}
                                            refreshSuggestions={() => {
                                            }}
                                            placeholder="Keywords..."
                                            addToList={(value) => {
                                                if (!value) return;
                                                setFieldValue('otherTags', [...values.otherTags, {
                                                    id: value,
                                                    name: value
                                                }]);
                                            }}
                                            name="otherTags"
                                            errors={errors.otherTags}
                                        />

                                        <ListSingle list={values.otherTags}
                                            setList={(data) => setFieldValue('otherTags', data)} />
                                    </div>

                                    <div className="form-group col-12 mt-3">
                                        <Typography variant="h6">Optional Information</Typography>
                                    </div>

                                    <div className="form-group col-12">
                                        <DkTextbox
                                            title="Research Website Address"
                                            value={values.hyperlink}
                                            propName="hyperlink"
                                            errors={errors.hyperlink}
                                            touched={touched.hyperlink}
                                            setFieldValue={setFieldValue}
                                            infoId="project-activity-hyperlink"
                                        />
                                    </div>


                                    <div className="form-group col-12">
                                        <AutosuggestMulti title="Research Question/Aim"
                                            max={3}
                                            list={values.researchQuestion}
                                            suggestions={[]}
                                            refreshSuggestions={() => {
                                            }}
                                            placeholder="Research Question/Aim"
                                            addToList={(value) => {
                                                if (!value) return;
                                                setFieldValue('researchQuestion', [...values.researchQuestion, {
                                                    id: value,
                                                    name: value
                                                }]);
                                            }} />

                                        <ListSingle list={values.researchQuestion}
                                            setList={(data) => setFieldValue('researchQuestion', data)} />
                                    </div>


                                    <div className="form-group col-12">
                                        <DkTextbox
                                            title="Study Design/Methods"
                                            value={values.studyDesignMethods}
                                            propName="studyDesignMethods"
                                            errors={errors.studyDesignMethods}
                                            touched={touched.studyDesignMethods}
                                            setFieldValue={setFieldValue}
                                            setInfoId="project-activity-studyDesignMethods"
                                        />
                                    </div>

                                    <div className="form-group col-12">
                                        <DkTextarea
                                            title="Population"
                                            value={values.population}
                                            propName="population"
                                            errors={errors.population}
                                            touched={touched.population}
                                            setFieldValue={setFieldValue}
                                            setInfoId="project-activity-population"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="form-group col-12">
                                        <DkTextarea
                                            title="Intervention"
                                            value={values.intervention}
                                            propName="intervention"
                                            errors={errors.intervention}
                                            touched={touched.intervention}
                                            setFieldValue={setFieldValue}
                                            setInfoId="project-activity-intervention"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="form-group col-12">
                                        <DkTextarea
                                            title="Comparator"
                                            value={values.comparator}
                                            propName="comparator"
                                            errors={errors.comparator}
                                            touched={touched.comparator}
                                            setFieldValue={setFieldValue}
                                            setInfoId="project-activity-comparator"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="form-group col-12">
                                        <DkTextarea
                                            title="Outcome"
                                            value={values.outcome}
                                            propName="outcome"
                                            errors={errors.outcome}
                                            touched={touched.outcome}
                                            setFieldValue={setFieldValue}
                                            setInfoId="project-activity-outcome"
                                            rows={4}
                                        />
                                    </div>


                                    <div className="form-group col-sm-12">
                                        <button type="button" className="dk-btn dk-btn-blue" onClick={(e) => {
                                            e.preventDefault();
                                            setStepIndicator(currentStep - 1);
                                        }}>
                                            Back
                                        </button>
                                        <button type="submit" className="dk-btn dk-btn-blue pull-right">
                                            Save & Continue
                                        </button>
                                    </div>
                                </Row>
                                <FormikErrorHandleFocus />
                            </Form>
                        )}
                    </Formik>
                </React.Fragment>
            )}

            {message && <ValidationError message={message} />}
        </React.Fragment>
    );
};

export default ProjectType1x3Biomedical;
