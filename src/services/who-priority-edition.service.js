import { authHeader, handleResponse } from "../helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/who/research-priorities`;

export const whoPriorityEditionService = {
  get,
  create,
  getById,
  update,
  deleteItem,
  activate,
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  // let query = buildQuery({ filterInstituteId });
  let response = await fetch(`${routePrefix}`, requestOptions);
  return handleResponse(response);
}

async function create({ title, edition, link }) {
  const bodyContent = JSON.stringify({ title, edition, link });

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

async function update({ id, title, link, edition }) {
  const bodyContent = JSON.stringify({ title, link, edition });
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

async function activate(id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };

  let response = await fetch(`${routePrefix}/${id}/activate`, requestOptions);
  const data = await handleResponse(response);
  return data;
}
