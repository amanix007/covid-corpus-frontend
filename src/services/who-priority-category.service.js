import { authHeader, handleResponse } from "../helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/who/research-priorities`;

export const whoPriorityCategoryService = {
  get,
  getActive,
  create,
  getById,
  update,
  deleteItem,
};

async function get(editionId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${editionId}/categories`, requestOptions);
  return handleResponse(response);
}

async function getActive() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/active/categories`, requestOptions);
  return handleResponse(response);
  
}

async function create({ editionId, code, name, status }) {
  const bodyContent = JSON.stringify({ who_res_prior_id: editionId, code, name, status });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${editionId}/categories`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function getById(id) {
  console.log('x', id);
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/categories/${id}`, requestOptions);
  return handleResponse(response);
}

async function update({ editionId, id, code, name, status }) {
  const bodyContent = JSON.stringify({
    who_res_prior_id: editionId,
    code,
    name,
    status
  });
  console.log("bodyContent", bodyContent);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/categories/${id}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function deleteItem(id) {
  const requestOptions = { method: "DELETE", headers: authHeader() };
  let response = await fetch(`${routePrefix}/categories/${id}`, requestOptions);
  return handleResponse(response);
}