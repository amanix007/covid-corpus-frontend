import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/other-research-fields/subcategories`;

export const otherResearchFieldSubcategory = {
  get,
  getActive,
  create,
  getById,
  update,
  deleteItem,
};

async function get(categoryId) {
  const requestOptions = { method: "GET", headers: authHeader() };

  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}/other-research-fields/categories/${categoryId}/subcategories`,
    requestOptions
  );
  return handleResponse(response);
}

async function getActive(categoryId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ status: 'Active' });
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}/other-research-fields/categories/${categoryId}/subcategories?${query}`,
    requestOptions
  );
  return handleResponse(response);
}

async function create({
  name,
  status,
}) {
  const bodyContent = JSON.stringify({
    name,
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
  categoryId,
  name,
  status,
}) {
  const bodyContent = JSON.stringify({
    category_id: categoryId,
    name,
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
