import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Search from "../../components/Search";
import OtherCollapsibleTable from "../../components/OtherCollapsibleTable";
/* import reportsData from "../../mock/other-reports-mock.json"; */
import { otherResources } from "services/other-resources.services";
import Loading from "components/Loading";
import { countryService, otherResearchFieldCategory } from "../../services";
import { Typeahead } from "react-bootstrap-typeahead";
import TextField from "@material-ui/core/TextField";
import { advancedSearchService } from "../../services/advanced-search.service";
import SortIcon from "@material-ui/icons/Sort";
import Collapse from "@material-ui/core/Collapse";
import { Button } from "@material-ui/core";

class OtherReports extends Component {
  state = {
    search: "",
    reportsData: [],
    isLoading: true,
    disciplines: [],
    chosenDisciplines: [],
    expand: false,
    status: "",
    open_to_collaborators: "",
    researchCategories: []
  };

  componentDidMount() {
    this.getData();

    this.baseInfo();
    this.setState({ reportsData: this.filterDataByUser('') })

    otherResearchFieldCategory.getFieldTypes().then((data) => {
      // data.sort((a, b) => (a.name > b.name) ? 1 : -1); 

      this.setState({
        researchCategories: data
      })
    });
  }
  getData = () => {
    otherResources.get().then((data) => {
      this.setState({
        reportsData: data,
        isLoading: false,
      });
    });
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

    //Search title
    tempData = reportsData.filter((f) =>
      String(f.title.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

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

    //Search subfield
    tempData = reportsData.filter((f) =>
      String(f.subfield.toLowerCase()).includes(search.toLowerCase())
    );
    this.addFilteredData(tempData, filteredData);

    //Search resource_type
    tempData = reportsData.filter((f) =>
      String(f.resource_type.toLowerCase()).includes(search.toLowerCase())
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
      <div class="input-group " style={{ 'margin-top': '2rem' }}>
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


  expand = () => {
    if (!this.state.expand) {
      this.setState({ expand: !this.state.expand });
    } else {
      this.setState({ expand: !this.state.expand });
    }
  };

  searchField(text) {
    let types = ['other_resources'];
    this.setState({ isLoading: true, reportsDate: [] });
    let params = this.generateParams({
      searchTerm: text,
      disciplines: this.state.chosenDisciplines,
      types: types,
      status: this.state.status,
      open_to_collaborators: this.state.open_to_collaborators,
    });
    advancedSearchService.searchByParams('?' + params).then(async response => {
      if (response) {
        await this.setState({
          reportsData: response.other_resources,
          disciplines: this.state.disciplines,
          chosenDisciplines: [],
          expand: false,
          isLoading: false,
          status: "",
          open_to_collaborators: ""
        });
        this.baseInfo();
      }
    }).catch(err => {
      this.setState({ isLoading: false });
    })

  };

  generateParams({ searchTerm, disciplines, types, status, open_to_collaborators }) {
    let params = '';


    if (searchTerm) {
      params += `search_term=${searchTerm}&`
    }
    if (status) {
      params += `status=${status}&`
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
  render() {
    var filteredData = this.state.reportsData;
    let { researchCategories } = this.state;


    const SubjectList = ({ categories }) => {
      return (<div className="cat-list-cont">
        <button className="cat"
          onClick={() => {

            this.getData();

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
                    <Grid item xs={8}>
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
                  <Grid container justify="center"
                    spacing={6}
                    className="mt-3"
                  >
                    <Grid item xs={4}>
                      <div className="fieldType form-group">
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
                    <Grid item xs={4}>
                      <div className="fieldType form-group">
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
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
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
                <OtherCollapsibleTable rows={filteredData} />
              )}
            </Grid>
          </Grid>
        </>

      </React.Fragment>
    );
  }
}

export default OtherReports;
