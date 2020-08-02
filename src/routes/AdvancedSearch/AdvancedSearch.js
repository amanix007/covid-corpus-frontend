import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import { countryService } from 'services/country.service';
import { otherResearchFieldCategory } from 'services/other-research-field-category.service'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Loading from "components/Loading";

const AdvancedSearch = () => {
    let history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [countries, setCountries] = React.useState([]);
    const [disciplines, setDisciplines] = React.useState([]);
    const [selectedCountries, setSelectedCountries] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState([]);
    const [chosenDisciplines, setSelectedDisciplines] = React.useState([]);
    const [startDate, setStartDate] = React.useState([]);
    const [endDate, setEndDate] = React.useState([]);
    const [deadlineDate, setDeadlineDate] = React.useState([]);
    const [researchProjectCheckbox, setResearchProjectCheckbox] = React.useState(false);
    const [fundingOpportunityCheckbox, setFundingOpportunityCheckbox] = React.useState(false);
    const [otherResourceCheckbox, setOtherResourceCheckbox] = React.useState(false);
    const project = [
        { id: 1, value: "Research Project" },
        { id: 2, value: "Funding Opportunity" },
        { id: 3, value: "Other Resource" }
    ];
    const handleSearch = () => {
        let types = [];
        if (researchProjectCheckbox) {
            types.push('research_projects')
        }
        if (fundingOpportunityCheckbox) {
            types.push('funding_opportunities')
        }
        if (otherResourceCheckbox) {
            types.push('other_resources')
        }
        if(!researchProjectCheckbox&& !fundingOpportunityCheckbox &&!otherResourceCheckbox){
            types.push('research_projects');
            types.push('funding_opportunities');
            types.push('other_resources');
        }
        setIsLoading(true);
        ReactDOM.render(
            null,
            document.getElementById('active_content')
        )
        let params = generateParams({
            countries: selectedCountries,
            searchTerm: searchTerm,
            disciplines: chosenDisciplines,
            startDate: startDate,
            endDate: endDate,
            deadlineDate: deadlineDate,
            types: types
        })
        params += 'mode=component'
        history.push("/SearchResult?" + params);
    }
    function generateParams({ countries, searchTerm, disciplines, startDate, endDate, deadlineDate, types }) {
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
        if (deadlineDate) {
            params += `deadline_date=${deadlineDate}&`
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

    const countrySelector = () => {
        return (
            <div id="countries" class="input-group" style={{ 'margin-top': '4rem' }}>
                <label style={{ 'margin-top': '-1.9rem', 'position': 'absolute', 'left': '1.1rem' }} >Countries</label>
                <Typeahead
                    style={{ 'margin-left': '1.2rem', 'width': '70rem' }}
                    id="countries1"
                    multiple={true}
                    onChange={(e) => setSelectedCountries(e)}
                    options={countries}
                    labelKey="name"
                    autoComplete="off"
                    placeholder="Select a country"
                />
            </div>
        )
    }
    const disciplineSelector = () => {
        return (
            <div class="input-group" style={{ 'margin-top': '2rem' }}>
                <label style={{ 'margin-top': '-1.9rem', 'position': 'absolute', 'left': '1.1rem' }} >Disciplines</label>
                <Typeahead
                    style={{ 'margin-left': '1.2rem', 'width': '70rem' }}
                    id="disciplines"
                    multiple={true}
                    onChange={(e) => setSelectedDisciplines(e)}
                    options={disciplines}
                    labelKey="name"
                    autoComplete="off"
                    placeholder="Select a discipline"
                />
            </div>
        )
    }
    const datePicker = (id, label) => {
        return (
            <div class="input-group">
                <TextField
                    id={id}
                    label={label}
                    type="date"
                    onChange={(e) => {
                        if (id === "start-date") {
                            setStartDate(e.target.value);
                        }

                        if (id === "end-date") {
                            setEndDate(e.target.value)
                        }

                        if (id == "deadline") {
                            setDeadlineDate(e.target.value)
                        }
                    }}
                    InputLabelProps={{ shrink: true, required: false }}
                    style={{ 'margin-top': '2rem', 'margin-left': '1.2rem' }}
                />
            </div>
        )
    }
    // Render when research project checkbox is checked
    const researchProjectContent = (id_1, label_1, id_2, label_2, status) => {
        if (status) {
            return (
                <div>
                    {disciplineSelector()}
                    {datePicker(id_1, label_1)}
                    {datePicker(id_2, label_2)}
                    {countrySelector()}
                </div>
            )
        }

    }
    // Render when funding opportunity checkbox is checked
    const fundingOpportunityContent = (id_1, label_1, id_2, label_2, status) => {
        if (status) {
            return (
                <div>
                    {disciplineSelector()}
                    {datePicker(id_1, label_1)}
                    {datePicker(id_2, label_2)}
                </div>
            )
        }

    }
    // Render when other resource content checkbox is checked
    const otherResourceContent = (status) => {
        if (status) {
            return (
                <div>
                    {disciplineSelector()}
                </div>
            )
        }

    }
    // Render when research field checkbox and funding opportunity checkbox are both checked
    const researchProjectAndFundingOpportunity = (id_1, label_1, id_2, label_2, id_3, label_3) => {
        return (
            <div>
                {disciplineSelector()}
                {datePicker(id_1, label_1)}
                {datePicker(id_2, label_2)}
                {datePicker(id_3, label_3)}
                {countrySelector()}
            </div>
        )
    }
    const otherResourcesAndFundingOpportunity = (id_1, label_1, id_2, label_2) => {
        return (
            <div>
                {disciplineSelector()}
                {datePicker(id_1, label_1)}
                {datePicker(id_2, label_2)}
            </div>
        )
    }
    const researchProjectAndOtherResources = (id_1, label_1, id_2, label_2) => {
        return (
            <div>
                {disciplineSelector()}
                {datePicker(id_1, label_1)}
                {datePicker(id_2, label_2)}
                {countrySelector()}
            </div>
        )
    }

    React.useEffect(() => {
        countryService.getActive().then(data => setCountries(data.map(x => { return { id: x.id, name: x.name } })))
        otherResearchFieldCategory.getFieldTypes().then((data) => {
            setDisciplines(data)
        });
        // otherResearchFieldCategory.getActive().then(data => setDisciplines(data.map(x => { return { id: x.id, name: x.name } })))
    }, []);

    React.useEffect(() => {
        if (researchProjectCheckbox && !fundingOpportunityCheckbox && !otherResourceCheckbox) {
            ReactDOM.render(
                researchProjectContent("start-date", "Start date", "end-date", "End date", true),
                document.getElementById('active_content')
            )
        }
        else if (!researchProjectCheckbox && fundingOpportunityCheckbox && !otherResourceCheckbox) {
            ReactDOM.render(
                fundingOpportunityContent("start-date", "Start date", "deadline", "Deadline", true),
                document.getElementById('active_content')
            )
        }
        else if (!researchProjectCheckbox && !fundingOpportunityCheckbox && otherResourceCheckbox) {
            ReactDOM.render(
                otherResourceContent(true),
                document.getElementById('active_content')
            )
        } else if (researchProjectCheckbox && fundingOpportunityCheckbox && !otherResourceCheckbox) {
            ReactDOM.render(
                researchProjectAndFundingOpportunity("start-date", "Start date", "end-date", "End date", "deadline", "Deadline"),
                document.getElementById('active_content')
            )
        } else if (!researchProjectCheckbox && !fundingOpportunityCheckbox && !otherResourceCheckbox) {
            ReactDOM.render(
                null,
                document.getElementById('active_content')
            )
        } else if (researchProjectCheckbox && fundingOpportunityCheckbox && otherResourceCheckbox) {
            ReactDOM.render(
                researchProjectAndFundingOpportunity("start-date", "Start date", "end-date", "End date", "deadline", "Deadline"),
                document.getElementById('active_content')
            )
        } else if (!researchProjectCheckbox && fundingOpportunityCheckbox && otherResourceCheckbox) {
            ReactDOM.render(
                otherResourcesAndFundingOpportunity("start-date", "Start date", "deadline", "Deadline"),
                document.getElementById('active_content')
            )
        } else if (researchProjectCheckbox && !fundingOpportunityCheckbox && otherResourceCheckbox) {
            ReactDOM.render(
                researchProjectAndOtherResources("start-date", "Start date", "end-date", "End date"),
                document.getElementById('active_content')
            )
        }
    }, [researchProjectCheckbox, fundingOpportunityCheckbox, otherResourceCheckbox]);

    function renderPage() {
        return (
            <>
                <div >
                    <div className="dk-page-title">Advanced search</div>
                </div>
                <div className="input-group" >
                    <i style={{ 'margin-top': '0.9em', 'margin-left': '0.5em' }} class="fas fa-search" aria-hidden="true"></i>
                    <TextField
                        style={{ 'width': '85%', 'margin-left': '0.5rem' }}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                    />
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                        class="btn"
                        style={{ 'margin-left': '4rem',
                            'color':'white',
                            'background-image': 'linear-gradient(to right, #41c7b9 , #23b0e0)'}}
                    >
                        Search</button>
                </div>
                <div class="row">
                    <Checkbox style={{ 'margin': '1rem 0rem 0rem 2rem' }} checked={researchProjectCheckbox} name={project[0].id} onChange={(e) => {
                        setResearchProjectCheckbox(e.target.checked)
                    }} />
                    <label style={{ 'margin-top': '1.6rem' }} >{project[0].value}</label>

                    <Checkbox style={{ 'margin': '1rem 0rem 0rem 2rem' }} checked={fundingOpportunityCheckbox} name={project[1].id} onClick={(e) => {
                        setFundingOpportunityCheckbox(e.target.checked)
                    }} />
                    <label style={{ 'margin-top': '1.6rem' }} >{project[1].value}</label>

                    <Checkbox style={{ 'margin': '1rem 0rem 0rem 2rem' }} checked={otherResourceCheckbox} name={project[2].id} onClick={(e) => {
                        setOtherResourceCheckbox(e.target.checked)
                    }} />
                    <label style={{ 'margin-top': '1.6rem' }} >{project[2].value}</label>
                </div>

            </>
        )
    }

    return (
        <React.Fragment>
            {!isLoading && renderPage()}
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
            <div id="active_content"></div>
        </React.Fragment>

    );
};

export default AdvancedSearch;
