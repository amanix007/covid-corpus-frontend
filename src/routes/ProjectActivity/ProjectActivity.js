import React from 'react';
import ProjectActivityEdit from '../ProjectActivityEdit';

const ProjectActivity = (props) => {
    
    return <ProjectActivityEdit id={props.match.params.id} />
}

export default ProjectActivity;