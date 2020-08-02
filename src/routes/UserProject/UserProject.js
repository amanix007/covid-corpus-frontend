import React from 'react';
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAppState } from 'components/AppState';
import Loading from 'components/Loading';
import { authenticationService } from 'services';

import { userService } from 'services'

const UserProject = () => {
    const [covidUser, setCovidUser] = React.useState(null);
    let history = useHistory();

    console.log('covidUser', covidUser);

    const [isLoading, setIsLoading] = React.useState(true);
    const [projectList, setProjectList] = React.useState(null);

    React.useEffect(() => {
        setCovidUser(authenticationService.getCurrentUser());

    }, []);

    React.useEffect(() => {
        if (covidUser && covidUser.user)
            userService.getUserProjects(covidUser.user.id).then(data => { setProjectList(data); setIsLoading(false) });
    }, [covidUser]);

    const handleEdit = (type, id) => {
        if (type === "Research Project")
            history.push(`/Admin/Projects/ActivityEdit/${id}`);
        else if (type === "Funding Opportunity")
            history.push(`/Admin/Projects/FundingOpportunityEdit/${id}`);
        else if (type === "Other Resource")
            history.push(`/Admin/Projects/OtherResourceEdit/${id}`);
    }

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div id="sj-twocolumns" className="sj-twocolumns">
                <div className="container">
                    {isLoading && (
                        <Loading />
                    )}

                    {!isLoading && (
                        <React.Fragment>
                            {(!projectList || projectList.length) === 0 && ('No Projects yet')}
                            {projectList && projectList.length > 0 && (
                                <table className="table table-striped mt-3">
                                    <thead>
                                        <tr>
                                            <th>
                                                Project Title
                                            </th>
                                            <th className="text-center">
                                                Type
                                            </th>
                                            <th className="text-center">
                                                Status
                                            </th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projectList.map(x => {
                                            let status = "";

                                            if (covidUser.user.isAdmin === false && covidUser.user.isEditor === false && x.status === "Proposed") {
                                                status = "Submitted";
                                            } else {
                                                status = x.status;

                                            }
                                            return (<tr key={x.id}>
                                                <td>
                                                    {x.title}
                                                </td>
                                                <td className="text-center">{x.type}</td>

                                                {console.log('covidUser:', covidUser)}
                                                <td className="text-center">
                                                    {status}
                                                </td>
                                                <td className="text-right">
                                                    <button onClick={(e) => handleEdit(x.type, x.id)} className="list-link">Edit</button>
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
        </main>
    )
}

export default UserProject;