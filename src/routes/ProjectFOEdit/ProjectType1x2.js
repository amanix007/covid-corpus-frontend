import React from "react";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DkDropdown from "components/DkDropdown";
import { Row, Col } from 'reactstrap';

import ProjectType1x2Biomedical from "./ProjectType1x2Biomedical";
import ProjectType1x2NonBiomedical from "./ProjectType1x2NonBiomedical";
import ProjectType1x2Other from "./ProjectType1x2Other";

import { otherResearchFieldCategory } from 'services';

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

const ProjectType1x2 = ({ selectedItem, message, setStepIndicator, currentStep }) => {
  const classes = useStyles();


  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [fieldTypes, setFieldTypes] = React.useState(null);
  const [fieldType, setFieldType] = React.useState("-1");
  const [infoId, setInfoId] = React.useState(null);

  const [categoryId, setCategoryId] = React.useState(null);
  const [subcategoryId, setSubcategoryId] = React.useState(null);
  const [image, setImage] = React.useState();

  const [researchActivities, setResearchActivities] = React.useState([]);
  const [
    researchActivityCategories,
    setResearchActivityCategories,
  ] = React.useState([]);
  const [
    researchActivitySubcategories,
    setResearchActivitySubcategories,
  ] = React.useState([]);

  React.useEffect(() => {
    otherResearchFieldCategory.getFieldTypes().then((data) => {
      setFieldTypes(data);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (selectedItem) {
      if (selectedItem.funding_opportunity_type === "Biomedical research")
        setFieldType("1");
      else if (selectedItem.funding_opportunity_type === "Non-Biomedical research" && selectedItem.field_type_id)
        setFieldType(selectedItem.field_type_id);
      else if (selectedItem.funding_opportunity_type === "Other research")
        setFieldType("3")
    }
  }, [selectedItem]);

  React.useEffect(() => {
    if (subcategoryId) {
      setSubcategoryId(null);
    }
  }, [subcategoryId]);

  const deleteFromSearchActivityList = () => { };

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
        <Typography variant="h6">Funding call Information</Typography>
      </Box>
      <Box mt={3} mb={2}>
        <Typography variant="h6">Essential Information</Typography>
      </Box>
      {!isLoading && fieldTypes && (
        <>
          <Row>
            <Col>
              <DkDropdown
                title="Discipline"
                propName="fieldType"
                selectedValue={fieldType}
                required
                list={fieldTypes}
                onChange={(e) => setFieldType(e.target.value)}
              />
            </Col>
          </Row>


          {fieldType && fieldType === "1" && (
            <ProjectType1x2Biomedical selectedItem={selectedItem} setStepIndicator={setStepIndicator} currentStep={currentStep} />
          )}

          {fieldType != "-1" && fieldType != "1" && fieldType != "3" && (
            <ProjectType1x2NonBiomedical selectedItem={selectedItem} setStepIndicator={setStepIndicator} otherResearchFieldCategoryId={fieldType} currentStep={currentStep} />
          )}

          {fieldType && fieldType === "3" && (
            <ProjectType1x2Other selectedItem={selectedItem} setStepIndicator={setStepIndicator} currentStep={currentStep} />
          )}
          {fieldType && fieldType === "-1" && (
            <div className="form-group col-sm-12">
            <button type="button" className="dk-btn dk-btn-blue" onClick={(e) => { e.preventDefault(); setStepIndicator(currentStep - 1); }}>
              Back
                </button>
          </div>
          )}
          

          {message && <ValidationError message={message} />}
        </>
      )}

    </React.Fragment>
  );
};

export default ProjectType1x2;
