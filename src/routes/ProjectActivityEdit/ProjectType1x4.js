import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import DkTextbox from "components/DkTextbox";
import DatePicker from "react-datepicker";
import AutosuggestMulti from 'components/AutosuggestMulti';
import Loading from 'components/Loading';
import ListSingle from "../../components/ListSingle";
import { Typeahead, AsyncTypeahead, TypeaheadInputSingle } from "react-bootstrap-typeahead";
import { Box, IconButton, TextField, Typography } from "@material-ui/core";
import {
  Alert,
  Button,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import DkRadioButtons from "components/DkRadioButtons";
import FreeTextInput from "components/FreeTextInput";
import moment from 'moment';
import { rbYesNo } from 'const';
import { useAppState } from "components/AppState";
import { projectResearchActivityService, countryService } from "services";
import { toast } from 'react-toastify'
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const SEARCH_URI = 'https://api.github.com/search/users';

const ProjectType1x4 = ({ selectedItem, message, setStepIndicator, setSelectedItem, currentStep }) => {
  let history = useHistory();
  const [{ currentUser }, dispatch] = useAppState();

  const [isLoading, setIsLoading] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [searchCountries, setSearchCountries] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = (query) => {
    setIsSearching(true);
    console.log('search by', query);
    countryService.search(query).then(data => {
      console.log('data', data);
      setSearchCountries(data);
      setIsSearching(false);
    })
  };

  React.useEffect(() => {
    countryService.getActive().then(data => setCountries(data.map(x => { return { id: x.id, name: x.name } })))
  }, []);

  React.useEffect(() => {
    console.log('search contrunei', searchCountries)
  }, [searchCountries]);

  return (
    <React.Fragment>
      <Box mt={3} mb={4}>
        <Typography variant="h6">Other Details</Typography>
      </Box>

      {isLoading && <Loading />}

      {!isLoading && (
        <Formik
          initialValues={{
            researchType: (selectedItem && selectedItem.researchType) || "",
            countries: (selectedItem && selectedItem.countries && selectedItem.countries.map(x => { return { id: x.name, name: x.name } })) || [],
            additionalLocationDetails: (selectedItem && selectedItem.additional_location_details) || "",
            startDate: (selectedItem && selectedItem.start_date && moment(selectedItem.start_date).toDate()) || "",
            endDate: (selectedItem && selectedItem.end_date && moment(selectedItem.end_date).toDate()) || "",
            keyMilestones: (selectedItem && selectedItem.key_milestones) || "",
            leadInstitution: (selectedItem && selectedItem.lead_institution) || "",
            principalInvestigators: (selectedItem && selectedItem.principal_investigators) || [],
            collaborators: (selectedItem && selectedItem.collaborators) || [],
            localImplementingPartners: (selectedItem && selectedItem.local_implementing_partners) || [],
            dataSharingWay: (selectedItem && selectedItem.data_sharing_way) || "",
            openToCollaborators: (selectedItem && selectedItem.open_to_collaborators === 1 && "1") || "0",
            emailAddressOfLeadPrincipalInvestigator: (selectedItem && selectedItem.lead_principal_investigator_email) || '',
          }}
          validationSchema={Yup.object().shape({
            emailAddressOfLeadPrincipalInvestigator: Yup.string().email("Email is not valid"),
            startDate: Yup.date()
              .required("Start Date is required"),
            endDate: Yup.date()
              .required("End Date is required")
              .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
            leadInstitution: Yup.string().required("Lead Institution is required"),
            principalInvestigators: Yup.array().min(1, "At least 1 Principal Investigators is required")
          })}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={(values) => {
            // same shape as initial values
            console.log('Submit values', values);
            setIsLoading(true);
            projectResearchActivityService.saveStep4({
              id: selectedItem.id,
              researchType: values.researchType,
              countries: values.countries && values.countries.map(x => { return { name: x.name } }),
              additionalLocationDetails: values.additionalLocationDetails,
              startDate: values.startDate && moment(values.startDate).format('YYYY-MM-DD'),
              endDate: values.endDate && moment(values.endDate).format('YYYY-MM-DD'),
              keyMilestones: values.keyMilestones,
              leadInstitution: values.leadInstitution,
              principalInvestigators: values.principalInvestigators && values.principalInvestigators.map(x => { return { name: x.name } }),
              collaborators: values.collaborators && values.collaborators.map(x => { return { name: x.name } }),
              localImplementingPartners: values.localImplementingPartners && values.localImplementingPartners.map(x => { return { name: x.name } }),
              dataSharingWay: values.dataSharingWay,
              openToCollaborators: values.openToCollaborators == 1,
              emailAddressOfLeadPrincipalInvestigator: values.emailAddressOfLeadPrincipalInvestigator
            })
              .then(data => {
                setSelectedItem(data);

                setIsLoading(false);
                setStepIndicator(currentStep + 1);
              }).catch(error => {
                console.log('ERROR: projectResearchActivityService.create', error);
              });
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <Box mt={3} mb={4}>
                <Typography variant="h6">Essential Information</Typography>
              </Box>
              <Row>
                {console.log('values', values)}

                <div className="form-group col-6">
                  <div className="fieldTitle">Start Date <span class="required">*</span></div>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-fw fa-calendar"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <DatePicker
                      id="startDate"
                      name="startDate"
                      autoComplete="off"
                      className={
                        "bg-white form-control custom-select" +
                        (errors.startDate && touched.startDate
                          ? " is-invalid"
                          : "")
                      }
                      selected={values.startDate}
                      showMonthDropdown
                      showYearDropdown
                      onChange={(date) => {
                        setFieldValue("startDate", date);
                      }}
                    />
                  </InputGroup>

                  {errors.startDate && touched.startDate && (
                    <ValidationError message={errors.startDate} />
                  )}
                </div>

                <div className="form-group col-6">
                  <div className="fieldTitle">End Date <span class="required">*</span></div>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-fw fa-calendar"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <DatePicker
                      id="endDate"
                      name="endDate"
                      autoComplete="off"
                      className={
                        "bg-white form-control" +
                        (errors.endDate && touched.endDate ? " is-invalid" : "")
                      }
                      selected={values.endDate}
                      showMonthDropdown
                      showYearDropdown
                      onChange={(date) => {
                        setFieldValue("endDate", date);
                      }}
                    />
                    {errors.endDate && touched.endDate && (
                      <ValidationError message={errors.endDate} />
                    )}
                  </InputGroup>
                </div>

                <div className="form-group col-12">
                  <AutosuggestMulti
                    name="principalInvestigators"
                    title="Principal Investigators"
                    max={3}
                    list={values.principalInvestigators}
                    suggestions={[]}
                    required
                    refreshSuggestions={() => { }}
                    placeholder="Principal Investigators"
                    addToList={(value) => {
                      if (!value) return;
                      setFieldValue('principalInvestigators', [...values.principalInvestigators, { id: value, name: value }]);
                    }}
                  />
                  {errors.principalInvestigators && touched.principalInvestigators && (
                    <ValidationError message={errors.principalInvestigators} />
                  )}

                  <ListSingle list={values.principalInvestigators} setList={(data) => setFieldValue('principalInvestigators', data)} />
                </div>

                <div className="form-group col-12">
                  <DkTextbox
                    title="Lead Institution"
                    value={values.leadInstitution}
                    propName="leadInstitution"
                    errors={errors.leadInstitution}
                    required
                    touched={touched.leadInstitution}
                    setFieldValue={setFieldValue}
                    setInfoId="project-activity-leadInstitution"
                  />
                </div>
                <div className="form-group col-12">
                  <DkRadioButtons
                    title="Open To Collaborators"
                    rbName="openToCollaborators"
                    options={rbYesNo}
                    required
                    setFieldValue={setFieldValue}
                    errors={errors.openToCollaborators}
                    touched={touched.openToCollaborators}
                    selectedValue={values.openToCollaborators}
                  />
                </div>

                <div className="form-group col-12 mt-2">
                  <Box mt={3} mb={2}>
                    <Typography variant="h6">Optional Information</Typography>
                  </Box>
                </div>
                <div className="form-group col-12 mt-2">
                  <Label className="fieldTitle" for={countries}>Countries where research will be conducted</Label>
                  <AsyncTypeahead
                    id="countries"
                    isLoading={isSearching}
                    minLength={2}
                    multiple={true}
                    onSearch={handleSearch}
                    onChange={(e) => {
                      console.log('e', e);
                      if (e && e.length === 1) {
                        setFieldValue('countries', [...values.countries, e[0]]);
                        // countryTypeaheadRef.current.clear();
                      }
                    }
                    }
                    options={searchCountries}
                    labelKey="name"
                    // autoComplete="off"
                    placeholder="Countries..."
                    selected={[]}
                    renderMenuItemChildren={(option, props) => (
                      <React.Fragment>
                        <span>{option.name}</span>
                      </React.Fragment>
                    )}
                  />
                  {errors.countries && touched.countries ? <ValidationError message={errors.countries} /> : null}
                  <ListSingle list={values.countries} setList={(data) => setFieldValue('countries', data)} />
                </div>

                <div className="form-group col-12">
                  <AutosuggestMulti
                    title="Collaborators"
                    max={5}
                    list={values.collaborators}
                    suggestions={[]}
                    refreshSuggestions={() => { }}
                    placeholder="Collaborators"
                    addToList={(value) => {
                      if (!value) return;
                      setFieldValue('collaborators', [...values.collaborators, { id: value, name: value }]);
                    }}
                  />

                  <ListSingle list={values.collaborators} setList={(data) => setFieldValue('collaborators', data)} />
                </div>

                <div className="form-group col-12">
                  <AutosuggestMulti
                    title="Local Implementing Partners"
                    max={5}
                    list={values.localImplementingPartners}
                    suggestions={[]}
                    refreshSuggestions={() => { }}
                    placeholder="Local Implementing Partners"
                    addToList={(value) => {
                      if (!value) return;
                      setFieldValue('localImplementingPartners', [...values.localImplementingPartners, { id: value, name: value }]);
                    }}
                  />

                  <ListSingle list={values.localImplementingPartners} setList={(data) => setFieldValue('localImplementingPartners', data)} />
                </div>

                <div className="form-group col-12">
                  <DkTextbox
                    title="Key milestones"
                    value={values.keyMilestones}
                    propName="keyMilestones"
                    errors={errors.keyMilestones}
                    touched={touched.keyMilestones}
                    setFieldValue={setFieldValue}
                    setInfoId="project-activity-keyMilestones"
                  />
                </div>

                <div className="form-group col-12">
                  <DkTextbox
                    title="How will data be shared"
                    value={values.dataSharingWay}
                    propName="dataSharingWay"
                    errors={errors.dataSharingWay}
                    touched={touched.dataSharingWay}
                    setFieldValue={setFieldValue}
                    setInfoId="project-activity-dataSharingWay"
                  />
                </div>

                <div className="form-group col-12">
                  <DkTextbox
                    title="Email address of lead principal investigator"
                    value={values.emailAddressOfLeadPrincipalInvestigator}
                    propName="emailAddressOfLeadPrincipalInvestigator"
                    errors={errors.emailAddressOfLeadPrincipalInvestigator}
                    touched={touched.emailAddressOfLeadPrincipalInvestigator}
                    setFieldValue={setFieldValue}
                    setInfoId="project-activity-emailAddressOfLeadPrincipalInvestigator"
                  />
                </div>

                <div className="form-group col-12">
                  <DkTextbox
                    title="Additional detail on location where studies/trials are
                  conducted"
                    value={values.additionalLocationDetails}
                    propName="additionalLocationDetails"
                    errors={errors.additionalLocationDetails}
                    touched={touched.additionalLocationDetails}
                    setFieldValue={setFieldValue}
                    setInfoId="project-activity-additionalLocationDetails"
                  />
                </div>

                <div className="form-group col-sm-12">
                  <button type="button" className="dk-btn dk-btn-blue" onClick={(e) => { e.preventDefault(); setStepIndicator(currentStep - 1); }}>
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
      )}

    </React.Fragment>
  );
};

export default ProjectType1x4;
