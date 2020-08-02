import React from 'react';
import { Link, NavLink, useHistory } from "react-router-dom";
import Loading from 'components/Loading';

import { projectResearchActivityService } from 'services'

const Projects = () => {
    let history = useHistory();

    const [isLoading, setIsLoading] = React.useState(true);
    const [categories, setCategories] = React.useState(null);
    const [projectList, setProjectList] = React.useState(null);

    React.useEffect(() => {
        projectResearchActivityService.get().then(data => { setProjectList(data); setIsLoading(false) });
    }, []);

    // React.useEffect(() => {
    //     console.log('projectList', projectList);
    // }, [projectList]);

    const handleEdit = (id) => {
        history.push(`/ProjectActivity/Edit/${id}`)    
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
                            {!projectList && projectList.length === 0 && ('No Resource Types yet')}
                            {projectList && projectList.length > 0 && (
                                <table className="table table-striped mt-3">
                                    <thead>
                                        <tr>
                                            <th>
                                                Project Title
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
                                            return (<tr key={x.id}>
                                                <td>
                                                    {x.project_title}
                                                </td>
                                                <td className="text-center">
                                                    {x.status}
                                                </td>
                                                <td className="text-right">
                                                    <button onClick={(e) => handleEdit(x.id)} className="list-link">Edit</button>
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

export default Projects;