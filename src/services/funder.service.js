import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/funders`;

export const funderService = {
  get,
  getActive,
  create,
  getById,
  update,
  deleteItem,
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}`, requestOptions);
  return handleResponse(response);
}

async function getActive() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ status: 'Active' });
  let response = await fetch(`${routePrefix}?${query}`, requestOptions);
  return handleResponse(response);
}

async function create({ name, acronym, contact, status }) {
  const bodyContent = JSON.stringify({
    name,
    acronym,
    contact,
    status,
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function getById(id) {
  console.log('funderService.getById', id);
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}

async function update({ id, name, acronym, contact, status }) {
  const bodyContent = JSON.stringify({
    name,
    acronym,
    contact,
    status,
  });
  console.log("bodyContent", bodyContent);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function deleteItem(id) {
  const requestOptions = { method: "DELETE", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}
