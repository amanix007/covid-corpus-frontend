import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
/* import reportsData from "../../mock/other-reports-mock.json"; */
import { otherResources } from "services/other-resources.services";
import Loading from "components/Loading";

class OtherReportDetails extends Component {
  state = {
    search: "",
    reportDetails: [],
    isLoading: true,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    otherResources.getById(id).then((data) => {
      this.setState({
        reportDetails: data,
        isLoading: false,
      });
    });
  }

  render() {
    let reportDetails = this.state.reportDetails;
    /* console.log("this.state.reportDetails ==> ", this.state.reportDetails) */

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
            <Loading />
          </Grid>
        )}

        {!this.state.isLoading && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
                <Box
                  textAlign="justify"
                  borderRadius={3}
                  mb={2}
                >
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

                  {/*{reportDetails && reportDetails.owner && (*/}
                  {/*  <Box*/}
                  {/*    textAlign="justify"*/}
                  {/*    borderRadius={3}*/}
                  {/*    */}
                  {/*    m={2}*/}
                  {/*    p={2}*/}
                  {/*  >*/}
                  {/*    <>*/}
                  {/*      <Box fontWeight="fontWeightBold" fontSize="h7.fontSize">*/}
                  {/*        Owner*/}
                  {/*      </Box>*/}
                  {/*      {reportDetails.owner}*/}
                  {/*    </>*/}
                  {/*  </Box>*/}
                  {/*)}*/}
                </Box>

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
                    {reportDetails && reportDetails.title && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Title :
                          </Box>
                        }
                        {reportDetails.title}
                      </Box>
                    )}
                  </Box>

                  <Box
                    textAlign="justify"
                    borderRadius={3}

                    m={2}
                  >
                    {reportDetails && reportDetails.fields && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Fields :
                          </Box>
                        }
                        {reportDetails.fields
                          .map((data, index) => {
                            return " " + data.category_full_name;
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
                    {reportDetails && reportDetails.subfield && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Subfield :
                          </Box>
                        }
                        {reportDetails.subfield}
                      </Box>
                    )}
                  </Box>

                  <Box
                    textAlign="justify"
                    borderRadius={3}

                    m={2}
                  >
                    {reportDetails && reportDetails.resource_type && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Resource Type :
                          </Box>
                        }
                        {reportDetails.resource_type}
                      </Box>
                    )}
                  </Box>

                  <Box
                    textAlign="justify"
                    borderRadius={3}

                    m={2}
                  >
                    {reportDetails && reportDetails.tags && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Tags :
                          </Box>
                        }
                        {reportDetails.tags
                          .map((data, index) => {
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
                    {reportDetails && reportDetails.summary && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Summary :
                          </Box>
                        }
                        {reportDetails.summary}
                      </Box>
                    )}{" "}
                  </Box>

                  <Box
                    textAlign="justify"
                    borderRadius={3}

                    m={2}
                  >
                    {reportDetails && reportDetails.link && (
                      <Box textAlign="justify" borderRadius={5} m={2}>
                        {
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="h7.fontSize"
                          >
                            Link:
                          </Box>
                        }
                        {
                          <p>
                            <a href="https://www.fer.unizg.hr/">
                              {reportDetails.link}
                            </a>
                          </p>
                        }
                      </Box>
                    )}
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

export default OtherReportDetails;
