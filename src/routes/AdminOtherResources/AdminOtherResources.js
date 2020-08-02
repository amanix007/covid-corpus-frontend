import React from 'react';
import ProjectOtherResourceEdit from 'routes/ProjectOtherResourceEdit';

const AdminOtherResources = (props) => {

    return <ProjectOtherResourceEdit id={props.match.params.id} />
}

export default AdminOtherResources;