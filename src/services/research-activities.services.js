import { authHeader, buildQuery, handleResponse } from "helpers";

let routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/research-activities`;

export const rActService = {
    get,
    getById,
    getWithPagination,
   /*create,    
    update,
    deleteItem, */
  };

  async function get() {    
    const requestOptions = { method: "GET", headers: authHeader() };
    let response = await fetch(`${routePrefix}?status=Active`, requestOptions);    
    return handleResponse(response);

  }
  async function getWithPagination({status, page, page_size}) {    
    const requestOptions = { method: "GET", headers: authHeader() };
    let routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/research-activities-with-pagination`
    let response = await fetch(`${routePrefix}?status=${status}&page=${page}&page_size=${page_size}`, requestOptions);    
    return handleResponse(response);
    
  }

  async function getById(id) {
    console.log('research-activities.getById', id);
    const requestOptions = { method: "GET", headers: authHeader() };
    let response = await fetch(`${routePrefix}/${id}`, requestOptions);
    return handleResponse(response);
  }
  