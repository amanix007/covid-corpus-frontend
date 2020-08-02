import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/funding-opportunities`;

export const projectFundingOpportunityService = {
  get,
  getById,
  getApprovedItems,
  create,
  saveStep1,
  saveStep2Biomedical,
  saveStep2NonBiomedical,
  saveStep2Other,
  approve,
  disapprove
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}`, requestOptions);
  return handleResponse(response);
}

async function getApprovedItems() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}?status=Active`, requestOptions);
  return handleResponse(response);
}

async function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}

async function create({ fundingCallName, funders, openingDate, fundingType, link, summary, deadline }) {
  const bodyContent = JSON.stringify({
    funding_call_name: fundingCallName,
    funders,
    opening_date: openingDate,
    funding_type: fundingType,
    link,
    summary,
    deadline,
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/step1`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep1({ id, fundingCallName, funders, openingDate, fundingType, link, summary, deadline }) {
  const bodyContent = JSON.stringify({
    funding_call_name: fundingCallName,
    funders,
    opening_date: openingDate,
    funding_type: fundingType,
    link,
    summary,
    deadline
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step1`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep2Biomedical({ id, otherMilestones, fundingDecisionAnnounced, eligibility, whoResearchPriority, fields }) {
  const bodyContent = JSON.stringify({
    other_milestones: otherMilestones,
    funding_decision_announced: fundingDecisionAnnounced,
    eligibility,
    who_research_priority: whoResearchPriority,
    fields
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step2/research/biomedical`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep2NonBiomedical({ id, otherMilestones, fundingDecisionAnnounced, eligibility, 
  whoResearchPriority, fields, fieldTypeId }) {
  const bodyContent = JSON.stringify({
    other_milestones: otherMilestones,
    funding_decision_announced: fundingDecisionAnnounced,
    eligibility,
    who_research_priority: whoResearchPriority,
    fields
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step2/research/non-biomedical/${fieldTypeId}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep2Other({ id, otherMilestones, fundingDecisionAnnounced, eligibility, whoResearchPriority, fields }) {
  const bodyContent = JSON.stringify({
    other_milestones: otherMilestones,
    funding_decision_announced: fundingDecisionAnnounced,
    eligibility,
    who_research_priority: whoResearchPriority,
    fields
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step2/research/other`, requestOptions);
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
