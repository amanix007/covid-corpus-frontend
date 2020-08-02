import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/other-research-fields/categories`;

export const otherResearchFieldCategory = {
  get,
  getActive,
  getFieldTypes,
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

async function getFieldTypes() {
  let x = await getActive();
  x = x.map(i => {
    if(i.name ==="Arts & Humanities"){
i.name = "Arts and Humanities"
    }
    return { value: i.id, name: i.name }
  });
  x.unshift({ value: 1, name: "Biomedical Research", id: 1 });
  x.push({ value: 3, name: "Other", id: 3 });
  return x;
}

async function create({ name, status }) {
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
  name,
  status,
}) {
  const bodyContent = JSON.stringify({
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
