import React from 'react';
import { Link, NavLink, useHistory } from "react-router-dom";

const ProjectSubmit = () => {
    let history = useHistory();

    const [projectType, setProjectType] = React.useState(null);

    const changeType = (id) => {
        if (id === 1)
            history.push('/ProjectSubmit/Activity');
        else if (id === 2)
            history.push('/ProjectSubmit/FundingOpportunity')
        else if (id === 3)
            history.push('/ProjectSubmit/OtherResources')
    }

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container mb-4">
                    <div className="row">
                        {!projectType && (
                            <React.Fragment>
                                <div className="col-sm-4">
                                    <div className="dk-project-submit-box">
                                        <div>
                                            To register a new research project, click here.
                                        </div>
                                        <button className="dk-btn-fw mt-3" onClick={e => changeType(1)}>Research Project</button>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="dk-project-submit-box">
                                        <div>
                                        To register a new funding opportunity, click here.
                                            </div>
                                        <button className="dk-btn-fw mt-3" onClick={e => changeType(2)}>Funding Opportunity</button>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="dk-project-submit-box">
                                        <div>
                                        To register a new resource, click here.
                                            </div>
                                        <button className="dk-btn-fw mt-3" onClick={e => changeType(3)}>Other Resource</button>
                                    </div>
                                </div>

                            </React.Fragment>
                        )}

                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProjectSubmit;