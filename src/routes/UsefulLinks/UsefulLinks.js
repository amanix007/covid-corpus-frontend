import React from 'react';
import data from '../../mock/useful-links-mock.json';

const UsefulLinks = () => {
    return (
        <div>{data.map(d => <div>{d.title}</div>)}</div>
    )
}

export default UsefulLinks;