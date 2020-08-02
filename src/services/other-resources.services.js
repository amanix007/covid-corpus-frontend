import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/other-resources`;

export const otherResources = {
  get,
  getById,
  getWithPagination
  /*create,    
   update,
   deleteItem, */
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}?status=Active`, requestOptions);
  return handleResponse(response);
}

async function getWithPagination({ status, page, page_size }) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/other-resources-with-pagination`
  let response = await fetch(`${routePrefix}?status=${status}&page=${page}&page_size=${page_size}`, requestOptions);
  return handleResponse(response);

}

async function getById(id) {
  console.log('funderService.getById', id);
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}
