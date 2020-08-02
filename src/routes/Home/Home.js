import React from 'react';
import { NavLink } from 'react-router-dom';
import { blogCategoryService, partnerService, otherResearchFieldCategory, projectFundingOpportunityService } from '../../services';
import Paging from 'components/Paging';
import ListSingle from 'components/ListSingle';
import Search from 'components/Search';
import { Link } from 'react-router-dom';
import { ccToast } from 'helpers/CommonFunctions';

const Home = () => {
    const [blogCategories, setBlogCategories] = React.useState(null);
    const [pageId, setPageId] = React.useState(1);
    const [partners, setPartners] = React.useState([]);
    const [researchCategories, setResearchCategories] = React.useState([]);
    const [fundingOpportunities, setFundingOpportunities] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchCategory, setSearchCategory] = React.useState("All");
    React.useEffect(() => {
        blogCategoryService.getActive().then((data) => setBlogCategories(data));
        partnerService.getActive().then(data => { setPartners(data) });
        // otherResearchFieldCategory.getActive().then(data => {
        //     data.sort((a, b) => (a.name > b.name) ? 1 : -1); setResearchCategories(data)
        // });
        otherResearchFieldCategory.getFieldTypes().then((data) => {
            // data.sort((a, b) => (a.name > b.name) ? 1 : -1); 
            setResearchCategories(data)
        });
        projectFundingOpportunityService.getApprovedItems().then(data => { setFundingOpportunities(data) });
    }, []);

    function handleSeeMoreClick() {
        setPageSize(fundingOpportunities.length);
    }

    function handleSeeLessClick() {
        setPageSize(10);
    }

    function handleSearchCategoryClick(event) {
        setSearchCategory(event.target.text)
    }

    function handleSubmitSearchInput(event) {
        if (event.key == 'Enter') {
            searchAction();
        }
    }

    function handleSubmitSearch() {
        searchAction();
    }

    function searchAction() {
        var searchText = window.document.getElementById('searchBox').value;
        console.log(searchCategory, searchText);
    }

    const HeaderSection = ({ headerText }) => (
        <div className="left-bordered-title">
            <p className="section__title">{headerText}</p>
        </div>
    );





    const PartnerCarouselItems = ({ partnerList }) => (
        <div className="carousel-inner">
            {partnerList.map((partner, index) => {

                return (
                    <div className={"carousel-item" + (index == 0 ? ' active' : '')} key={index} >
                        <div className="carousel-caption">
                            <a href={`${partner.link}`}
                                tooltip={`${partner.name}`}
                                target="_blank">
                                <img src={`${process.env.REACT_APP_IMAGES_PATH}${partner.logo}`} className='partner-logo' />
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const WelcomeMessage = () => (
        <div className="col-sm-12 col-md-12">
            <br />
            <br />
            <HeaderSection headerText="Our Mission" />
            <p>
                The aim of <b>Covid Corpus</b> is to facilitate the compilation of all ongoing research activity on COVID-19 globally,
                and so decrease the chance of duplication, and help increase the possibility of collaboration and coordination
                between researchers on COVID-19, with the aim of increasing efficiency and impact.
            </p>
            <p>
                The open-access database includes all disciplines of research, ranging from the biomedical and life sciences,
                to engineering and physical sciences, socioeconomic, behavioural and  cultural research. It also include all forms
                and methodologies of research, both formally ‘funded’ or unfunded researcher
            </p>

            <p>
                Covid Corpus has three components:
                <ul>
                    <li>
                        A database of all ongoing research activity on COVID-19 – funded and unfunded.
                    </li>
                    <li>
                        A database of current funding calls on COVID-19
                    </li>
                    <li>
                        Analytics suite to enable the interrogation of current research activity to help researchers and funders identify
                    </li>
                </ul>
            </p>
            <p>
                The more populated the database becomes, the more useful it will be. So please join and register your projects now!
            </p>
        </div>
    );

    /** TODO: These items should be returned from the database, not hardcoded */
    const TeamCarouselItems = () => (
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/james-bridge.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">James Bridge</h3>
                                <span className="post">Chief Executive Officer, Secretary-General of the UK National Commission for UNESCO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/richard-haywood.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">Richard Haywood</h3>
                                <span className="post">University of Birmingham Deputy Pro-Chancellor</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/andrew-mitchell.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">The Rt. Hon. MP Andrew Mitchell</h3>
                                <span className="post">Politician</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/sandie-okoro.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">Sandie Okoro</h3>
                                <span className="post">Senior Vice President and General Counsel at the World Bank Group</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/mark-rowley.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">Sir Mark Rowley</h3>
                                <span className="post">Senior Police Officer (Retired)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/duncan-selbie.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">Duncan Selbie</h3>
                                <span className="post">Chief Executive Public Health England</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="our-team">
                            <div className="pic">
                                <img src="images/members/derek-southall.png" />
                            </div>
                            <div className="team-content">
                                <h3 className="title">Derek Southall</h3>
                                <span className="post">Founder and CEO Hyperscale Group Limited</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const SubjectList = ({ categories }) => {
        console.log('categories:', categories)
        return (<div className="list-group list-group-flush">
            {categories.map((category, index) => {
                return (
                    <NavLink className="list-group-item list-group-item-action flex-column align-items-start"
                        key={index}
                        to={'/SearchResult?category=' + category.value}>
                        <h5 className="mb-1">{category.name}</h5>
                    </NavLink>

                    // <a href={category.link}
                    //     className="list-group-item list-group-item-action flex-column align-items-start" key={index} target="_blank">
                    //     <h5 className="mb-1">{category.name}</h5>
                    // </a>
                );
            })}
        </div>
        )
    };

    const FundedProjects = ({ Opportunities }) => (
        <div className="list-group list-group-flush">
            {Opportunities && Opportunities.map((Opportunity, index) => {
                return (
                    <a href={'/Reports/Funding/FundingReportDetails/' + Opportunity.id}>
                        <span className="list-group-item list-group-item-action flex-column align-items-start" key={index} target="_blank"
                            style={{ 'display': (index > pageSize ? 'none' : 'block') }} >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{Opportunity.funding_call_name}</h5>
                            </div>
                            <small className="float-right">{Opportunity.deadline}</small>
                        </span>
                    </a>
                );
            })}
            {Opportunities && Opportunities.length > pageSize ?
                (<span className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-center font-weight-bold">
                        <a href='javascript:void(0)' onClick={handleSeeMoreClick} >See more ({Opportunities.length - pageSize}) </a>
                        <i className="fa fa-chevron-down" style={{ 'margin': '5px 0px 0px 5px' }}></i>
                    </div>
                </span>) : (null)
            }
            {Opportunities && Opportunities.length == pageSize ?
                (<span className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-center font-weight-bold">
                        <a href='javascript:void(0)' onClick={handleSeeLessClick} >See less</a>
                        <i className="fa fa-chevron-up" style={{ 'margin': '5px 0px 0px 5px' }}></i>
                    </div>
                </span>) : (null)
            }
        </div>
    );

    const SearchView = () => (
        <div className="col-sm-12 col-md-12">
            <div className="input-group">
                <div class="dropdown show">
                    <a class="btn btn-secondary dropdown-toggle"
                        href="#" role="button" id="searchCategory"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" style={{ 'height': '100%', 'border-radius': '0px' }}>
                        {searchCategory}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="searchCategory">
                        <a class="dropdown-item active" href="javascript:void(0)" onClick={handleSearchCategoryClick} >All</a>
                        <a class="dropdown-item" href="javascript:void(0)" onClick={handleSearchCategoryClick}>Another action</a>
                        <a class="dropdown-item" href="javascript:void(0)" onClick={handleSearchCategoryClick}>Something else here</a>
                    </div>
                </div>
                <input id="searchBox" className="form-control border-secondary py-2" type="search" placeholder="Quicksearch" onKeyPress={handleSubmitSearchInput} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSubmitSearch}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <br />
                            <br />
                            <HeaderSection headerText="Search by subject" />
                            <SubjectList categories={researchCategories} />
                            <br />
                            <br />
                            {/* <Search /> */}
                            {/* <NavLink to="/AdvancedSearch" style={{ 'float': 'right', 'padding': '5px' }}>Advanced search</NavLink> */}
                        </div>
                        <div className="col-sm-12 col-md-6 dk-home-abous-us">

                            <div className="row">
                                <WelcomeMessage />
                            </div>
                            <hr className="featurette-divider"></hr>
                            <div className="row blog">
                                <div className="col-sm-12 col-md-12">
                                    <HeaderSection headerText="Partners" />
                                    <div id="partnersCarouselControls" className="carousel slide" data-ride="carousel">
                                        <PartnerCarouselItems partnerList={partners} />
                                        <ol className="carousel-indicators">
                                            {partners.map((partner, index) => {
                                                return (
                                                    <li data-target="#partnersCarouselControls" data-slide-to={index}></li>
                                                );
                                            })}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <hr className="featurette-divider"></hr>
                            <HeaderSection headerText="Advisory Board" />
                            <div className="row blog">
                                <div className="col-md-12">
                                    <div id="teamCarousel" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#teamCarousel" data-slide-to="0" className="active"></li>
                                            <li data-target="#teamCarousel" data-slide-to="1"></li>
                                            <li data-target="#teamCarousel" data-slide-to="2"></li>
                                            <li data-target="#teamCarousel" data-slide-to="3"></li>
                                            <li data-target="#teamCarousel" data-slide-to="4"></li>
                                            <li data-target="#teamCarousel" data-slide-to="5"></li>
                                            <li data-target="#teamCarousel" data-slide-to="6"></li>
                                        </ol>
                                        <TeamCarouselItems />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <br />
                            <br />
                            <HeaderSection headerText="Funding opportunities" />
                            <FundedProjects Opportunities={fundingOpportunities} />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Home;