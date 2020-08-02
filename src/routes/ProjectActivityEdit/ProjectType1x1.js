import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import AutosuggestMulti from 'components/AutosuggestMulti';
import ListSingle from 'components/ListSingle';
import DkTextbox from "components/DkTextbox";
import DkDropdown from 'components/DkDropdown';
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from 'components/Loading';
import {
    Box,
    Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
    Alert,
    Row,
    Input,
} from "reactstrap";
import DkRadioButtons from "components/DkRadioButtons";
import { rbYesNo } from 'const';
import { funderService, projectResearchActivityService } from "services";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormikErrorHandleFocus from "helpers/FormikErrorHandleFocus";

const baseCurrency = "USD";

const ProjectType1x1 = ({ selectedItem, message, toggleModalInfo, setStepIndicator, setSelectedItem, currentStep }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(false);

    const [newLabel, setNewLabel] = React.useState({ name: '', id: -1 });
    const [funders, setFunders] = React.useState(null);

    const [infoId, setInfoId] = React.useState(null);
    const [rates, setRates] = React.useState(null);
    const [currencies, setCurrencies] = React.useState(null);

    React.useEffect(() => {
        funderService.getActive().then((data) => {
            data.push({ id: -1, name: 'Others' })
            setFunders(data)
        });
        getCurrencyData();
    }, []);

    React.useEffect(() => {
        console.log('selectedItem', selectedItem);
    }, [selectedItem]);

    const getCurrencyData = async () => {
        const api = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`;

        fetch(api)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setRates(data["rates"]);
                const x = Object.keys(data["rates"]).sort();
                setCurrencies(x);
            });
    };

    const getConvertedCurrency = (amount, convertFromCurrency) => {
        console.log("getConvertedCurrency", amount);
        if (!amount) return "";
        return Number.parseFloat(amount / rates[convertFromCurrency]).toFixed(3);
    };
    const checkOtherFunders = (funders) => {
        for (let item of funders) {
            if (item.id === -1) {
                return true
            }
        }
        return false
    }
    const fundedOptions = [
        { name: 'Yes', value: true },
        { name: 'No', value: false }
    ];
    let onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }
    return (
        <React.Fragment>
            <Box mt={3} mb={4}>
                <Typography variant="h6">Main Details</Typography>
            </Box>

            {isLoading && <Loading />}

            {!isLoading && (
                <Formik
                    initialValues={{
                        title: (selectedItem && selectedItem.project_title) || "",
                        ccid: (selectedItem && selectedItem.ccid) || "",
                        amountAwarded: (selectedItem && selectedItem.original_amount) || "",
                        amountAwardedCurrency: (selectedItem && selectedItem.original_amount_currency) || baseCurrency,
                        amountAwardedCalculated: (selectedItem && selectedItem.awarded_amount) || "",
                        funders: (selectedItem && selectedItem.funders) || [],
                        funded: (selectedItem && (selectedItem.funded === 1 || selectedItem.funded)) || false,
                        funderProjectId: (selectedItem && selectedItem.funder_project_id) || "",
                    }}
                    validationSchema={
                        Yup.object().shape({
                            title: Yup.string().required("Title is required"),
                            funded: Yup.string().required("Funded is required"),
                        })
                    }
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // same shape as initial values
                        console.log(values);
                        setIsLoading(true);
                        for (let item of values.funders) {
                            if (item.id === -1) {
                                item.name = newLabel.name;
                            }
                        }
                        if (!selectedItem) {
                            projectResearchActivityService.create({
                                title: values.title,
                                funded: values.funded,
                                funderProjectId: values.funderProjectId,
                                original_amount: values.amountAwarded,
                                original_amount_currency: values.amountAwardedCurrency,
                                awarded_amount: values.amountAwardedCalculated,
                                awarded_amount_currency: baseCurrency,
                                funders: values.funders.map(x => {
                                    return ({ id: x.id, name: x.name })
                                })
                            })
                                .then(data => {
                                    if (data) {
                                        console.log('projectResearchActivityService.create success', data);
                                        setSelectedItem(data);
                                        setIsLoading(false);
                                        setStepIndicator(currentStep + 1);
                                    }

                                })
                                .catch(error => {
                                    console.log('ERROR: projectResearchActivityService.create', error);
                                });
                        } else {
                            projectResearchActivityService.saveStep1({
                                id: selectedItem.id,
                                title: values.title,
                                funded: values.funded == 1,
                                funderProjectId: values.funderProjectId,
                                original_amount: values.amountAwarded,
                                original_amount_currency: values.amountAwardedCurrency,
                                awarded_amount: values.amountAwardedCalculated,
                                awarded_amount_currency: baseCurrency,
                                funders: values.funders.map(x => {
                                    return ({ id: x.id, name: x.name })
                                })
                            })
                                .then(data => {
                                    console.log('projectResearchActivityService.create success', data);
                                    setSelectedItem(data);
                                    setStepIndicator(currentStep + 1);
                                })
                                .catch(error => {
                                    console.log('ERROR: projectResearchActivityService.create', error);
                                });
                        }
                        ;
                    }}
                >
                    {({ setFieldValue, errors, touched, values }) => (
                        <Form
                            onKeyDown={onKeyDown}
                        >
                            {/* {console.log('values', values)} */}
                            <Row>
                                <div className="form-group col-sm-12 col-md-9">
                                    <div className="inline-form">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="Project Title"
                                                value={values.title}
                                                propName="title"
                                                errors={errors.title}
                                                touched={touched.title}
                                                setFieldValue={setFieldValue}
                                                required
                                                infoId="project-activity-title"
                                            />
                                        </Box>
                                    </div>
                                </div>

                                {values.ccid && (
                                    <div className="form-group col-sm-12 col-md-3">
                                        <Box display="flex" flexGrow={1}>
                                            <DkTextbox
                                                title="CCID"
                                                value={values.ccid}
                                                propName="ccid"
                                                errors={errors.ccid}
                                                touched={touched.ccid}
                                                setInfoId="project-activity-ccid"
                                            />

                                        </Box>
                                    </div>
                                )}

                                <div className="form-group col-sm-12">
                                    <DkRadioButtons
                                        title={"Funded"}
                                        rbName="funded"
                                        required
                                        options={fundedOptions}
                                        setFieldValue={setFieldValue}
                                        errors={errors.funded}
                                        touched={touched.funded}
                                        selectedValue={values.funded}
                                    />

                                </div>

                                {(values.funded === true || values.funded === 1) && (
                                    <React.Fragment>
                                        <div className="form-group col-sm-12">
                                            <Box display="flex" flexGrow={1}>
                                                <DkTextbox
                                                    title="Funder Project ID (if known)"
                                                    value={values.funderProjectId}
                                                    propName="funderProjectId"
                                                    errors={errors.funderProjectId}
                                                    touched={touched.funderProjectId}
                                                    setFieldValue={setFieldValue}
                                                    setInfoId="project-activity-funderProjectId"
                                                />
                                            </Box>
                                        </div>

                                        {funders && (
                                            <React.Fragment>
                                                <div className="form-group col-12">
                                                    <DkDropdown
                                                        title="Funders (max 3)"
                                                        propName="funders"
                                                        errors={errors.funders}
                                                        touched={errors.funders}
                                                        list={funders.map(x => {
                                                            return ({ value: x.id, name: x.name })
                                                        })}
                                                        disabled={values.funders && values.funders.length >= 3}
                                                        onChange={(e) => {
                                                            if (e.target.value === "-1") {
                                                                console.log("here");
                                                                setIsOpen(true)
                                                                const x = { id: -1, name: 'Others' }
                                                                setFieldValue("funders", [...values.funders, x]);
                                                                e.target.value = "-1";
                                                                return;
                                                            }
                                                            else {
                                                                console.log("here 2");
                                                                // setIsOpen(false)
                                                            }
                                                            const x = funders.find(f => f.id === e.target.value);
                                                            setFieldValue("funders", [...values.funders, x]);
                                                            e.target.value = "-1";
                                                        }}
                                                    />

                                                    <ListSingle list={values.funders}
                                                        setList={(e) => setFieldValue('funders', e)} />
                                                </div>
                                            </React.Fragment>
                                        )}
                                        {isOpen ?
                                            <div className="form-group col-sm-12">
                                                <Box display="flex" flexGrow={1}>
                                                    <DkTextbox
                                                        title="Other Funder Name"
                                                        value={newLabel.name}
                                                        propName="funderName"
                                                        errors={errors.funderProjectId}
                                                        touched={touched.funderProjectId}
                                                        setFieldValue={(e, value) => {
                                                            console.log("it ran from set")
                                                            setNewLabel({ id: -1, name: value })
                                                        }}
                                                        setInfoId="project-activity-funderProjectId"
                                                    />
                                                </Box>
                                            </div>
                                            : null}

                                        <div className="form-group col-sm-12 col-md-6">
                                            <Box display="flex" flexGrow={1}>
                                                <DkTextbox
                                                    title="Amount Awarded"
                                                    value={values.amountAwarded}
                                                    propName="amountAwarded"
                                                    errors={errors.amountAwarded}
                                                    touched={touched.amountAwarded}
                                                    onChange={(e) => {
                                                        setFieldValue("amountAwarded", e.target.value);
                                                        const x = getConvertedCurrency(
                                                            e.target.value,
                                                            values.amountAwardedCurrency
                                                        );
                                                        console.log("amountAwardedCalculated", x);
                                                        setFieldValue("amountAwardedCalculated", x);
                                                    }}
                                                />
                                                {currencies && (
                                                    <DkDropdown
                                                        title="Currency"
                                                        propName="amountAwardedCurrency"
                                                        errors={errors.amountAwardedCurrency}
                                                        touched={errors.amountAwardedCurrency}
                                                        selectedValue={values.amountAwardedCurrency}
                                                        list={currencies.map(x => {
                                                            return ({ value: x, name: x })
                                                        })}
                                                        onChange={(e) => {
                                                            setFieldValue("amountAwardedCurrency", e.target.value);
                                                            const x = getConvertedCurrency(
                                                                values.amountAwarded,
                                                                e.target.value
                                                            );
                                                            setFieldValue("amountAwardedCalculated", x);
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            {errors.amountAwarded && touched.amountAwarded ? (
                                                <ValidationError message={errors.amountAwarded} />
                                            ) : null}
                                        </div>

                                        {values.amountAwardedCurrency !== baseCurrency && (
                                            <div className="form-group col-sm-12 col-md-6">
                                                <Box display="flex" flexGrow={1}>
                                                    <DkTextbox
                                                        title={`${baseCurrency} Amount`}
                                                        value={values.amountAwardedCalculated}
                                                        propName="amountAwardedCalculated"
                                                        readonly
                                                    />
                                                    <DkDropdown
                                                        title="Currency"
                                                        propName="amountAwardedBaseCurrency"
                                                        selectedValue={baseCurrency}
                                                        list={[{ value: baseCurrency, name: baseCurrency }]}
                                                        infoId="amountAwardedBaseCurrency"
                                                        disabled
                                                    />
                                                </Box>
                                                {errors.amountAwarded && touched.amountAwarded ? (
                                                    <ValidationError message={errors.amountAwarded} />
                                                ) : null}
                                            </div>
                                        )}
                                    </React.Fragment>
                                )}
                            </Row>
                            <Row>
                                <div className="form-group col-sm-12">
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
// const LabelAdder = ({
//                         isOpen,
//                         newLabel,
//                         acronym,
//                         setAcronym,
//                         setNewLabel,
//                         setFunders,
//                         funders,
//                         values,
//                         toggle,
//                         setFieldValue
//                     }) => {
//     const save = () => {
//         setFieldValue("funders", [...values.funders, {id: -1, name: newLabel, acronym: acronym}]);

//         setFunders([...funders, {id: -1, name: newLabel, acronym: acronym}])
//         toggle()
//     };
//     return (
//         <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
//             <ModalHeader toggle={toggle} className="dk-modal-header">Add New Resource Label</ModalHeader>
//             <ModalBody>
//                 <div className="form-group col-sm-12">
//                     <div className="inline-form">
//                         <Box display="flex" flexGrow={1}>
//                             <DkTextbox
//                                 title="name"
//                                 onChange={(e) => setNewLabel(e.target.value)}
//                                 value={newLabel}
//                                 infoId="project-other-resource-link"
//                             />
//                         </Box>
//                     </div>
//                 </div>
//                 <div className="form-group col-sm-12">
//                     <div className="inline-form">
//                         <Box display="flex" flexGrow={1}>
//                             <DkTextbox
//                                 title="acronmy"
//                                 onChange={(e) => setAcronym(e.target.value)}
//                                 value={acronym}
//                                 infoId="project-other-resource-link"
//                             />
//                         </Box>
//                     </div>
//                 </div>
//             </ModalBody>
//             <ModalFooter>
//                 <button className="dk-btn dk-btn-blue" onClick={save}>
//                     Save
//                 </button>
//                 <button className="dk-btn dk-btn-blue" onClick={toggle}>
//                     Cancel
//                 </button>
//             </ModalFooter>
//         </Modal>
//     );
// };
export default ProjectType1x1;
