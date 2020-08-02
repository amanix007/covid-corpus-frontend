import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
/* import reportsData from "../../mock/activity-reports-mock.json"; */
import {rActService} from "services/research-activities.services";
import Loading from "components/Loading";
import PublicIcon from "@material-ui/icons/Public";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core/styles";
// import jsPDF from 'jspdf'
import Button from "@material-ui/core/Button";
import {
    EmailIcon,
    EmailShareButton, FacebookIcon,
    FacebookShareButton, LinkedinIcon,
    LinkedinShareButton,
    MailruShareButton, TelegramIcon,
    TelegramShareButton, TwitterIcon,
    TwitterShareButton,
} from "react-share";

class ActivityReportDetails extends Component {

    state = {
        search: "",
        reportDetails: [],
        isLoading: true,
    };


    componentDidMount() {
        const id = this.props.match.params.id;
        rActService.getById(id).then((data) => {
            this.setState({
                reportDetails: data,
                isLoading: false,
            });
        });
    }

    render() {
        let reportDetails = this.state.reportDetails;
        console.log("reportDetails => ", reportDetails);
        const shareUrl = `http://www.covidcorpus.com:3001/Reports/Activity/ActivityReportDetails/${this.props.match.params.id}`;
        const title = 'Covid-Corpus';
        // const exportPdf = () => {
        //     var doc = new jsPDF();
        //     doc.setFontSize(20);
        //     doc.text("Reference Number :", 5, 10);
        //
        //     doc.setFontSize(14);
        //     doc.text(reportDetails.reference_number, 70, 10);
        //     doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2]);
        //     doc.line(5, 15, 200, 15);
        //
        //     doc.setFontSize(18);
        //     doc.text("Project Title :", 5, 25);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.project_title, 5, 32);
        //
        //     doc.setFontSize(18);
        //     doc.text("Funders (name) : ", 5, 42);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.funders && reportDetails.funders.length > 0 ?
        //         reportDetails.funders.map((data) => {
        //             return " " + data.name;
        //         })
        //             .toString() : 'No Data Available for Funders', 56, 42);
        //
        //     doc.setFontSize(18);
        //     doc.text("Funder Project Reference Number :", 5, 53);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.funder_project_id, 5, 60);
        //
        //     doc.setFontSize(18);
        //     doc.text("Original Amount :", 5, 70);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.awarded_amount +
        //         " " +
        //         reportDetails.awarded_amount_currency, 5, 78);
        //
        //     doc.setFontSize(18);
        //     doc.text("Research Type :", 5, 87);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.research_project_information.research_project_type, 53, 87);
        //
        //     doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2]);
        //     doc.line(5, 92, 200, 92);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Research Abstract : ", 5, 100);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.research_project_information &&
        //         reportDetails.research_project_information.summary, 5, 108);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Keywords:", 5, 119);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.research_project_information &&
        //         reportDetails.research_project_information.tags.map(
        //             (data) => (
        //                 data.name + ' , '
        //             )
        //         ), 5, 125);
        //
        //     doc.setFontSize(18);
        //     doc.text("Study Designs :", 5, 135);
        //
        //     doc.setFontSize(13);
        //     doc.text( reportDetails.research_project_information &&
        //         reportDetails.research_project_information
        //             .study_design, 5, 142);
        //
        //     doc.setFontSize(18);
        //     doc.text("link :", 5, 152);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.research_project_information.link, 5, 158);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Primary WHO Research Priorities :", 5, 167);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.primary_who_research_priority_subcategories
        //         .map((data) => {
        //             return " " + data.category_name;
        //         })
        //         .toString(), 5, 175);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Secondary WHO Research Priorities :", 5, 187);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.secondary_who_research_priority_subcategories
        //         .map((data) => {
        //             return " " + data.category_name;
        //         })
        //         .toString(), 5, 195);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("WHO Immediate Research Actions :", 5, 207);
        //
        //     doc.setFontSize(13);
        //     doc.text("Clinical characterization and management ", 5, 215);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Countries:", 5, 225);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.countries
        //         .map((data) => {
        //             return " " + data.name;
        //         })
        //         .toString(), 36, 225);
        //
        //     doc.setFontSize(18);
        //     doc.text("Start Date:", 5, 235);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.start_date, 368, 235);
        //
        //     doc.setFontSize(18);
        //     doc.text("End Date:", 70, 235);
        //
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.end_date, 100, 235);
        //
        //     doc.setFontSize(18);
        //     doc.text("Duration:", 150, 235);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.project_duration+" days ", 180, 235);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Lead Institution : ", 5, 245);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.lead_institution, 52, 245);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Principal Investigators : ", 5, 255);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.principal_investigators
        //         .map((data) => {
        //             return " " + data.name;
        //         })
        //         .toString(), 73, 255);
        //
        //     doc.setFontSize(18);
        //     doc.text("Collaborators : ", 5, 265);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.collaborators
        //         .map((data) => {
        //             return " " + data.name;
        //         })
        //         .toString(), 50, 265);
        //
        //
        //     doc.setFontSize(18);
        //     doc.text("Local Implementing Partners : ", 5, 275);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.local_implementing_partners
        //         .map((data) => {
        //             return " " + data.name;
        //         })
        //         .toString(), 92, 275);
        //
        //     doc.setFontSize(18);
        //     doc.text("Project Status : ", 5, 285);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.status, 50, 285);
        //
        //     doc.setFontSize(18);
        //     doc.text("Open To Collaborators : ", 5, 295);
        //     doc.setFontSize(13);
        //     doc.text(reportDetails.open_to_collaborators === 1 ? "Yes" : "No", 75, 295);
        //
        //     doc.save(this.props.match.params.id+'.pdf')
        // }


        return (
            <React.Fragment>
                {this.state.isLoading && (
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Loading/>
                    </Grid>
                )}

                {!this.state.isLoading && (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="mt-12">
                                {/*<div className="mt-2">*/}
                                {/*    <Button*/}
                                {/*        onClick={() => exportPdf()}*/}
                                {/*        variant="contained"*/}
                                {/*        style={{*/}
                                {/*            color: "#FFF",*/}
                                {/*            backgroundColor: "#23B0DE",*/}
                                {/*        }}>*/}
                                {/*        Export*/}
                                {/*    </Button>*/}
                                {/*</div>*/}
                                <div className="mt-3">

                                    <EmailShareButton
                                        url={shareUrl}
                                        subject={title}
                                        body="body"
                                        className="Demo__some-network__share-button"
                                    >
                                        <EmailIcon size={32} round/>
                                    </EmailShareButton>
                                    {/*<FacebookShareButton*/}
                                    {/*    url={shareUrl}*/}
                                    {/*    quote={title}*/}
                                    {/*    className="Demo__some-network__share-button"*/}
                                    {/*>*/}
                                    {/*    <FacebookIcon size={32} round/>*/}
                                    {/*</FacebookShareButton>*/}
                                    {/*<LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">*/}
                                    {/*    <LinkedinIcon size={32} round/>*/}
                                    {/*</LinkedinShareButton>*/}
                                    {/*<TelegramShareButton*/}
                                    {/*    url={shareUrl}*/}
                                    {/*    title={title}*/}
                                    {/*    className="Demo__some-network__share-button"*/}
                                    {/*>*/}
                                    {/*    <TelegramIcon size={32} round/>*/}
                                    {/*</TelegramShareButton>*/}
                                    {/*<TwitterShareButton*/}
                                    {/*    url={shareUrl}*/}
                                    {/*    title={title}*/}
                                    {/*    className="Demo__some-network__share-button"*/}
                                    {/*>*/}
                                    {/*    <TwitterIcon size={32} round/>*/}
                                    {/*</TwitterShareButton>*/}
                                </div>
                            </div>


                            {/*<div>*/}
                            {/*  {reportDetails && reportDetails.owner && (*/}
                            {/*      <Box*/}
                            {/*          textAlign="justify"*/}
                            {/*          borderRadius={3}*/}
                            {/*          className='d-flex'*/}
                            {/*          m={2}*/}
                            {/*          p={2}>*/}
                            {/*          <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">*/}
                            {/*            Owner :*/}
                            {/*          </Box>*/}
                            {/*        <div className='ml-3'>*/}
                            {/*          {reportDetails.owner}*/}
                            {/*        </div>*/}
                            {/*      </Box>*/}
                            {/*  )}*/}
                            {/*</div>*/}
                            <div>
                                {reportDetails && reportDetails.reference_number && (
                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        className='d-flex align-items-center'
                                        m={2}
                                        p={2}
                                    >
                                        <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                                            Reference Number :
                                        </Box>
                                        <div className='ml-3'>
                                            {reportDetails.reference_number}
                                        </div>
                                    </Box>
                                )}

                                <div style={{border: '1px dashed', marginBottom: '20px'}}/>
                                <Box
                                    textAlign="justify"
                                    borderRadius={3}
                                    style={{
                                        border: "1px solid #ededed",
                                        boxShadow: '0px 2px 9px 5px rgb(0,0,0,0.09)',
                                        borderRadius: '15px'
                                    }}
                                    mb={2}
                                >
                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        m={2}>
                                        {reportDetails && reportDetails.project_title && (
                                            <Box textAlign="justify" p={2} pb={0}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Project Title :
                                                    </Box>
                                                }
                                                <h4>{reportDetails.project_title}</h4>
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        m={2}
                                    >
                                        {reportDetails && reportDetails.funders && (
                                            <Box textAlign="justify"
                                                 className='d-flex'
                                                 borderRadius={3} p={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Funders (name) :
                                                    </Box>
                                                }
                                                {reportDetails.funders && reportDetails.funders.length > 0 ?
                                                    reportDetails.funders.map((data) => {
                                                        return " " + data.name;
                                                    })
                                                        .toString() : 'No Data Available for Funders'}
                                            </Box>
                                        )}

                                        {(reportDetails && reportDetails.funder_project_id) ? (
                                            <Box textAlign="justify" p={2} pt={0}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Funder Project Reference Number
                                                    </Box>
                                                }
                                                {reportDetails.funder_project_id}
                                            </Box>
                                        ) : <Box textAlign="justify" p={2} pt={0}>
                                            {
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    fontSize="h7.fontSize"
                                                >
                                                    Funder Project Reference Number
                                                </Box>
                                            }
                                            No Data Found
                                        </Box>}
                                    </Box>

                                    {reportDetails && reportDetails.original_amount && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            style={{border: "1px solid #636c77"}}
                                            p={2}
                                            m={2}
                                            mt={0}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Original Amount
                                                </Box>
                                            }
                                            {reportDetails.awarded_amount +
                                            " " +
                                            reportDetails.awarded_amount_currency}
                                        </Box>
                                    )}

                                    {/* ###################################################  - if biomedical research - ################################################################ */}

                                    {reportDetails &&
                                    reportDetails.research_project_information &&
                                    reportDetails.research_project_information
                                        .research_project_type &&
                                    String(
                                        reportDetails.research_project_information.research_project_type
                                            .toLowerCase()
                                            .trim()
                                    ) === "biomedical research" && (
                                        <div>
                                            <Box
                                                textAlign="justify"
                                                className='d-flex'
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Research Type
                                                        :{reportDetails.research_project_information.research_project_type}
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information
                                                    .research_questions &&
                                                reportDetails.research_project_information.research_questions.map(
                                                    (data) => {
                                                        return " " + data.content;
                                                    }
                                                )}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                style={{borderTop: "1px dashed #636c77"}}
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Research Abstract
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information &&
                                                reportDetails.research_project_information.summary}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                        mb={1}
                                                    >
                                                        Keywords
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information &&
                                                reportDetails.research_project_information.tags.map(
                                                    (data) => (
                                                        <Chip
                                                            variant="outlined"
                                                            size="small"
                                                            label={data.name}
                                                            className="mr-1"
                                                        />
                                                    )
                                                )}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Study Design :
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information &&
                                                reportDetails.research_project_information
                                                    .study_design}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Population :
                                                    </Box>
                                                }
                                                {
                                                    reportDetails.research_project_information
                                                        .population
                                                }
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Intervention :
                                                    </Box>
                                                }
                                                {
                                                    reportDetails.research_project_information
                                                        .intervention
                                                }
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Comparator :
                                                    </Box>
                                                }
                                                {
                                                    reportDetails.research_project_information
                                                        .comparator
                                                }
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Outcome :
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information.outcome}
                                            </Box>
                                        </div>
                                    )}

                                    {/* ###################################################  - if non biomedical or other - ################################################################ */}

                                    {reportDetails &&
                                    reportDetails.research_project_information &&
                                    reportDetails.research_project_information
                                        .research_project_type &&
                                    String(
                                        reportDetails.research_project_information.research_project_type
                                            .toLowerCase()
                                            .trim()
                                    ) !== "biomedical research" && (
                                        <div>
                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Research Type
                                                        :{reportDetails.research_project_information.research_project_type}
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information
                                                    .research_questions &&
                                                reportDetails.research_project_information.research_questions.map(
                                                    (data) => {
                                                        return " " + data.content;
                                                    }
                                                )}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                style={{borderTop: "1px dashed #636c77"}}
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Research Abstract
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information &&
                                                reportDetails.research_project_information.summary}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                        mb={1}
                                                    >
                                                        Keywords :
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information &&
                                                reportDetails.research_project_information.tags.map(
                                                    (data) => (
                                                        <Chip
                                                            variant="outlined"
                                                            size="small"
                                                            label={data.name}
                                                            className="mr-1"
                                                        />
                                                    )
                                                )}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                bgcolor="background.paper"
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Study Designs :
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information &&
                                                reportDetails.research_project_information
                                                    .study_design}
                                            </Box>

                                            <Box
                                                textAlign="justify"
                                                borderRadius={3}
                                                className='d-flex'
                                                bgcolor="background.paper"
                                                m={2}
                                                p={2}
                                            >
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Link :
                                                    </Box>
                                                }
                                                {reportDetails.research_project_information.link}
                                            </Box>
                                        </div>
                                    )}

                                    {reportDetails && reportDetails.primary_who_research_priority_subcategories && reportDetails.primary_who_research_priority_subcategories.length > 0 ? (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    fontSize="h7.fontSize"
                                                >
                                                    Primary WHO Research Priorities :
                                                </Box>
                                            }
                                            {reportDetails.primary_who_research_priority_subcategories
                                                .map((data) => {
                                                    return " " + data.category_name;
                                                })
                                                .toString()}
                                        </Box>
                                    ) : <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        m={2}
                                        p={2}
                                    >
                                        {
                                            <Box
                                                fontWeight="fontWeightBold"
                                                fontSize="h7.fontSize"
                                            >
                                                Primary WHO Research Priorities :
                                            </Box>
                                        }
                                        No Data Found
                                    </Box>}

                                    {reportDetails && reportDetails.secondary_who_research_priority_subcategories && reportDetails.secondary_who_research_priority_subcategories.length > 0 ? (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    fontSize="h7.fontSize"
                                                >
                                                    Secondary WHO Research Priorities :
                                                </Box>
                                            }
                                            {reportDetails.secondary_who_research_priority_subcategories
                                                .map((data) => {
                                                    return " " + data.category_name;
                                                })
                                                .toString()}
                                        </Box>
                                    ) : <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        m={2}
                                        p={2}
                                    >
                                        {
                                            <Box
                                                fontWeight="fontWeightBold"
                                                fontSize="h7.fontSize"
                                            >
                                                Secondary WHO Research Priorities :
                                            </Box>
                                        }
                                        No Data Found
                                    </Box>}

                                    {reportDetails &&
                                    reportDetails.who_immediate_research_actions && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    fontSize="h7.fontSize"
                                                >
                                                    WHO Immediate Research Actions
                                                </Box>
                                            }
                                            {reportDetails.who_immediate_research_actions
                                                .map((data) => {
                                                    return data.name + ": " + data.description;
                                                })
                                                .toString()}
                                        </Box>
                                    )}
                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        m={2}
                                        p={2}
                                    >
                                        {reportDetails && reportDetails.countries && (
                                            <>
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    fontSize="h7.fontSize"
                                                    display="flex"
                                                >
                                                    Countries :
                                                </Box>

                                                <div className="mt-1 mb-2">
                                                    {reportDetails.countries
                                                        .map((data) => {
                                                            return " " + data.name;
                                                        })
                                                        .toString()}
                                                </div>
                                            </>
                                        )}

                                        {reportDetails &&
                                        reportDetails.additional_location_details && (
                                            <>
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    fontSize="h7.fontSize"
                                                >
                                                    Additional Location Details
                                                </Box>

                                                {reportDetails.additional_location_details}
                                            </>
                                        )}
                                    </Box>
                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}
                                        display="flex"
                                        style={{border: "1px dashed #636c77"}}
                                        m={2}
                                        p={0}
                                    >
                                        <Grid
                                            item
                                            xs={4}
                                            style={{
                                                display: "flex",
                                                padding: "20px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            direction="column"
                                        >
                                            {reportDetails && reportDetails.start_date && (
                                                <>
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                        display="flex"
                                                    >
                                                        <DateRangeIcon className="mr-1"/> Start Date
                                                    </Box>

                                                    {reportDetails.start_date}
                                                </>
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            style={{
                                                display: "flex",
                                                padding: "20px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            direction="column"
                                        >
                                            {reportDetails && reportDetails.end_date && (
                                                <>
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                        display="flex"
                                                    >
                                                        <DateRangeIcon className="mr-1"/> End Date
                                                    </Box>
                                                    {reportDetails.end_date}
                                                </>
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            style={{
                                                display: "flex",
                                                padding: "20px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            direction="column"
                                        >
                                            {reportDetails && reportDetails.project_duration && (
                                                <>
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Project Duration
                                                    </Box>

                                                    {reportDetails.project_duration} days
                                                </>
                                            )}
                                        </Grid>
                                    </Box>

                                    {reportDetails && reportDetails.key_milestones && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            style={{border: "1px solid #636c77"}}
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Key Milestones
                                                </Box>
                                            }
                                            {reportDetails.key_milestones}
                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.lead_institution && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            className='d-flex'
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Lead Institution :
                                                </Box>
                                            }
                                            <div className='ml-3'>
                                                {reportDetails.lead_institution}
                                            </div>
                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.principal_investigators && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            className='d-flex'
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Principal Investigators :
                                                </Box>
                                            }
                                            <div className='ml-3'>
                                                {reportDetails.principal_investigators
                                                    .map((data) => {
                                                        return " " + data.name;
                                                    })
                                                    .toString()}
                                            </div>

                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.collaborators && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            className='d-flex'
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Collaborators :
                                                </Box>
                                            }
                                            {reportDetails.collaborators
                                                .map((data) => {
                                                    return " " + data.name;
                                                })
                                                .toString()}
                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.local_implementing_partners && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            className='d-flex'
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Local Implementing Partners :
                                                </Box>
                                            }
                                            {reportDetails.local_implementing_partners
                                                .map((data) => {
                                                    return " " + data.name;
                                                })
                                                .toString()}
                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.data_sharing_way && (
                                        <Box
                                            textAlign="justify"
                                            className='d-flex'
                                            borderRadius={3}
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Data Sharing Way :
                                                </Box>
                                            }
                                            {reportDetails.data_sharing_way}
                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.status && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            className='d-flex'
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Project Status :
                                                </Box>
                                            }
                                            <div className='ml-3'>
                                                {reportDetails.status}
                                            </div>
                                        </Box>
                                    )}

                                    {reportDetails && reportDetails.status && (
                                        <Box
                                            textAlign="justify"
                                            borderRadius={3}
                                            className='d-flex'
                                            m={2}
                                            p={2}
                                        >
                                            {
                                                <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">
                                                    Open To Collaborators :
                                                </Box>
                                            }
                                            <div className='ml-3'>
                                                {reportDetails.open_to_collaborators === 1 ? "Yes" : "No"}
                                            </div>
                                        </Box>
                                    )}


                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </React.Fragment>
        );
    }
}

export default ActivityReportDetails;
