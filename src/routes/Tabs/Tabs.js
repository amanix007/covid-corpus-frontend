import React, { useState } from "react";
import './tabs.css'
import queryString from 'query-string';
import { advancedSearchService } from 'services/advanced-search.service';
import { otherResearchFieldCategory } from '../../services';
import ActivityCollapsibleTable from "../../components/ActivityCollapsibleTable";
import OtherCollapsibleTable from "../../components/OtherCollapsibleTable";
import FundingCollapsibleTable from "../../components/FundingCollapsibleTable";
import Grid from "@material-ui/core/Grid";
import Loading from "components/Loading";
import { Col, Row } from "reactstrap";

const SearchResult = (props) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [category, setCategory] = React.useState(null);
    const [researchProjects, setResearchProjects] = React.useState([]);
    const [fundingOpportunities, setFundingOpportunities] = React.useState([]);
    const [otherResources, setOtherResources] = React.useState([]);
    const headerRef = React.useRef(null);

    React.useEffect(() => {
        const query = queryString.parse(props.location.search);
        if (query['mode'] === 'component') {
            setIsLoading(true)
            advancedSearchService.searchByParams(props.location.search).then(response => {
                if (response) {
                    setIsLoading(false)
                    setFundingOpportunities(response.funding_opportunities?response.funding_opportunities:[])
                    setOtherResources(response.other_resources?response.other_resources:[])
                    setResearchProjects(response.research_projects?response.research_projects:[])
                }
            }).catch(err => {
                setIsLoading(false)
            })
        } else {
            if (query['category']) {
                setIsLoading(true);
                if(query['category']==='1'){
                    let name='Biomedical Research';
                    setCategory(name);
                    advancedSearchService.getByCategory(name).then(response => {
                        if (response) {
                            setIsLoading(false);
                            setFundingOpportunities(response.funding_opportunities);
                            setOtherResources(response.other_resources);
                            setResearchProjects(response.research_projects);
                        }
                    })
                }else if(query['category']==='3'){
                    let name='Other';
                    setCategory(name);
                    advancedSearchService.getByCategory(name).then(response => {
                        if (response) {
                            setIsLoading(false);
                            setFundingOpportunities(response.funding_opportunities);
                            setOtherResources(response.other_resources);
                            setResearchProjects(response.research_projects);
                        }
                    })
                }else{
                    otherResearchFieldCategory.getById(query['category']).then((data) => {
                        if (data) {
                            setCategory(data.name);
                            data.name = data.name.replace('&', '%26')
                            advancedSearchService.getByCategory(data.name).then(response => {
                                if (response) {
                                    setIsLoading(false)
                                    setFundingOpportunities(response.funding_opportunities)
                                    setOtherResources(response.other_resources)
                                    setResearchProjects(response.research_projects)
                                }
                            })
                        }
                    });
                }
            }
        }
    }, [])
    return (
        <React.Fragment>
            {isLoading && (
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
            {!isLoading && (
                <div className="w-100">
                    {category && (
                        <Row>
                            <Col>
                                <h3 ref={headerRef}>Results Of {category}</h3>
                            </Col>
                        </Row>
                    )}
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#home">Research Project</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#menu1">Funding Opportunities</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#menu2">Other Resources</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane container active" id="home">
                            <ActivityCollapsibleTable rows={researchProjects} />
                        </div>
                        <div className="tab-pane container fade" id="menu1">
                            <FundingCollapsibleTable rows={fundingOpportunities} />
                        </div>
                        <div className="tab-pane container fade" id="menu2">
                            <OtherCollapsibleTable rows={otherResources} />
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default SearchResult