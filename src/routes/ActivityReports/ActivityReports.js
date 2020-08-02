import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Search from "../../components/Search";
import ActivityCollapsibleTable from "../../components/ActivityCollapsibleTable";
import Loading from "components/Loading";
import { rActService } from "services/research-activities.services";
import SortIcon from '@material-ui/icons/Sort';
import { Typeahead } from "react-bootstrap-typeahead";
import TextField from "@material-ui/core/TextField";
import { countryService } from 'services/country.service';
import { otherResearchFieldCategory } from 'services/other-research-field-category.service'
import { advancedSearchService } from 'services/advanced-search.service';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";

class ActivityReports extends Component {
    state = {
        search: "",
        reportsData: [],
        countries: [],
        selectedCountries: [],
        disciplines: [],
        chosenDisciplines: [],
        startDate: "",
        expand: false,
        endDate: "",
        status: "",
        open_to_collaborators: "",
        isLoading: true,
        researchCategories: []
    };

    componentDidMount() {
        this.getData();
        this.baseInfo()
        this.setState({ reportsData: this.filterDataByUser('') })


        otherResearchFieldCategory.getFieldTypes().then((data) => {
            // data.sort((a, b) => (a.name > b.name) ? 1 : -1); 

            this.setState({
                researchCategories: data
            })
        });
    }
    getData = () => {
        rActService.get().then((data) => {
            this.setState({
                reportsData: data,
                isLoading: false,
            });
        });
    }
    baseInfo() {
        countryService.getActive().then(data => this.setState({
            countries: data.map(x => {
                return { id: x.id, name: x.name }
            })
        }));
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

        /* console.log(" search ==> ", search); */

        /* ################ -- List view -- ################ */

        /* //Search ID
        tempData = reportsData.filter((f) => f.id.toString() === search);
        this.addFilteredData(tempData, filteredData); */

        //Search reference_number
        tempData = reportsData.filter((f) =>
            String(f.reference_number.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search project_title
        tempData = reportsData.filter((f) =>
            String(f.project_title.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search primary_who_research_priority_subcategories
        // eslint-disable-next-line
        reportsData.map((data) => {
            var existInArray = data.primary_who_research_priority_subcategories.some(
                (f) =>
                    f.category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (existInArray) {
                tempData = [data];
                this.addFilteredData(tempData, filteredData);
            }
        });

        //Search secondary_who_research_priority_subcategories
        // eslint-disable-next-line
        reportsData.map((data) => {
            var existInArray = data.secondary_who_research_priority_subcategories.some(
                (f) =>
                    f.category_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (existInArray) {
                tempData = [data];
                this.addFilteredData(tempData, filteredData);
            }
        });

        //Search countries
        // eslint-disable-next-line
        reportsData.map((data) => {
            var existInArray = data.countries.some(
                (f) => f.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (existInArray) {
                tempData = [data];
                this.addFilteredData(tempData, filteredData);
            }
        });

        //Search start_date
        tempData = reportsData.filter((f) =>
            String(f.start_date.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search end_date
        tempData = reportsData.filter((f) =>
            String(f.end_date.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search status
        tempData = reportsData.filter((f) =>
            String(f.status.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search open_to_collaborators
        tempData = reportsData.filter((f) =>
            String(f.end_date.toLowerCase() === 0 ? "no" : "yes").includes(
                search.toLowerCase()
            )
        );
        this.addFilteredData(tempData, filteredData);

        /* ################ -- Expanded Row -- ################ */

        //Search funders
        // eslint-disable-next-line
        reportsData.map((data) => {
            var existInArray = data.funders.some(
                (f) => f.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (existInArray) {
                tempData = [data];
                this.addFilteredData(tempData, filteredData);
            }
        });

        //Search awarded_amount
        tempData = reportsData.filter((f) =>
            String(f.awarded_amount.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search key_milestones
        tempData = reportsData.filter((f) =>
            String(f.key_milestones.toLowerCase()).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);

        //Search principal_investigators
        // eslint-disable-next-line
        reportsData.map((data) => {
            var existInArray = data.principal_investigators.some(
                (f) => f.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (existInArray) {
                tempData = [data];
                this.addFilteredData(tempData, filteredData);
            }
        });

        //Search summary
        tempData = reportsData.filter((f) =>
            String(f.research_project_information.summary.toLowerCase()).includes(
                search.toLowerCase()
            )
        );
        this.addFilteredData(tempData, filteredData);

        //Search research_questions
        //eslint-disable-next-line
        reportsData.map((data) => {
            var existInArray = data.research_project_information.research_questions.some(
                (f) => f.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (existInArray) {
                tempData = [data];
                this.addFilteredData(tempData, filteredData);
            }
        });

        //Search study_design
        tempData = reportsData.filter((f) =>
            String(
                f.research_project_information.study_design.toLowerCase()
            ).includes(search.toLowerCase())
        );
        this.addFilteredData(tempData, filteredData);
        console.log('filteredData', filteredData)
        debugger
        return filteredData;
    };
    countrySelector = () => {
        return (
            <div id="countries" className="input-group" style={{ 'margin-top': '2rem' }}>
                <label style={{ 'margin-top': '-1.9rem', 'position': 'absolute', 'left': '1.1rem' }}>Countries</label>
                <Typeahead
                    style={{ 'margin-left': '1.2rem', 'width': '70rem' }}
                    id="countries1"
                    multiple={true}
                    onChange={(e) => this.setState({ selectedCountries: e })}
                    options={this.state.countries}
                    labelKey="name"
                    autoComplete="off"
                    placeholder="Select a country"
                />
            </div>
        )
    }
    disciplineSelector = () => {
        return (
            <div className="input-group" style={{ 'margin-top': '2rem' }}>
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
            <div className="input-group mt-3">
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

                        if (id === "end-date") {
                            this.setState({ endDate: e.target.value })
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

    searchField(text) {
        let types = ['research_projects'];
        this.setState({ isLoading: true, reportsDate: [] });
        let params = this.generateParams({
            countries: this.state.selectedCountries,
            searchTerm: text,
            disciplines: this.state.chosenDisciplines,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            types: types,
            status: this.state.status,
            open_to_collaborators: this.state.open_to_collaborators,
        });
        advancedSearchService.searchByParams('?' + params).then(async response => {
            if (response) {
                await this.setState({
                    reportsData: response.research_projects,
                    countries: this.state.countries,
                    selectedCountries: [],
                    disciplines: this.state.disciplines,
                    // chosenDisciplines: [],
                    startDate: "",
                    expand: false,
                    endDate: "",
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

    generateParams({ countries, searchTerm, disciplines, startDate, endDate, types, status, open_to_collaborators }) {
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
        if (endDate) {
            params += `end_date=${endDate}&`
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
        let filterData = this.state.reportsData;
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
                        <button className={this.state.chosenDisciplines.includes(category) ? "cat selected" : "cat"}
                            key={index}
                            onClick={() => {
                                this.setState({ chosenDisciplines: [category] }, () => {
                                    this.searchField("")
                                }
                                )

                            }}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>
            )
        };
        return (
            <React.Fragment>


                <>
                    <SubjectList categories={researchCategories} />


                    <Grid container spacing={4} justify="center">
                        <Grid item xs={6}>
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

                        <Grid item xs={12}>
                            <Collapse className="adv-search-cont" in={this.state.expand} timeout="auto" unmountOnExit>
                                <div>
                                    <Grid container justify="center"
                                        alignItems="flex-start">
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
                                        alignItems="flex-start">
                                        <Grid item
                                            spacing={8}
                                            xs={8}>
                                            {this.countrySelector()}
                                        </Grid>

                                        <Grid container justify="center"
                                            spacing={4}
                                            xs={8}
                                            alignItems="flex-start"
                                        >
                                            <Grid item xs={6}>
                                                {this.datePicker("start-date", "Start date")}
                                            </Grid>
                                            <Grid item xs={6}>
                                                {this.datePicker("end-date", "End date")}
                                            </Grid>
                                            <Grid item xs={6}>
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
                                            <Grid item xs={6}>
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
                                <ActivityCollapsibleTable rows={filterData} />
                            )}
                        </Grid>
                    </Grid>
                </>
            </React.Fragment>
        );
    }
}

export default ActivityReports;
