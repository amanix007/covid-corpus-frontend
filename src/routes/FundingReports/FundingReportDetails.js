import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
/* import reportsData from "../../mock/funding-reports-mock.json"; */
import {fOppService} from "services/funding-opportunities.services";
import Loading from "components/Loading";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Button from "@material-ui/core/Button";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";
// import jsPDF from 'jspdf'

class FundingReportDetails extends Component {
    /* console.log("FundingReportDetails.props => ", props); */
    state = {
        search: "",
        reportDetails: [],
        isLoading: true,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        fOppService.getById(id).then((data) => {
            this.setState({
                reportDetails: data,
                isLoading: false,
            });
        });
    }

    render() {
        /* console.log("this.state.reportDetails.funders => ", this.state.reportDetails); */
        let reportDetails = this.state.reportDetails;
        const shareUrl = `http://www.covidcorpus.com:3001/Reports/Funding/FundingReportDetails/${this.props.match.params.id}`;
        const title = 'Covid-Corpus';

        // const exportPdf = () => {
        //     var doc = new jsPDF();
        //     if (reportDetails && reportDetails.reference_number) {
        //         doc.setFontSize(20);
        {/*        doc.text("Reference Number :", 5, 10);*/}

        //         doc.setFontSize(14);
        //         doc.text(reportDetails.reference_number, 70, 10);
        //         doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2]);
        //         doc.line(5, 15, 200, 15);
        //     }
        //     if (reportDetails && reportDetails.funders) {
        //         doc.setFontSize(18);
        //         doc.text("Funders (name) : ", 5, 42);
        //
        //         doc.setFontSize(13);
        {/*        doc.text(reportDetails.funders*/}
        {/*            .map((data) => {*/}
        {/*                return " " + data.name;*/}
        {/*            })*/}
        //             .toString(), 56, 42);
        //     }
        //
        //     if (reportDetails && reportDetails.funding_call_name) {
        {/*        doc.setFontSize(18);*/}
        {/*        doc.text("Funding Call Name:", 5, 53);*/}

        {/*        doc.setFontSize(13);*/}
        {/*        doc.text(reportDetails.funding_call_name, 5, 60);*/}
        {/*    }*/}

        {/*    if (reportDetails && reportDetails.other_milestones) {*/}
        {/*        doc.setFontSize(18);*/}
        {/*        doc.text("Other Milestones", 5, 70);*/}

        {/*        doc.setFontSize(13);*/}
        {/*        doc.text(reportDetails.other_milestones, 5, 78);*/}
        {/*    }*/}

        //     if (reportDetails && reportDetails.funding_decision_announced) {
        //         doc.setFontSize(18);
        //         doc.text("Funding Decision Announced :", 5, 87);
        //
        {/*        doc.setFontSize(13);*/}
        {/*        doc.text(reportDetails.funding_decision_announced, 5, 92);*/}
        {/*    }*/}
        //     if (reportDetails && reportDetails.eligibility) {
        //         doc.setFontSize(18);
        //         doc.text("Eligibility :", 5, 108);
        //
        //         doc.setFontSize(13);
        {/*        doc.text(reportDetails.eligibility, 5, 119);*/}
        {/*    }*/}
        {/*    if (reportDetails && reportDetails.funding_type) {*/}
        //         doc.setFontSize(18);
        //         doc.text("Funding Type :", 5, 125);
        //
        //         doc.setFontSize(13);
        //         doc.text(reportDetails.funding_type, 5, 135);
        {/*    }*/}
        {/*    if (reportDetails && reportDetails.summary) {*/}
        //         doc.setFontSize(18);
        //         doc.text("Summary :", 5, 152);
        //
        //         doc.setFontSize(13);
        {/*        doc.text(reportDetails.summary, 5, 158);*/}
        {/*    }*/}
        {/*    // if(reportDetails && reportDetails.fields){*/}
        //     //   doc.setFontSize(18);
        //     //   doc.text("Fields :", 5, 25);
        //     //
        //     //   doc.setFontSize(13);
        //     //   doc.text(reportDetails.reportDetails.fields
        //     //       .map((data) => {
        {/*    //           return " " + data.full_name;*/}
        {/*    //       })*/}
        {/*    //       .toString(), 5, 32);*/}
        //     // }
        //     if (reportDetails && reportDetails.who_research_priority_subcategories) {
        //         doc.setFontSize(18);
        //         doc.text("Who Research Priority Subcategories :", 5, 167);
        //
        //         doc.setFontSize(13);
        //         doc.text(reportDetails.who_research_priority_subcategories
        //             .map((data) => {
        //                 return " " + data.category_name;
        //             })
        //             .toString(), 5, 175);
        //     }
        //     if (reportDetails && reportDetails.opening_date) {
        //         doc.setFontSize(18);
        {/*        doc.text("Opening Date :", 5, 187);*/}

        {/*        doc.setFontSize(13);*/}
        {/*        doc.text(reportDetails.opening_date, 5, 195);*/}
        {/*    }*/}
        //     if (reportDetails && reportDetails.deadline) {
        //         doc.setFontSize(18);
        //         doc.text("Deadline :", 5, 207);
        //
        //         doc.setFontSize(13);
        //         doc.text(reportDetails.deadline, 5, 215);
        //     }
        //
        //     doc.save(this.props.match.params.id + '.pdf')
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
                                {/*<div className="mt-7"></div>*/}
                                {/*<div className="mt-2">*/}
                                {/*  <Button*/}
                                {/*      onClick={() => exportPdf()}*/}
                                {/*      variant="contained"*/}
                                {/*      style={{*/}
                                {/*        color: "#FFF",*/}
                                {/*        backgroundColor: "#23B0DE",*/}
                                {/*      }}>*/}
                                {/*    Export*/}
                                {/*  </Button>*/}
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
                                    {/*  <FacebookIcon size={32} round/>*/}
                                    {/*</FacebookShareButton>*/}
                                    {/*<LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">*/}
                                    {/*  <LinkedinIcon size={32} round/>*/}
                                    {/*</LinkedinShareButton>*/}
                                    {/*<TelegramShareButton*/}
                                    {/*    url={shareUrl}*/}
                                    {/*    title={title}*/}
                                    {/*    className="Demo__some-network__share-button"*/}
                                    {/*>*/}
                                    {/*  <TelegramIcon size={32} round/>*/}
                                    {/*</TelegramShareButton>*/}
                                    {/*<TwitterShareButton*/}
                                    {/*    url={shareUrl}*/}
                                    {/*    title={title}*/}
                                    {/*    className="Demo__some-network__share-button"*/}
                                    {/*>*/}
                                    {/*  <TwitterIcon size={32} round/>*/}
                                    {/*</TwitterShareButton></div>*/}
                                </div>
                            </div>

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
                                            Reference Number:
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

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.funders && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Funders :
                                                    </Box>
                                                }
                                                {reportDetails.funders
                                                    .map((data) => {
                                                        return " " + data.name;
                                                    })
                                                    .toString()}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.funding_call_name && (
                                            <Box textAlign="justify" m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Funding Call Name:
                                                    </Box>
                                                }
                                                {reportDetails.funding_call_name}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.other_milestones && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Other Milestones:
                                                    </Box>
                                                }
                                                {reportDetails.other_milestones}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.funding_decision_announced && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Funding Decision Announced :
                                                    </Box>
                                                }
                                                {reportDetails.funding_decision_announced}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.eligibility && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Eligibility :
                                                    </Box>
                                                }
                                                {reportDetails.eligibility}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.funding_type && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Funding Type :
                                                    </Box>
                                                }
                                                {reportDetails.funding_type}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.summary && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Research Abstract :
                                                    </Box>
                                                }
                                                {reportDetails.summary}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails && reportDetails.fields && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Fields :
                                                    </Box>
                                                }
                                                {reportDetails.fields
                                                    .map((data) => {
                                                        return " " + data.full_name;
                                                    })
                                                    .toString()}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        textAlign="justify"
                                        borderRadius={3}

                                        m={2}
                                    >
                                        {reportDetails &&
                                        reportDetails.who_research_priority_subcategories && (
                                            <Box textAlign="justify" borderRadius={3} m={2}>
                                                {
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Who Research Priority Subcategories:
                                                    </Box>
                                                }
                                                {reportDetails.who_research_priority_subcategories
                                                    .map((data) => {
                                                        return " " + data.category_name;
                                                    })
                                                    .toString()}
                                            </Box>
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
                                                borderRight: "1px solid #ededed",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            direction="column"
                                        >
                                            {reportDetails && reportDetails.opening_date && (
                                                <>
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                        display="flex"
                                                    >
                                                        <DateRangeIcon className="mr-1"/> Opening Date
                                                    </Box>

                                                    {reportDetails.opening_date}
                                                </>
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            style={{
                                                display: "flex",
                                                padding: "20px",
                                                borderRight: "1px solid #ededed",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            direction="column"
                                        >
                                            {reportDetails && reportDetails.deadline && (
                                                <>
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                        display="flex"
                                                    >
                                                        <DateRangeIcon className="mr-1"/> Deadline
                                                    </Box>
                                                    {reportDetails.deadline}
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
                                            {reportDetails && reportDetails.link && (
                                                <>
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        fontSize="h7.fontSize"
                                                    >
                                                        Link
                                                    </Box>

                                                    {
                                                        <a href="https://www.fer.unizg.hr/">
                                                            {reportDetails.link}
                                                        </a>
                                                    }
                                                </>
                                            )}
                                        </Grid>
                                    </Box>
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </React.Fragment>
        );
    }
}

export default FundingReportDetails;
