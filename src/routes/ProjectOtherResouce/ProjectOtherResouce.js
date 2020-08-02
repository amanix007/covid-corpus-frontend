import React from 'react';
import ProjectOtherResourceEdit from '../ProjectOtherResourceEdit';

const ProjectOtherResouce = (props) => {
    
    return <ProjectOtherResourceEdit id={props.match.params.id} />
}

export default ProjectOtherResouce;