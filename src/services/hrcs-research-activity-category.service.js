import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/hrcs/research-activities/categories`;

export const hrcsResearchActivityCategory = {
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
  return handleResponse(response).then(data => data.map(x => { return { id: x.id, name: x.full_name }}));
}

async function create({ code, full_name, short_name, unique_id, link, status }) {
  const bodyContent = JSON.stringify({
    code,
    full_name,
    short_name,
    unique_id,
    link,
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
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}

async function update({
  id,
  code,
  full_name,
  short_name,
  unique_id,
  link,
  status,
}) {
  const bodyContent = JSON.stringify({
    code,
    full_name,
    short_name,
    unique_id,
    link,
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
