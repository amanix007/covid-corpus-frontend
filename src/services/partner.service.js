import { authHeader, buildQuery, handleResponse } from '../helpers';

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/partners`;

export const partnerService = {
    create,
    get,
    getActive,
    getById,
    update,
    deleteItem
};

async function get() {
    const requestOptions = { method: "GET", headers: authHeader() };
    let handleRes = await fetch(`${routePrefix}`, requestOptions);
    return handleResponse(handleRes);
}

async function getActive() {
    const requestOptions = { method: "GET", headers: authHeader() };
    let query = buildQuery({ status: 'Active' });
    let handleRes = await fetch(`${routePrefix}?${query}`, requestOptions);
    return handleResponse(handleRes);
}

async function getById(id) {
    const requestOptions = { method: "GET", headers: authHeader() };
    let handleRes = await fetch(`${routePrefix}/${id}`, requestOptions);
    return handleResponse(handleRes);
}

async function update({id, name, link, status, logo}) {
    const bodyContent = JSON.stringify({ name, link, status, logo });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };
    
    let handleRes = await fetch(`${routePrefix}/${id}`, requestOptions);
    const data = await handleResponse(handleRes);
    return data;
}

async function create({name, link, logo}) {
    const bodyContent = JSON.stringify({ name, link, logo });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };
    
    let handleRes = await fetch(`${routePrefix}`, requestOptions);
    const data = await handleResponse(handleRes);
    return data;
}

async function deleteItem(id) {
    const requestOptions = { method: "DELETE", headers: authHeader() };
    let response = await fetch(`${routePrefix}/${id}`, requestOptions);
    return handleResponse(response);
  }