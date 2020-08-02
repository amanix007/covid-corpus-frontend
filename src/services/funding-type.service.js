import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/funding-types`;

export const funderTypeService = {
  get,
  search,
//   create
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}`, requestOptions);
  return handleResponse(response);
}

async function search(tekst) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ query: tekst });
  let response = await fetch(`${routePrefix}/search?${query}`, requestOptions);
  return handleResponse(response);
}

// async function create({ name, acronym, contact, status }) {
//   const bodyContent = JSON.stringify({
//     name,
//     acronym,
//     contact,
//     status,
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...authHeader() },
//     body: bodyContent,
//   };

//   let response = await fetch(`${routePrefix}`, requestOptions);
//   const data = await handleResponse(response);
//   return data;
// }