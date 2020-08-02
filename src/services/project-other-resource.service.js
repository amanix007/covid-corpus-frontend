import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/other-resources`;

export const projectOtherResourceService = {
  get,
  getById,
  createBiomedical,
  updateBiomedical,
  createNonBiomedical,
  updateNonBiomedical,
  createOther,
  updateOther,
  approve,
  disapprove
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}`, requestOptions);
  return handleResponse(response);
}

async function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}

async function createBiomedical({ title, fields, resourceLabelId,resource_type, summary, link, tags }) {
  const bodyContent = JSON.stringify({
    title,
    fields,
    // resource_type_id: resourceLabelId,
    resource_type,
    summary,
    link,
    tags
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/research/biomedical`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function updateBiomedical({ id, title, fields, resourceLabelId,resource_type, summary, link, tags }) {
  const bodyContent = JSON.stringify({
    title,
    fields,
    resource_type_id: resourceLabelId,
    resource_type: resource_type,
    summary,
    link,
    tags
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/research/biomedical`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function createNonBiomedical({ title, fields, resourceLabelId,resource_type, summary, link, tags, fieldTypeId }) {
  const bodyContent = JSON.stringify({
    title,
    fields,
    // resource_type_id: resourceLabelId,
    resource_type:resource_type,
    summary,
    link,
    tags
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/research/non-biomedical/${fieldTypeId}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function updateNonBiomedical({ id, title, fields, resourceLabelId,resource_type, summary, link, tags, fieldTypeId }) {
  const bodyContent = JSON.stringify({
    title,
    fields,
    // resource_type_id: resourceLabelId,
    resource_type: resource_type,
    summary,
    link,
    tags
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/research/non-biomedical/${fieldTypeId}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function createOther({ title, fields,  resourceLabelId,resource_type, summary, link, tags }) {
  const bodyContent = JSON.stringify({
    title,
    fields,
    // resource_type_id: resourceLabelId,
    resource_type: resource_type,
    summary,
    link,
    tags
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/research/other`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function updateOther({ id, title, fields, resourceLabelId,resource_type, summary, link, tags }) {
  const bodyContent = JSON.stringify({
    title,
    fields,
    // resource_type_id: resourceLabelId,
    resource_type: resource_type,
    summary,
    link,
    tags
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/research/other`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function approve(id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };

  let response = await fetch(`${routePrefix}/${id}/approve`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function disapprove(id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };

  let response = await fetch(`${routePrefix}/${id}/disapprove`, requestOptions);
  const data = await handleResponse(response);
  return data;
}
