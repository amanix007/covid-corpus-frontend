import React from 'react';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    let history = useHistory();

    history.push("/Admin/Dashboards");

    return ('');
}

export default Admin; 