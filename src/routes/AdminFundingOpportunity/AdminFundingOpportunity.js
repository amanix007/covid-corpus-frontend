import React from 'react';
import ProjectFOEdit from '../ProjectFOEdit';

const AdminFundingOpportunity = (props) => {
    
    return <ProjectFOEdit id={props.match.params.id} />
}

export default AdminFundingOpportunity;