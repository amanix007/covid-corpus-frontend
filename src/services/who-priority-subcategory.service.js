import { authHeader, buildQuery, handleResponse } from '../helpers';

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/who/research-priorities`;

export const whoPrioritySubcategoryService = {
  get,
  getActive,
  create,
  getById,
  update,
  deleteItem,
};

async function get(categoryId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/categories/${categoryId}/subcategories`, requestOptions);
  return handleResponse(response);
}

async function getActive(categoryId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ status: 'Active' });
  let response = await fetch(`${routePrefix}/categories/${categoryId}/subcategories?${query}`, requestOptions);
  return handleResponse(response).then(data => data.map(x => { return { id: x.id, name: x.name, categoryId: x.who_res_prior_cat_id }}));;
}

async function create({ categoryId, code, name, status }) {
  const bodyContent = JSON.stringify({ code, name, status });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/categories/${categoryId}/subcategories`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/subcategories/${id}`, requestOptions);
  return handleResponse(response);
}

async function update({ id, categoryId, code, name, status }) {
  const bodyContent = JSON.stringify({
    who_res_prior_cat_id: categoryId,
    code,
    name,
    status,
  });
  console.log("bodyContent", bodyContent);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/subcategories/${id}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function deleteItem(editionId, categoryId, id) {
  const requestOptions = { method: "DELETE", headers: authHeader() };
  let response = await fetch(`${routePrefix}/subcategories/${id}`, requestOptions);
  return handleResponse(response);
}