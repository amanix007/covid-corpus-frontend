import React from 'react';
import ProjectActivityEdit from '../ProjectActivityEdit';

const AdminProjectActivity = (props) => {
    
    return <ProjectActivityEdit id={props.match.params.id} />
}

export default AdminProjectActivity;