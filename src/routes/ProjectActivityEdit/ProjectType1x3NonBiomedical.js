import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import CategorySelection from "components/CategorySelection";
import { Row, Input, Label } from "reactstrap";
import AddIcon from "@material-ui/icons/Add";
import Loading from 'components/Loading';
import DkTextarea from "components/DkTextarea";
import DkTextbox from "components/DkTextbox";
import { Box, Typography } from "@material-ui/core";
import { Typeahead, TypeaheadInputSingle } from "react-bootstrap-typeahead";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from "../../components/ListSingle";

import { otherResearchFieldCategory, otherResearchFieldSubcategory } from "services";
import { projectResearchActivityService } from "services";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const prevStep = 1;

const ProjectType1x3NonBiomedical = ({ selectedItem, message, setStepIndicator, setSelectedItem, otherResearchFieldCategoryId, currentStep }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [otherResearchFieldSubcategories, setOtherResearchFieldSubcategories] = React.useState([]);

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    if (otherResearchFieldCategoryId) {
      setIsLoading(true);
      otherResearchFieldSubcategory
        .getActive(otherResearchFieldCategoryId)
        .then((data) => {
          console.log('setOtherResearchFieldSubcategories', data)
          setOtherResearchFieldSubcategories(data);
          setIsLoading(false);
        });
    }
  }, [otherResearchFieldCategoryId]);

  return (
    <React.Fragment>

      {!isLoading && (
        <Formik
          initialValues={{
            otherResearchFieldList: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.fields
              && otherResearchFieldSubcategories.filter(x => selectedItem.research_project_information.fields.some(t => t.id === x.id))) || [],
            researchQuestion:
              (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.research_questions
                && selectedItem.research_project_information.research_questions.map(x => { return { name: x.content } })) || [],
            studyDesignMethods:
              (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.study_designs
                && selectedItem.research_project_information.study_designs.map(x => { return { name: x.content } })) || [],
            summary: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.summary) || "",
            otherTags: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.tags) || [],
            fileContent: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.fileContent) || null,
            hyperlink: (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.link) || "",
          }}
          validationSchema={Yup.object().shape({
            summary: Yup.string().required("Research Abstract is required"),
            otherResearchFieldList: Yup.array().min(1, "At least 1 Research Category is required"),
            otherTags: Yup.array().min(1,"Minimum one Keyword is required"),
          })}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={(values) => {
            // same shape as initial values
            console.log('Submit', values, selectedItem);
            setIsLoading(true);
            projectResearchActivityService.saveStep3NonBiomedical({
              id: selectedItem.id,
              fieldTypeId: otherResearchFieldCategoryId,
              fields: values.otherResearchFieldList && values.otherResearchFieldList.map(x => { return { id: x.id } }),
              researchQuestions: values.researchQuestion && values.researchQuestion.map(x => { return { content: x.name } }),
              studyDesigns: values.studyDesignMethods && values.studyDesignMethods.map(x => { return { content: x.name } }),
              tags: values.otherTags && values.otherTags.map(x => { return { name: x.name } }),
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
              <Row>
                <div className="form-group col-12 mt-3">
                  <Typography variant="h6">Essential Information</Typography>
                </div>

                <div className="form-group col-12">
                  <div className="fieldTitle">
                    Research Category <span className="required"> *</span>
                </div>
                  <Typeahead
                    id="otherResearchFieldList"
                    multiple={true}
                    onChange={(e) => setFieldValue('otherResearchFieldList', e)}
                    options={otherResearchFieldSubcategories}
                    labelKey="name"
                    autoComplete="off"
                    placeholder="Research Category..."
                    selected={values.otherResearchFieldList}
                  />
                  {errors.otherResearchFieldList && touched.otherResearchFieldList ? (
                    <ValidationError message={errors.otherResearchFieldList} />
                  ) : null}
                </div>


                <div className="form-group col-12">
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
                    refreshSuggestions={() => { }}
                    placeholder="Keywords..."
                    addToList={(value) => {
                      if (!value) return;
                      setFieldValue('otherTags', [...values.otherTags, { id: value, name: value }]);
                    }}
                    name="otherTags"
                    errors={errors.otherTags}
                    />

                  <ListSingle list={values.otherTags} setList={(data) => setFieldValue('otherTags', data)} />
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
                    refreshSuggestions={() => { }}
                    placeholder="Research Question/Aim"
                    addToList={(value) => {
                      if (!value) return;
                      setFieldValue('researchQuestion', [...values.researchQuestion, { id: value, name: value }]);
                    }} />

                  <ListSingle list={values.researchQuestion} setList={(data) => setFieldValue('researchQuestion', data)} />
                </div>


                <div className="form-group col-12 mt-2">
                  <AutosuggestMulti title="Study Design/Methods"
                    max={3}
                    list={values.studyDesignMethods}
                    suggestions={[]}
                    refreshSuggestions={() => { }}
                    placeholder="Study Design/Methods"
                    addToList={(value) => {
                      if (!value) return;
                      setFieldValue('studyDesignMethods', [...values.studyDesignMethods, { id: value, name: value }]);
                    }} />

                  <ListSingle list={values.studyDesignMethods} setList={(data) => setFieldValue('studyDesignMethods', data)} />
                </div>

             

                {/* <div className="form-group col-sm-12">
                <div className="fieldTitle">Attachment</div>
                <Input type="file" name="file" id="exampleFile" />
              </div> */}


                <div className="form-group col-sm-12">
                  <button type="button" className="dk-btn dk-btn-blue" onClick={(e) => { e.preventDefault(); setStepIndicator(currentStep - 1); }}>
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

      {message && <ValidationError message={message} />}

    </React.Fragment>
  );
};

export default ProjectType1x3NonBiomedical;