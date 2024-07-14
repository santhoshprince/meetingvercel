

import * as API_ENDPOINTS from "../constants/API_ENDPOINTS";
import { AXIOS_CLIENT } from "@/utils/AXIOS_CLIENT";

const makeRequest = async (endpoint, data, method = "post") => {
  try {
    let response = await AXIOS_CLIENT[method](endpoint, data);
    let result = await response.data;
    console.warn(`--=${endpoint}===`, result); // Optional: Log the result
    return result;
  } catch (error) {
    console.error(`${endpoint.toUpperCase()}: ${error.message}`);
    throw new Error(`${endpoint}: ${error.message}`);
  }
};

// Example API functions
export const GET_USER_HIERARCHY_API = () =>
  makeRequest(API_ENDPOINTS.USER_HIERARCHY, null, "get");

export const GET_POSTED_JOB_LISTS_API = () =>
  makeRequest(API_ENDPOINTS.POST_JOB_LIST_ENDPOINT, { status: "InActive" }, "get");

export const GET_POSTED_JOB_ACTIVE_LISTS_API = () =>
  makeRequest(API_ENDPOINTS.POST_JOB_Active_LIST_ENDPOINT, { status: "Active" }, "get");

export const GET_TODAY_MEETING_DETAILS_API = () =>
  makeRequest(API_ENDPOINTS.TODAY_MEETING_DETAILS_ENDPOINT, null, "get");

export const GET_ACTIVITIES_API = () =>
  makeRequest(API_ENDPOINTS.ACTIVITIES_ENDPOINT, {
    // Additional parameters if needed
  });

export const GET_UPCOMINGS_API = () =>
  makeRequest(API_ENDPOINTS.UPCOMINGS_ENDPOINT, {
    // Additional parameters if needed
  });


export const GET_CALENDAR_API = () =>
  makeRequest(API_ENDPOINTS.CALENDAR_ENDPOINT, null, "get");

export const GET_CALENDAR_MEETING_API = () =>
  makeRequest(API_ENDPOINTS.CALENDAR_MEETING_ENDPOINT, null, "get");
// Add more API functions as per your endpoints

// Example function with parameters
export const GET_CANDIDATE_DETAILS_API = ({ candidate_id, job_id }) =>
  makeRequest(API_ENDPOINTS.CANDIDATE_DETAILS_ENDPOINT, { candidate_id, job_id }, "get");

// Example function with data payload
export const LOGIN_API = (data) =>
  makeRequest(API_ENDPOINTS.LOGIN_ENDPOINT, data);

// Example function with destructured parameter
export const LOGOUT_API = ({ data }) =>
  makeRequest(API_ENDPOINTS.LOGOUT_ENDPOINT, data);

// Example GET function
export const GET_TICKET_LIST_API = () =>
  makeRequest(API_ENDPOINTS.TICKET_LIST_ENDPOINT, null, "get");

// Example GET function
export const GET_SETTINGS_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");

// Add more API functions as needed

// Example API function with parameter
export const GET_GENERAL_SETTINGS_API = (id) =>
  makeRequest(API_ENDPOINTS.SETTINGS_GENERAL_ENDPOINT + id + "/", null, "get");

export const GET_CANDIDATE_STATUS_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");

export const GET_HIRED_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");

export const GET_INTERVIEW_AND_HIRED_DETAILS_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");


export const GET_POSTED_JOB_Active_LISTS_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");

export const INVENTORY_ASSETS_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");


export const NOTIFICATIONS_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");


export const USER_ACCOUNT_MANAGEMENT_ACCOUNT_API = () =>
  makeRequest(API_ENDPOINTS.SETTINGS_ENDPOINT, null, "get");

