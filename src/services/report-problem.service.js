import { authHeader, handleResponse } from '../helpers';

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/report-a-problem`;

export const reportProblemService = {
    create
};

function create({subject, description}) {
    const bodyContent = JSON.stringify({ subject, description });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };
    
    return fetch(`${routePrefix}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}