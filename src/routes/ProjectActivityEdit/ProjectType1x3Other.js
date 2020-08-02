import React from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import DkTextarea from "components/DkTextarea";
import {Row} from "reactstrap";
import DkTextbox from "components/DkTextbox";
import Loading from 'components/Loading';
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from "../../components/ListSingle";
import {Box, Typography} from "@material-ui/core";
import ImageUpload from 'components/ImageUpload';
import {projectResearchActivityService} from "services";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const prevStep = 1;

const ProjectType1x3Other = ({selectedItem, message, setStepIndicator, setSelectedItem, currentStep}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [image, setImage] = React.useState();

    return (
        <React.Fragment>

            {isLoading && <Loading/>}

            {!isLoading && (
                <Formik
                    initialValues={{
                        fields: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.fields
                            && selectedItem.research_project_information.fields.map(x => {
                                return {name: x.title}
                            })) || [],
                        researchQuestion:
                            (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.research_questions
                                && selectedItem.research_project_information.research_questions.map(x => {
                                    return {name: x.content}
                                })) || [],
                        studyDesignMethods:
                            (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.study_designs
                                && selectedItem.research_project_information.study_designs.map(x => {
                                    return {name: x.content}
                                })) || [],
                        summary: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.summary) || [],
                        otherTags: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.tags) || [],
                        fileContent: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.fileContent) || null,
                        hyperlink: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.link) || "",
                    }}
                    validationSchema={Yup.object().shape({
                        summary: Yup.string().required("Research Abstract is required"),
                        otherTags: Yup.array().min(1,"Minimum one Keyword is required"), 
                    })}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // same shape as initial values
                        console.log('x');
                        setIsLoading(true);
                        projectResearchActivityService.saveStep3Other({
                            id: selectedItem.id,
                            fields: values.fields && values.fields.map(x => {
                                return {title: x.name}
                            }),
                            researchQuestions: values.researchQuestion && values.researchQuestion.map(x => {
                                return {content: x.name}
                            }),
                            studyDesigns: values.studyDesignMethods && values.studyDesignMethods.map(x => {
                                return {content: x.name}
                            }),
                            tags: values.otherTags && values.otherTags.map(x => {
                                return {name: x.name}
                            }),
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
                    {({setFieldValue, errors, touched, values}) => (
                        <Form>
                            <Row>
                                <div className="form-group col-12 mt-3">
                                    <Typography variant="h6">Essential Information</Typography>
                                </div>

                                <div className="form-group col-12">
                                    <AutosuggestMulti title="Other Fields"
                                                      max={3}
                                                      required
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
                                                setList={(data) => setFieldValue('otherTags', data)}/>
                                </div>

                                <div className="form-group col-12 mt-3">
                                    <Typography variant="h6">Optional Information</Typography>
                                </div>

                                <div className="form-group col-sm-12">
                                    <DkTextbox
                                        title="Research Website Address"
                                        value={values.hyperlink}
                                        propName="hyperlink"
                                        errors={errors.hyperlink}
                                        touched={touched.hyperlink}
                                        setFieldValue={setFieldValue}
                                        setInfoId="project-activity-hyperlink"
                                    />
                                </div>


                                <div className="form-group col-12 mt-2">
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
                                                      }}/>

                                    <ListSingle list={values.researchQuestion}
                                                setList={(data) => setFieldValue('researchQuestion', data)}/>
                                </div>


                                <div className="form-group col-12 mt-2">
                                    <AutosuggestMulti title="Study Design/Methods"
                                                      max={3}
                                                      list={values.studyDesignMethods}
                                                      suggestions={[]}
                                                      refreshSuggestions={() => {
                                                      }}
                                                      placeholder="Study Design/Methods"
                                                      addToList={(value) => {
                                                          if (!value) return;
                                                          setFieldValue('studyDesignMethods', [...values.studyDesignMethods, {
                                                              id: value,
                                                              name: value
                                                          }]);
                                                      }}/>

                                    <ListSingle list={values.studyDesignMethods}
                                                setList={(data) => setFieldValue('studyDesignMethods', data)}/>
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
                            <FormikErrorHandleFocus/>
                        </Form>
                    )}
                </Formik>
            )}

            {message && <ValidationError message={message}/>}

        </React.Fragment>
    );
};

export default ProjectType1x3Other;
