import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import Loading from 'components/Loading';
import CategorySelection from "components/CategorySelection";
import { Box, Typography } from "@material-ui/core";
import { Row, Input } from "reactstrap";
import DkRadioButtons from "components/DkRadioButtons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FreeTextInput from "components/FreeTextInput";
import DkDropdown from "components/DkDropdown";
import InfoIcon from "components/InfoIcon";
import { IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Autocomplete } from "@material-ui/lab";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from "../../components/ListSingle";
import ImageUpload from 'components/ImageUpload';
import ProjectType1x3Biomedical from './ProjectType1x3Biomedical';
import ProjectType1x3NonBiomedical from './ProjectType1x3NonBiomedical';
import ProjectType1x3Other from './ProjectType1x3Other';
import { otherResearchFieldCategory } from 'services';
import { ErrorBoundary } from "helpers/CommonFunctions";

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  funded: Yup.number().required("Funded is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const rbField = [
  { name: "Biomedical", value: "1" },
  { name: "Non-Biomedical", value: "0" },
];

const data = {
  label: "search me",
  value: "searchme",
  children: [
    {
      label: "search me too",
      value: "searchmetoo",
      children: [
        {
          label: "No one can get me",
          value: "anonymous",
        },
      ],
    },
  ],
};

const onChange = (currentNode, selectedNodes) => {
  console.log("onChange::", currentNode, selectedNodes);
};
const onAction = ({ action, node }) => {
  console.log(`onAction:: [${action}]`, node);
};
const onNodeToggle = (currentNode) => {
  console.log("onNodeToggle::", currentNode);
};

const ProjectType1x3 = ({ selectedItem, message, setStepIndicator, setSelectedItem, currentStep }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(true);
  const [fieldTypes, setFieldTypes] = React.useState(null);
  const [fieldType, setFieldType] = React.useState("-1");

  React.useEffect(() => {
    otherResearchFieldCategory.getFieldTypes().then((data) => {
      setFieldTypes(data);
      setIsLoading(false);
    });

    if (selectedItem && selectedItem.research_project_information && selectedItem.research_project_information.research_project_type) {
      if (selectedItem.research_project_information.research_project_type === "Biomedical research")
        setFieldType("1");
      else if (selectedItem.research_project_information.research_project_type === "Non-Biomedical research"
        && selectedItem.research_project_information.field_type_id)
        setFieldType(selectedItem.research_project_information.field_type_id);
      else if (selectedItem.research_project_information.research_project_type === "Other research")
        setFieldType("3");
    }
  }, []);

  // for mock
  const [id, setId] = React.useState(10);
  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const [researchTopics, setResearchTopics] = React.useState([]);
  const [researchTopicSuggestions, setResearchTopicSuggestions] = React.useState([]);
  const refreshResearchTopicSuggestions = (value) => {
    (async () => {
      await sleep(500); // For demo purposes.
      if (value) setResearchTopicSuggestions([value]);
      else setResearchTopicSuggestions([]);
    })();
  }
  const addToResearchTopics = (value) => {
    if (!value)
      return;
    const x = { id: id, name: value };
    setId(id + 1);
    setResearchTopics([...researchTopics, x]);
  }

  return (
    <React.Fragment>

      <Box mt={3} mb={2}>
        <Typography variant="h6">Research Project Information</Typography>
      </Box>

      {isLoading && <Loading />}

      {!isLoading && fieldTypes && (
        <>
          <ErrorBoundary>
            <DkDropdown
              title="Discipline"
              propName="fieldType"
              selectedValue={fieldType}
              list={fieldTypes}
              onChange={(e) => setFieldType(e.target.value)}
            />


            {fieldType && fieldType === "1" && (
              <ProjectType1x3Biomedical
                selectedItem={selectedItem}
                setStepIndicator={setStepIndicator}
                setSelectedItem={setSelectedItem}
                currentStep={currentStep}
              />
            )}

            {fieldType !== "-1" && fieldType !== "1" && fieldType !== "3" && (
              <ProjectType1x3NonBiomedical
                selectedItem={selectedItem}
                setStepIndicator={setStepIndicator}
                setSelectedItem={setSelectedItem}
                otherResearchFieldCategoryId={fieldType}
                currentStep={currentStep}
              />
            )}

            {fieldType && fieldType === "3" && (
              <ProjectType1x3Other
                selectedItem={selectedItem}
                setStepIndicator={setStepIndicator}
                setSelectedItem={setSelectedItem}
                currentStep={currentStep}
              />
            )}
            {fieldType && fieldType === "-1" && (
              <div className="form-group col-sm-12">
                <button type="button" className="dk-btn dk-btn-blue" onClick={(e) => { e.preventDefault(); setStepIndicator(currentStep - 1); }}>
                  Back
            </button>
              </div>
            )}


            {message && <ValidationError message={message} />}
          </ErrorBoundary>
        </>
      )}

    </React.Fragment>
  );
};

export default ProjectType1x3;
