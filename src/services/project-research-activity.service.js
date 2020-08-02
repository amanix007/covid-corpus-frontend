import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/projects/research-activities`;

export const projectResearchActivityService = {
  get,
  getById,
  create,
  saveStep1,
  saveStep2,
  saveStep3Biomedical,
  saveStep3NonBiomedical,
  saveStep3Other,
  saveStep4,
  approve,
  disapprove
};

async function get() {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}`, requestOptions);
  console.log('response', response);
  return handleResponse(response);
}

async function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let response = await fetch(`${routePrefix}/${id}`, requestOptions);
  return handleResponse(response);
}

async function create({ title, funded, funderProjectId, original_amount, original_amount_currency, awarded_amount, awarded_amount_currency, funders }) {
  const bodyContent = JSON.stringify({
    project_title: title,
    funded,
    funder_project_id: funderProjectId,
    original_amount,
    original_amount_currency,
    awarded_amount,
    awarded_amount_currency,
    funders
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json","Accept": "application/json", ...authHeader() },
    body: bodyContent,
  };
  

  let response = await fetch(`${routePrefix}/step1`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep1({ id, title, funded, funderProjectId, original_amount, original_amount_currency, awarded_amount, awarded_amount_currency, funders }) {
  const bodyContent = JSON.stringify({
    project_title: title,
    funded,
    funder_project_id: funderProjectId,
    original_amount,
    original_amount_currency,
    awarded_amount,
    awarded_amount_currency,
    funders
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

async function saveStep2({ id, primaryWhoResearchPriority, secondaryWhoResearchPriority, whoImmediateResearchAction }) {
  const bodyContent = JSON.stringify({
    primary_who_research_priority: primaryWhoResearchPriority,
    secondary_who_research_priority: secondaryWhoResearchPriority,
    who_immediate_research_action: whoImmediateResearchAction
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step2`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep3Biomedical({ id, fields, researchQuestions, studyDesign, tags, population,
  intervention, comparator, outcome, summary, attachment, link, status }) {
  const bodyContent = JSON.stringify({
    fields,    
    research_questions: researchQuestions,
    study_design: studyDesign,
    tags, population,
    intervention, comparator, outcome, summary, attachment, link, status
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step3/research/biomedical`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep3NonBiomedical({ id, fields, researchQuestions, studyDesigns, tags,
  summary, file, link, status, fieldTypeId }) {
  const bodyContent = JSON.stringify({
    fields,
    research_questions: researchQuestions,
    study_designs: studyDesigns,
    tags,
    summary,
    file,
    link,
    status
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step3/research/non-biomedical/${fieldTypeId}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep3Other({ id, fields, researchQuestions, studyDesigns, tags,
  summary, file, link, status }) {
  const bodyContent = JSON.stringify({
    fields,
    research_questions: researchQuestions,
    study_designs: studyDesigns,
    tags,
    summary,
    file,
    link,
    status
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step3/research/other`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function saveStep4({ id, researchType, countries, additionalLocationDetails, startDate, endDate, keyMilestones,
  leadInstitution, principalInvestigators, collaborators, localImplementingPartners, dataSharingWay, openToCollaborators,
  emailAddressOfLeadPrincipalInvestigator }) {
  const bodyContent = JSON.stringify({
    research_type: researchType,
    countries,
    additional_location_details: additionalLocationDetails,
    start_date: startDate,
    end_date: endDate,
    key_milestones: keyMilestones,
    lead_institution: leadInstitution,
    principal_investigators: principalInvestigators,
    collaborators,
    local_implementing_partners: localImplementingPartners,
    data_sharing_way: dataSharingWay,
    open_to_collaborators: openToCollaborators,
    lead_principal_investigator_email: emailAddressOfLeadPrincipalInvestigator
  });

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: bodyContent,
  };

  let response = await fetch(`${routePrefix}/${id}/step4`, requestOptions);
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
