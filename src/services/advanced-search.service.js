import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/advanced-search`;

export const advancedSearchService = {
  search,
  getByCategory,
  searchByParams,
  searchByParamsWithPagination
};

async function search({ countries, searchTerm, disciplines, startDate, endDate, deadlineDate, types }) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  let params = '';

  for (let item of countries) {
    params += `countries[]=${item.name}&`
  }
  if (searchTerm) {
    params += `search_term=${searchTerm}&`
  }
  if (startDate) {
    params += `start_date=${startDate}&`
  }
  if (endDate) {
    params += `end_date=${endDate}&`
  }
  if (deadlineDate) {
    params += `deadline_date=${deadlineDate}&`
  }
  for (let item of disciplines) {
    item.name = item.name.replace('&', '%26')
    params += `search_fields[]=${item.name}&`
  }
  for (let item of types) {
    params += `search_sources[]=${item}&`
  }

  let response = await fetch(`${routePrefix}?${params}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}
async function searchByParams(params) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  let response = await fetch(`${routePrefix}${params}`, requestOptions);
  const data = await handleResponse(response);
  return data;

  
}
async function searchByParamsWithPagination(params) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  let response = await fetch(`${process.env.REACT_APP_BACKEND_API}/advanced-search-with-pagination${params}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function getByCategory(cat) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}?search_fields[]=${cat}&search_sources[]=research_projects&search_sources[]=funding_opportunities&search_sources[]=other_resources`, requestOptions);
  return handleResponse(response);
}