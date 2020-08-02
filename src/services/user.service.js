import data from '../mock/user-mock.json';
import { authHeader, handleResponse } from '../helpers';

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/users`;
const routeBase = process.env.REACT_APP_BACKEND_API;

export const userService = {
    get,
    getById,
    update,
    deleteUser,
    getUserProjects,
    updateMyProfile,
    updateAsEditor,
    updateAsAdmin,
    get_all_category,
    get_user_category,
    assignEditor,
    send_email_to_lead_principal_investigator,
};

function get() {
    const requestOptions = { method: "GET", headers: authHeader() };
    // let query = buildQuery({ filterInstituteId });
    return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}

function get_all_category() {
    const requestOptions = { method: "GET", headers: authHeader() };
    // let query = buildQuery({ filterInstituteId });
    return fetch(`${routeBase}/sub_categories/get_all`, requestOptions).then(handleResponse);
}
function get_user_category(user) {
    const requestOptions = { method: "GET", headers: authHeader() };
    // let query = buildQuery({ filterInstituteId });
    return fetch(`${routeBase}/admin/editors/${user}/categories`, requestOptions).then(handleResponse);
}

function send_email_to_lead_principal_investigator(obj) {
    const bodyContent = JSON.stringify(obj);
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    let dataobj =  fetch(`${routeBase}/contacts/lead_principal_investigator`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log('data:', data)
            return data;
        });

        return dataobj
}
function assignEditor(obj) {
    const bodyContent = JSON.stringify(obj);
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    return fetch(`${routeBase}/admin/editors/categories/assign`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function getById(id) {
    const requestOptions = { method: "GET", headers: authHeader() };
    return fetch(`${routePrefix}/${id}`, requestOptions).then(handleResponse);
}

function getUserProjects(userId) {
    const requestOptions = { method: "GET", headers: authHeader() };
    // let query = buildQuery({ filterInstituteId });
    return fetch(`${routePrefix}/${userId}/projects`, requestOptions).then(handleResponse);
}

function update({ id, name, surname, status, avatar }) {
    const bodyContent = JSON.stringify({ name, surname, status, avatar });
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

function updateMyProfile({ id, name, surname, profilePhoto }) {
    const bodyContent = JSON.stringify({ name, surname, avatar: profilePhoto });
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

function updateAsEditor({ id, isEditor }) {
    const bodyContent = JSON.stringify({ is_editor: isEditor });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    return fetch(`${routePrefix}/${id}/updateAsEditor`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function updateAsAdmin({ id, isEditor, isAdmin, status }) {
    const bodyContent = JSON.stringify({ is_editor: isEditor, is_admin: isAdmin, status });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    return fetch(`${routePrefix}/${id}/updateAsAdmin`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}
function deleteUser({ id }) {
    const bodyContent = JSON.stringify({ });
    console.log('bodyContent', bodyContent);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: bodyContent
    };

    return fetch(`${process.env.REACT_APP_BACKEND_API}/admin/delete_users/${id}`, )
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

