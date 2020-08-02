import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects`;

export const projectService = {
  get,
  getEditor
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}`, requestOptions);
  return handleResponse(response);
}
async function getEditor() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${process.env.REACT_APP_BACKEND_API}/projects-by-categories`, requestOptions);
  return handleResponse(response);
}