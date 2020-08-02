import React from 'react';
import ProjectFOEdit from '../ProjectFOEdit';

const ProjectFundingOpportunity = (props) => {
    
    return <ProjectFOEdit id={props.match.params.id} />
}

export default ProjectFundingOpportunity;