import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/countries`;

export const countryService = {
  get,
  getActive,
  search,
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

async function search(tekst) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ status: tekst });
  let response = await fetch(`${routePrefix}/search?${query}`, requestOptions);
  return handleResponse(response);
}