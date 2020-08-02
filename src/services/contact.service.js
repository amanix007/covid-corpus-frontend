import { authHeader, buildQuery, handleResponse } from "helpers";

const routePrefix = `${process.env.REACT_APP_BACKEND_API}/contact-form`;

export const contactService = {
  send
};

async function send({ name, email, organisation, message }) {
    const bodyContent = JSON.stringify({
        name, email, organisation, message
    });
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: bodyContent,
    };
  
    let response = await fetch(`${routePrefix}/send-form`, requestOptions);
    const data = await handleResponse(response);
    return data;
  }