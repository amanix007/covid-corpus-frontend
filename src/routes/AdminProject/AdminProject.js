import React from 'react';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import { Link, useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';
import Loading from 'components/Loading';
import classnames from 'classnames';

import {
    projectResearchActivityService, projectOtherResourceService, projectFundingOpportunityService,
    projectService
} from 'services';

const AdminProject = (props) => {

    let { match: {
        params: { projectType }
    } } = props;
    
    let history = useHistory();

    const [activeTab, setActiveTab] = React.useState('2');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [isLoading, setIsLoading] = React.useState(true);
    const [projectList, setProjectList] = React.useState(null);
    const [filteredProjectList, setFilteredProjectList] = React.useState(null);
    const [filterString, setFilterString] = React.useState("Proposed");

    React.useEffect(() => {
        let covidUser = JSON.parse(localStorage.getItem("covidUser"));
        if (covidUser) {
            console.log('covidUser:', covidUser)
            if (covidUser.user.isEditor) {
                loadProjectsEditor();
            } else if (covidUser.user.isAdmin) {
                loadProjects();

            }
        }

    }, []);

    React.useEffect(() => {
        filterProjects(filterString);
    }, [projectList]);

    React.useEffect(() => {
    }, [filteredProjectList]);

    const loadProjects = () => {
        projectService.get().then(data => { setProjectList(data); setIsLoading(false) });
    }
    const loadProjectsEditor = () => {
        projectService.getEditor().then(data => { setProjectList(data); setIsLoading(false) });
    }

    const filterProjects = (status) => {
        setFilterString(status)
        if (projectList)
            setFilteredProjectList(projectList.filter(x => x.status === status));
    }

    const handleEdit = (type, id) => {
        if (type === "Research Project")
            history.push(`/Admin/Projects/ActivityEdit/${id}`);
        else if (type === "Funding Opportunity")
            history.push(`/Admin/Projects/FundingOpportunityEdit/${id}`);
        else if (type === "Other Resource")
            history.push(`/Admin/Projects/OtherResourceEdit/${id}`);
    }

    const handleApprove = (type, id) => {
        if (type === "Research Project")
            projectResearchActivityService.approve(id).then(async data => {
                await loadProjects();
                filterProjects("Active")
                toggle("1");
            });
        else if (type === "Funding Opportunity")
            projectFundingOpportunityService.approve(id).then(async data => {
                await loadProjects();
                filterProjects("Active")
                toggle("1");
            });
        else if (type === "Other Resource")
            projectOtherResourceService.approve(id).then(async data => {
                await loadProjects();
                filterProjects("Active")
                toggle("1");
            });


    }

    const handleDisapprove = (type, id) => {
        if (type === "Research Project")
            projectResearchActivityService.disapprove(id).then(async data => {
                await loadProjects();
                await filterProjects("Not Approved");
                toggle("3");

                // console.log('filteredProjectList:', filteredProjectList)
            });
        else if (type === "Funding Opportunity")
            projectFundingOpportunityService.disapprove(id).then(async data => {
                await loadProjects();
                await filterProjects("Not Approved");
                toggle("3");

            });
        else if (type === "Other Resource")
            projectOtherResourceService.disapprove(id).then(async data => {
                await loadProjects();
                await filterProjects("Not Approved");
                toggle("3");

            });

    }

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                {console.log('filteredProjectList:', filteredProjectList)}
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <AdminMenu />
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-9">
                            <div className="dk-page-title">Projects</div>

                            {isLoading && (
                                <Loading />
                            )}

                            {!isLoading && (
                                <React.Fragment>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggle('2'); filterProjects("Proposed"); }}
                                            >
                                                Proposed
                                        </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggle('1'); filterProjects("Active"); }}
                                            >
                                                Approved
                                        </NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '3' })}
                                                onClick={() => { toggle('3'); filterProjects("Not Approved"); }}
                                            >
                                                Not Approved
                                        </NavLink>
                                        </NavItem>

                                        {/* <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '4' })}
                                                onClick={() => { toggle('4'); filterProjects("Completed");  }}
                                            >
                                                Completed
                                        </NavLink>
                                        </NavItem> */}

                                        {/* <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '5' })}
                                                onClick={() => { toggle('5'); filterProjects("Inactive");  }}
                                            >
                                                Deleted
                                        </NavLink>
                                        </NavItem> */}

                                        {/* <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '6' })}
                                                onClick={() => { toggle('6'); filterProjects("Incomplete");  }}
                                            >
                                                Incomplete
                                        </NavLink>
                                        </NavItem> */}
                                    </Nav>
                                    {(!filteredProjectList || filteredProjectList.length) === 0 && (
                                        <div className="mt-3">No Projects yet</div>
                                    )}
                                    {filteredProjectList && filteredProjectList.length > 0 && (
                                        <table className="table table-striped mt-3">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Project Title
                                                    </th>
                                                    <th className="text-center">
                                                        Date Created
                                                    </th>
                                                    <th className="text-center">
                                                        Type
                                                    </th>
                                                    <th>
                                                    </th>
                                                    <th>
                                                    </th>
                                                    <th>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredProjectList.filter((item) => item.type === projectType).map(x => {
                                                    return (<tr key={x.id}>
                                                        <td>
                                                            {x.title}
                                                        </td>
                                                        <td className="text-center">
                                                            {x.date_created}
                                                        </td>
                                                        <td className="text-center">
                                                            {x.type}
                                                        </td>
                                                        <td className="text-right">
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                handleEdit(x.type, x.id)
                                                            }}
                                                                className="list-link">Edit</button>
                                                        </td>
                                                        <td className="text-right">
                                                            {(x.status === "Proposed" || x.status === "Not Approved") && (
                                                                <button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleApprove(x.type, x.id)
                                                                }}
                                                                    className="list-link">Approve</button>
                                                            )}
                                                        </td>
                                                        <td className="text-right">
                                                            {(x.status === "Proposed" || x.status === "Active") && (
                                                                <button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleDisapprove(x.type, x.id)
                                                                }}
                                                                    className="list-link">{activeTab === 1 ? 'Unapprove' : 'Decline'}</button>
                                                            )}
                                                        </td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminProject;