import React from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import moment from 'moment';
import ValidationError from "components/ValidationError";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from 'components/ListSingle';
import DkTextbox from "components/DkTextbox";
import DkTextarea from "components/DkTextarea";
import DkDropdown from 'components/DkDropdown';
import Loading from 'components/Loading';
import DatePicker from "react-datepicker";
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
    Box,
    Button,
    FormLabel,
    TextField,
    Typography,
} from "@material-ui/core";
import {Typeahead, AsyncTypeahead, TypeaheadInputSingle} from "react-bootstrap-typeahead";
import {
    Alert,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    ModalFooter,
} from "reactstrap";
import {funderService, projectFundingOpportunityService, funderTypeService} from "services";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const ProjectType1x1 = ({selectedItem, message, toggleModalInfo, setStepIndicator, setSelectedItem, currentStep}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [funders, setFunders] = React.useState(null);
    const [funderTypes, setFunderTypes] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [searchFunderTypes, setSearchFunderTypes] = React.useState([]);
    const [newLabel1, setNewLabel1] = React.useState({name: '', id: -1});
    const [isOpenFunders, setIsOpenFunders] = React.useState(false);


    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(false);

    const [newLabel, setNewLabel] = React.useState({name: '', id: -1});
    const handleSearch = (query) => {
        setIsSearching(true);
        console.log('search by', query);
        funderTypeService.search(query).then(data => {
            setSearchFunderTypes(data);
            setIsSearching(false);
        })
    };
    React.useEffect(() => {
        funderService.getActive().then((data) => {
            data.push({name: 'Others', id: -1})
            setFunders(data)
        });
        funderTypeService.get().then((data) => {
            data.push({name: 'Others', id: -1})
            setFunderTypes(data)
        });
    }, []);

    React.useEffect(() => {
        console.log('selectedItem', selectedItem);
    }, [selectedItem]);

    return (
        <React.Fragment>
            <Box mt={3} mb={2}>
                <Typography variant="h6">Funding Opportunity Details</Typography>
            </Box>

            {isLoading && <Loading/>}

            {!isLoading && (
                <Formik
                    initialValues={{
                        fundingCallName: (selectedItem && selectedItem.funding_call_name) || "",
                        funders: (selectedItem && selectedItem.funders) || [],
                        openingDate: (selectedItem && selectedItem.opening_date && moment(selectedItem.opening_date).toDate()) || "",
                        fundingType: (selectedItem && selectedItem.funding_type) || {id: 0, name: ''},
                        link: (selectedItem && selectedItem.link) || "",
                        funderTypeName: (selectedItem && selectedItem.funderTypeName) || "",
                        deadline: (selectedItem && selectedItem.deadline && moment(selectedItem.deadline).toDate()) || "",
                        summary: (selectedItem && selectedItem.summary) || "",
                    }}
                    validationSchema={Yup.object().shape({
                        fundingCallName: Yup.string().required("Funding Call Name is required"),
                        openingDate: Yup.date(),
                        deadline: Yup.date()
                            .min(Yup.ref('openingDate'),'Closing Date must be after Opening Date'),
                        funders: Yup.array().min(1, "At least 1 Funder is required"),
                        summary: Yup.string().required("About the Call is required"),
                    })}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // same shape as initial values
                        setIsLoading(true);
                        for (let item of values.funders) {
                            if (item.id === -1) {
                                item.name = newLabel1.name;
                            }
                        }
                        if (!selectedItem) {
                            projectFundingOpportunityService.create({
                                fundingCallName: values.fundingCallName,
                                funders: values.funders,
                                openingDate: values.openingDate && moment(values.openingDate).format('YYYY-MM-DD'),
                                fundingType: values.fundingType,
                                link: values.link,
                                deadline: values.deadline && moment(values.deadline).format('YYYY-MM-DD'),
                                summary: values.summary
                            })
                                .then(data => {
                                    console.log('projectResearchActivityService.create success', data);
                                    setSelectedItem(data);
                                    setIsLoading(false);
                                    setStepIndicator(currentStep + 1);
                                })
                                .catch(error => {
                                    console.log('ERROR: projectResearchActivityService.create', error);
                                });
                        } else {
                            projectFundingOpportunityService.saveStep1({
                                id: selectedItem.id,
                                fundingCallName: values.fundingCallName,
                                funders: values.funders,
                                openingDate: values.openingDate && moment(values.openingDate).format('YYYY-MM-DD'),
                                fundingType: values.fundingType,
                                link: values.link,
                                deadline: values.deadline && moment(values.deadline).format('YYYY-MM-DD'),
                                summary: values.summary
                            })
                                .then(data => {
                                    console.log('projectResearchActivityService.create success', data);
                                    setSelectedItem(data);
                                    setIsLoading(false);
                                    setStepIndicator(currentStep + 1);
                                })
                                .catch(error => {
                                    console.log('ERROR: projectResearchActivityService.create', error);
                                });
                        }
                        ;
                    }}
                >
                    {({setFieldValue, errors, touched, values}) => (
                        <Form>
                            {/* {console.log('values', values)} */}
                            <Row>
                                <div className="form-group col-12 mt-3">
                                    <Typography variant="h6">Essential Information</Typography>
                                </div>
                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Funding Call Name"
                                                value={values.fundingCallName}
                                                propName="fundingCallName"
                                                errors={errors.fundingCallName}
                                                touched={touched.fundingCallName}
                                                setFieldValue={setFieldValue}
                                                required
                                                infoId="project-activity-fundingCallName"
                                            />
                                        </Box>
                                    </div>
                                </div>

                                {funders && (
                                    <React.Fragment>
                                        <div className="form-group col-sm-12">
                                            <DkDropdown
                                                title="Funders (max 3)"
                                                propName="funders"
                                                errors={errors.funders}
                                                touched={errors.funders}
                                                list={funders.map(x => {
                                                    return ({value: x.id, name: x.name})
                                                })}
                                                disabled={values.funders && values.funders.length >= 3}
                                                required
                                                onChange={(e) => {
                                                    if (e.target.value === "-1") {
                                                        setIsOpenFunders(true)
                                                        const x = {id: -1, name: 'Others'}
                                                        setFieldValue("funders", [...values.funders, x]);
                                                        e.target.value = "-1";
                                                        return;
                                                    } else {
                                                        setIsOpenFunders(false)
                                                    }
                                                    const x = funders.find(f => f.id === e.target.value);
                                                    setFieldValue("funders", [...values.funders, x]);
                                                    e.target.value = "-1";
                                                }}
                                            />
                                            <ListSingle list={values.funders}
                                                        setList={(e) => setFieldValue('funders', e)}/>
                                        </div>

                                    </React.Fragment>
                                )}
                                {isOpenFunders ?
                                    <div className="form-group col-sm-12">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Other Funder Name"
                                                value={newLabel1.name}
                                                propName="funderName"
                                                errors={errors.funderProjectId}
                                                touched={touched.funderProjectId}
                                                setFieldValue={(e, value) => {
                                                    setNewLabel1({id: -1, name: value})
                                                }}
                                                setInfoId="project-activity-funderProjectId"
                                            />
                                        </Box>
                                    </div>
                                    : null}

                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextarea
                                                title="About the Call"
                                                required
                                                value={values.summary}
                                                propName="summary"
                                                errors={errors.summary}
                                                touched={touched.summary}
                                                setFieldValue={setFieldValue}
                                                infoId="project-activity-summary"
                                                rows={4}
                                            />
                                        </Box>
                                    </div>
                                </div>
                                <div className="form-group col-12 mt-3">
                                    <Typography variant="h6">Optional Information</Typography>
                                </div>



                                <div className="form-group col-6">
                                    <div className="fieldTitle">Opening Date</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-fw fa-calendar"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <DatePicker
                                            id="openingDate"
                                            name="openingDate"
                                            showMonthDropdown
                                            showYearDropdown
                                            autoComplete="off"
                                            className={
                                                "bg-white form-control" +

                                                (errors.openingDate && touched.openingDate ? " is-invalid" : "")
                                            }
                                            selected={values.openingDate}
                                            onChange={(date) => {
                                                setFieldValue("openingDate", date);
                                            }}
                                        />
                                        {errors.openingDate && touched.openingDate && (
                                            <ValidationError message={errors.openingDate}/>
                                        )}
                                    </InputGroup>
                                </div>

                                <div className="form-group col-6 mt-2">
                                    <div className="fieldTitle">Closing Date</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-fw fa-calendar"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <DatePicker
                                            id="deadline"
                                            name="deadline"
                                            autoComplete="off"
                                            className={
                                                "bg-white form-control" +
                                                (errors.deadline && touched.deadline ? " is-invalid" : "")
                                            }
                                            selected={values.deadline}
                                            showMonthDropdown
                                            showYearDropdown
                                            onChange={(date) => {
                                                setFieldValue("deadline", date);
                                            }}
                                        />
                                        {errors.deadline && touched.deadline && (
                                            <ValidationError message={errors.deadline}/>
                                        )}
                                    </InputGroup>
                                </div>


                                {/* <div className="form-group col-sm-12">
                  <div className="inline-form">
                    <Box display="flex" flexGrow={1}>
                      <DkTextbox
                        title="Funding Type"
                        value={values.fundingType}
                        propName="fundingType"
                        errors={errors.fundingType}
                        touched={touched.fundingType}
                        setFieldValue={setFieldValue}
                        infoId="project-activity-fundingType"
                      />
                    </Box>
                  </div>
                </div> */}
                                {funderTypes && (
                                    <React.Fragment>
                                        <div className="form-group col-12">
                                            <DkDropdown
                                                title="Grant Type"
                                                propName="funderType"
                                                list={funderTypes.map(x => {
                                                    return ({value: x.id, name: x.name})
                                                })}
                                                onChange={(e) => {
                                                    if (e.target.value === "-1") {
                                                        setIsOpen(true)
                                                        const x = {id: -1, name: 'Others'}
                                                        setFieldValue("funderType", x);
                                                        setFieldValue('funderTypeName', x.name);
                                                        // e.target.value = "-1";
                                                        return;
                                                    } else {

                                                        setIsOpen(false)
                                                    }
                                                    const x = funderTypes.find(f => f.id === e.target.value);
                                                    setFieldValue('funderType', x);
                                                    setFieldValue('funderTypeName', x.name);
                                                }}
                                            />
                                        </div>
                                    </React.Fragment>
                                )}
                                {isOpen ?
                                    <div className="form-group col-sm-12">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Grand Type Name"
                                                value={newLabel.name}
                                                errors={errors.funderProjectId}
                                                touched={touched.funderProjectId}
                                                setFieldValue={(e, value) => {
                                                    setNewLabel({id: -1, name: value})
                                                }}
                                                setInfoId="project-activity-funderProjectId"
                                            />
                                        </Box>
                                    </div>
                                    : null}
                                {/* <div className="form-group col-12 mt-2">
                  <Label className="fieldTitle" for={funderTypes}>Funding Type</Label>
                  <AsyncTypeahead
                    id="Funding Type"
                    isLoading={isSearching}
                    minLength={1}
                    onSearch={handleSearch}
                    onChange={(e) => {
                      console.log(e[0])
                      if (e && e.length === 1) {
                        setFieldValue('funderType', e[0]);
                        setFieldValue('funderTypeName', e[0].name);
                      }
                    }
                    }
                    options={searchFunderTypes}
                    labelKey="name"
                    placeholder="Funding Types..."
                    value={values.funderTypeName}
                    renderMenuItemChildren={(option, props) => (
                      <React.Fragment>
                        <span>{option.name}</span>
                      </React.Fragment>
                    )}
                  />
                </div>
 */}

                                <div className="form-group col-sm-12">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Link To Funding Call"
                                                value={values.link}
                                                propName="link"
                                                errors={errors.link}
                                                touched={touched.link}
                                                setFieldValue={setFieldValue}
                                                infoId="project-activity-link"
                                            />
                                        </Box>
                                    </div>
                                </div>

                                
                            </Row>
                            <Row>
                                <div className="form-group col-sm-12">
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
        </React.Fragment>
    );
};

const LabelAdder = ({
                        isOpen,
                        newLabel,
                        setNewLabel,
                        setFunderTypes,
                        funderTypes,
                        values,
                        toggle,
                        setFieldValue
                    }) => {
    const save = () => {
        setFieldValue("funderType", {id: -1, name: newLabel});
        setFieldValue('funderTypeName', newLabel);
        setFunderTypes([...funderTypes, {id: -1, name: newLabel}])
        toggle()
    };
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
            <ModalHeader toggle={toggle} className="dk-modal-header">Add New Funder Type</ModalHeader>
            <ModalBody>
                <div className="form-group col-sm-12">
                    <div className="inline-form">
                        <Box display="flex" flexGrow={1}>
                            <DkTextbox
                                title="name"
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
export default ProjectType1x1;
