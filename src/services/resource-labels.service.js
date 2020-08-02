import data from '../mock/resource-labels-mock.json';
import { authHeader, handleResponse } from '../helpers';

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/resource-labels`;

export const resourceLabelService = {
    getActive,
    get,
    getById,
    insertResourceType,
    updateResourceType
};

async function getActive() {
    const requestOptions = { method: "GET", headers: authHeader() };
    let handleRes = await fetch(`${routePrefix}`, requestOptions);
    return handleResponse(handleRes);
}

async function get() {
    const requestOptions = { method: "GET", headers: authHeader() };
    let handleRes = await fetch(`${routePrefix}`, requestOptions);
    return handleResponse(handleRes);
}

async function getById(id) {
    const requestOptions = { method: "GET", headers: authHeader() };
    let handleRes = await fetch(`${routePrefix}/${id}`, requestOptions);
    return handleResponse(handleRes);
}


async function insertResourceType({ name, status }) {
    const bodyContent = JSON.stringify({ name, status });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    return fetch(`${routePrefix}/`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

async function updateResourceType({ id, name, status }) {
    const bodyContent = JSON.stringify({ name, status });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    return fetch(`${routePrefix}/${id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}