import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Search from "../../components/Search";
import FundingCollapsibleTable from "../../components/FundingCollapsibleTable";
import FundingCollapsibleTableNEW from "../../components/FundingCollapsibleTable";
/* import reportsData from "../../mock/funding-reports-mock.json"; */
import { fOppService } from "services/funding-opportunities.services";
import Loading from "components/Loading";
import SortIcon from "@material-ui/icons/Sort";
import Collapse from "@material-ui/core/Collapse";
import { Typeahead } from "react-bootstrap-typeahead";
import TextField from "@material-ui/core/TextField";
import { countryService, otherResearchFieldCategory } from "../../services";
import { advancedSearchService } from "../../services/advanced-search.service";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

class FundingReportsNEW extends Component {
  state = {
    search: "",
    reportsData: [],
    isLoading: true,
    countries: [],
    selectedCountries: [],
    disciplines: [],
    chosenDisciplines: [],
    startDate: "",
    expand: false,
    deadlineDate: "",
    open_to_collaborators: "",
    researchCategories: [],
    SearchType: "Relative", // Relative or Advanced_Search
    status: "",
    page: 1,
    page_size: 25,
    meta: {
      current_page: 0,
      from: 0,
      last_page: 0,
      path: "",
      per_page: 0,
      to: 0,
      total: 0,
      success: true
    }
  };

  componentDidMount() {
    this.doSearchRelative();
    this.baseInfo()
    this.setState({ reportsData: this.filterDataByUser('') })


    otherResearchFieldCategory.getFieldTypes().then((data) => {
      // data.sort((a, b) => (a.name > b.name) ? 1 : -1); 

      this.setState({
        researchCategories: data
      })
    });

  }
  doSearchRelative = () => {
    let { status, page, page_size } = this.state;
    this.setState({ isLoading: true })
    fOppService.getWithPagination({
      status, page, page_size
    }).then((data) => {
      this.setState({
        reportsData: data.data,
        meta: data.meta,
        isLoading: false,
      });
    });

  }



  searchField = async (text) => {
    let { SearchType } = this.state;


    if (SearchType === "Relative") {
        await this.setState({
            page: 1,
            page_size: 25,
            meta: {
                current_page: 0,
                from: 0,
                last_page: 0,
                path: "",
                per_page: 0,
                to: 0,
                total: 0,
            }
        })
    }



    let { page, page_size, meta } = this.state;
    await this.setState({ SearchType: "Advanced_Search" })
    let types = ['funding_opportunities'];
    this.setState({ isLoading: true, reportsDate: [] });
    let params = this.generateParams({
      page: page,
      page_size: page_size,
      countries: this.state.selectedCountries,
      searchTerm: text,
      disciplines: this.state.chosenDisciplines,
      startDate: this.state.startDate,
      deadlineDate: this.state.deadlineDate,
      types: types,
      status: this.state.status,
      open_to_collaborators: this.state.open_to_collaborators,
    });
    
    // advancedSearchService.searchByParams('?' + params).then(async response => {
    advancedSearchService.searchByParamsWithPagination('?' + params).then(async response => {
      if (response) {
        await this.setState({
          reportsData: response.data,
          countries: this.state.countries,
          selectedCountries: [],
          disciplines: this.state.disciplines,
          chosenDisciplines: [],
          startDate: "",
          expand: false,
          deadlineDate: "",
          isLoading: false,
          status: "",
          open_to_collaborators: "",
          meta: response.meta
        });
        this.baseInfo();
      }
    }).catch(err => {
      this.setState({ isLoading: false });
    })

  };

  generateParams({
    countries, searchTerm, disciplines, startDate, deadlineDate,
    types, status, open_to_collaborators, page, page_size
  }) {
    let params = '';

    for (let item of countries) {
      params += `countries[]=${item.name}&`
    }
    if (searchTerm) {
      params += `search_term=${searchTerm}&`
    }
    if (startDate) {
      params += `start_date=${startDate}&`
    }
    if (deadlineDate) {
      params += `deadline_date=${deadlineDate}&`
    }
    if (status) {
      params += `status=${status}&`
    }
    // if (page) {
    //     params += `page=${page}&`
    // }
    params += `page=${page}&`

    if (page_size) {
      params += `page_size=${page_size}&`
    }

    if (open_to_collaborators) {
      params += `open_to_collaborators=${open_to_collaborators}&`
    }
    for (let item of disciplines) {
      item.name = item.name.replace('&', '%26')
      params += `search_fields[]=${item.name}&`
    }
    for (let item of types) {
      params += `search_sources[]=${item}&`
    }
    return params
  }

  paginate = (type, val) => {
    if (type === "page_size") {
      this.setState({
        page_size: val,
        page: 1

      }, () => {
        this.doApiCall()
      })
    } else {
      this.setState({
        page: val,
      }, () => {
        this.doApiCall()
      })
    }

  }

  doApiCall = () => {
    let { SearchType, search } = this.state;
    if (SearchType === "Relative") {
      this.doSearchRelative();
    } else {
      this.searchField(search);
    }
  }


  baseInfo() {
    otherResearchFieldCategory.getFieldTypes().then((data) => {
      this.setState({
        disciplines: data
      })
    });
  }

  handleonchange = (e) => {
    this.setState({ search: e });
  };

  addFilteredData = (tempData, filteredData) => {
    if (tempData.length > 0) {
      //eslint-disable-next-line
      tempData.map((data) => {
        var existInArray = filteredData.some(
          (f) => parseInt(f.id) === parseInt(data.id)
        );
        if (!existInArray) {
          filteredData.push(data);
        }
      });
    }
  };

  filterDataByUser = (search) => {
    /* search = "1"; */
    let tempData = [];
    let filteredData = [];
    let reportsData = [];

    if (search.trim() === "") return this.state.reportsData;
    else reportsData = this.state.reportsData;

    /* //Search ID
    tempData = reportsData.filter((f) => f.id.toString() === search);
    this.addFilteredData(tempData, filteredData); */

    //Search reference_number
    tempData = reportsData.filter((f) =>
      String(f.reference_number.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search funding_call_name
    tempData = reportsData.filter((f) =>
      String(f.funding_call_name.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search who_research_priority_subcategories
    // eslint-disable-next-line
    reportsData.map((data) => {
      var existInArray = data.who_research_priority_subcategories.some(
        (f) =>
          f.category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      if (existInArray) {
        tempData = [data];
        this.addFilteredData(tempData, filteredData);
      }
    });

    //Search fields
    // eslint-disable-next-line
    reportsData.map((data) => {
      var existInArray = data.fields.some(
        (f) =>
          f.category_full_name.toLowerCase().indexOf(search.toLowerCase()) !==
          -1
      );
      if (existInArray) {
        tempData = [data];
        this.addFilteredData(tempData, filteredData);
      }
    });

    //Search opening_date
    tempData = reportsData.filter((f) =>
      String(f.opening_date.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search deadline
    tempData = reportsData.filter((f) =>
      String(f.deadline.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search funding_type
    tempData = reportsData.filter((f) =>
      String(f.funding_type.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search funding_decision_announced
    tempData = reportsData.filter((f) =>
      String(f.funding_decision_announced.toLowerCase()).includes(
        search.toLowerCase()
      )
    );
    this.addFilteredData(tempData, filteredData);

    //Search other_milestones
    tempData = reportsData.filter((f) =>
      String(f.other_milestones.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search eligibility
    tempData = reportsData.filter((f) =>
      String(f.eligibility.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search link
    tempData = reportsData.filter((f) =>
      String(f.link.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search summary
    tempData = reportsData.filter((f) =>
      String(f.summary.toLowerCase()).includes(search.toLowerCase())
    );


    this.addFilteredData(tempData, filteredData);

    return filteredData;
  };

  disciplineSelector = () => {
    return (
      <div class="input-group" style={{ 'margin-top': '2rem' }}>
        <label style={{ 'margin-top': '-1.9rem', 'position': 'absolute', 'left': '1.1rem' }}>Disciplines</label>
        <Typeahead
          style={{ 'margin-left': '1.2rem', 'width': '70rem' }}
          id="disciplines"
          multiple={true}
          onChange={(e) => this.setState({ chosenDisciplines: e })}
          options={this.state.disciplines}
          labelKey="name"
          autoComplete="off"
          placeholder="Select a discipline"
        />
      </div>
    )
  };

  datePicker = (id, label) => {
    return (
      <div class="input-group mt-3">
        <TextField
          fullWidth
          id={id}
          label={label}
          type="date"
          onChange={(e) => {
            e.preventDefault();

            if (id === "start-date") {

              this.setState({ startDate: e.target.value })
              setTimeout(() => {
                console.log(this.state)
              }, 5000)
            }

            if (id === "deadline") {
              this.setState({ deadlineDate: e.target.value })
            }
          }}
          InputLabelProps={{ shrink: true, required: false }}
        // style={{ 'margin-top': '2rem', 'margin-left': '1.2rem' }}
        />
      </div>
    )
  };

  expand = () => {
    if (!this.state.expand) {
      this.setState({ expand: !this.state.expand });
    } else {
      this.setState({ expand: !this.state.expand });
    }
  };

  render() {
    var filteredData = this.state.reportsData;
    let { researchCategories } = this.state;


    const SubjectList = ({ categories }) => {
      return (<div className="cat-list-cont">
        <button className="cat"
          onClick={() => {

            this.doSearchRelative();

          }}
        >
          All
                        </button>
        {categories.map((category, index) => {
          return (
            <button className="cat"
              key={index}
              onClick={() => {
                this.setState({ chosenDisciplines: [category] }, () => {

                  console.log('this.state.chosenDisciplines:', this.state.chosenDisciplines)
                  this.searchField()
                }
                )

              }}
            // to={'/SearchResult?category=' + category.value}
            >
              {category.name}
            </button>

            // <a href={category.link}
            //     className="list-group-item list-group-item-action flex-column align-items-start" key={index} target="_blank">
            //     <h5 className="mb-1">{category.name}</h5>
            // </a>
          );
        })}
      </div>
      )
    };

    return (
      <React.Fragment>


        <>
          <SubjectList categories={researchCategories} />
          <Grid container spacing={3} justify="center">
            <Grid item xs={6} >
              <Collapse className="" in={!this.state.expand} timeout="auto" unmountOnExit>
                <Search onchange={(e) => this.handleonchange(e)}
                  searchField={(text) => this.searchField(text)} />
              </Collapse>
              <p onClick={() => this.expand()}
                className='text-center adv-search' style={{ cursor: "pointer" }}
              >Advanced Search <i className="fa fa-chevron-down ml-1"></i></p>
            </Grid>
            {/* <Grid item xs={1}>
              <SortIcon onClick={() => this.expand()} style={{fontSize: '50px', cursor: 'pointer'}}/>
            </Grid> */}

            <Grid item xs={12} style={{ padding: 0, paddingBottom: 40 }}>
              <Collapse className="adv-search-cont" in={this.state.expand} timeout="auto" unmountOnExit>
                <div>
                  <Grid container justify="center">
                    <Grid item xs={8} xs={8} >
                      <div className="adv-search-input form-group">
                        <label for="fieldType" className="fieldTitle">Enter Search Keywords here</label>
                        <div className="inline-form">
                          <input className="form-control"
                            placeholder="Enter Search Keywords here"
                            onChange={e => this.setState({ search: e.target.value })}
                          />
                        </div>
                      </div>
                      {this.disciplineSelector()}
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid container justify="center" alignItems="flex-start"
                      spacing={4}
                      xs={8}
                    >
                      <Grid item xs={6} >
                        {this.datePicker("start-date", "Start date")}
                      </Grid>
                      <Grid item xs={6}>
                        {this.datePicker("deadline", "Deadline")}
                      </Grid>
                      <Grid item xs={6}>
                        <div className="newfilterElem form-group">
                          <label for="fieldType" className="fieldTitle">Status</label>
                          <div className="inline-form">
                            <select className="form-control"
                              onChange={e => this.setState({ status: e.target.value })}
                            >
                              <option value="-1" >- Select Status -</option>
                              <option value="Active">Active</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="newfilterElem form-group">
                          <label for="fieldType" className="fieldTitle">Open To Colaboration</label>
                          <div className="inline-form">
                            <select className="form-control"
                              onChange={e => this.setState({ open_to_collaborators: e.target.value })}
                            >
                              <option value="-1" >- Select Option -</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <div className="text-center mt-4">
                    <Button
                      onClick={() => this.searchField(this.state.search)}
                      variant="contained"
                      style={{
                        color: "#FFF",
                        backgroundColor: "#23B0DE",
                      }}>
                      Search
                      </Button>

                    <Button
                      onClick={() => this.setState({
                        expand: false
                      })}
                      variant="contained"
                      style={{
                        color: "#FFF",
                        backgroundColor: "#23B0DE",
                        marginLeft: 8
                      }}>
                      Close
                                        </Button>
                  </div>
                </div>
              </Collapse>
            </Grid>


            <Grid item xs={12} style={{ padding: 0 }}>
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
                <FundingCollapsibleTableNEW rows={filteredData}
                  page={this.state.page}
                  page_size={this.state.page_size}
                  setPage={page => this.paginate("page", page)}
                  setPage_size={page_size => this.paginate("page_size", page_size)}
                  meta={this.state.meta}
                />
              )}
            </Grid>
          </Grid>
        </>

      </React.Fragment>
    );
  }
}

export default FundingReportsNEW;

