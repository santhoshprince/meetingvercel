"use client";
import { ACCESS_TOKEN } from "@/constants/ENVIRONMENT_VARIABLES";
import {
  GET_ACTIVITIES_API,
  GET_CANDIDATE_STATUS_API,
  GET_HIRED_API,
  GET_INTERVIEW_AND_HIRED_DETAILS_API,
  GET_POSTED_JOB_Active_LISTS_API,
  GET_POSTED_JOB_LISTS_API,
  GET_TICKET_LIST_API,
  GET_TODAY_MEETING_DETAILS_API,
  GET_UPCOMINGS_API,
  INVENTORY_ASSETS_API,
  LOGIN_API,
  LOGOUT_API,
  NOTIFICATIONS_API,
  USER_ACCOUNT_MANAGEMENT_ACCOUNT_API,
} from "@/utils/API";
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

import Cookies from "js-cookie"; // Import the js-cookie library

// Helper function to handle common async thunk logic
const createAsyncThunkHandler = (apiFunction:any, propName:any, onLoginSuccess?: { (response: any): void; (arg0: any): void; } | undefined) =>
  createAsyncThunk(`dashboard/${propName}`, async (data: any) => {
    try {
      // Call the API function with provided data
      let response;
      if (data) {
        response = await apiFunction(data);
      } else {
        response = await apiFunction();
      }

      // If there's a login success callback, call it with the response
      if (onLoginSuccess && propName === "login") {
        onLoginSuccess(response);
      }

      return response;
    } catch (error) {
      // Handle error
      console.error(`${propName} failed:`, error);
      throw error;
    }
  });

// Define async thunks using the helper function
export const getCandidateStatusList:any = createAsyncThunkHandler(
  GET_CANDIDATE_STATUS_API,
  "candidate_status_list"
);

export const getInterviewAndHiredDetails:any = createAsyncThunkHandler(
  GET_INTERVIEW_AND_HIRED_DETAILS_API,
  "interview_and_hired_details"
);

export const getPostedJobList:any = createAsyncThunkHandler(
  GET_POSTED_JOB_LISTS_API,
  "posted_job_list"
);

export const getPostedJobActiveList:any = createAsyncThunkHandler(
  GET_POSTED_JOB_Active_LISTS_API,
  "posted_job_active_list"
);

export const getTodayMeetingDetailsList:any = createAsyncThunkHandler(
  GET_TODAY_MEETING_DETAILS_API,
  "today_meeting_details_list"
);

export const getActivities:any = createAsyncThunkHandler(
  GET_ACTIVITIES_API,
  "activities_list"
);

export const getUpcomings:any = createAsyncThunkHandler(
  GET_UPCOMINGS_API,
  "upcomings_list"
);

export const getHirings:any = createAsyncThunkHandler(
  GET_HIRED_API,
  "hirings_list"
);
export const userlogin:any = createAsyncThunkHandler(
  LOGIN_API,
  "login",
  (response:any) => {
    // Assuming response contains session information such as user data, access token, etc.
    const { access_token, user_email, user_id, refresh_token } = response;
    // Store user data and access token in cookies
    const accessTokenKey = ACCESS_TOKEN || 'default_access_token_key';
    Cookies.set(
      accessTokenKey,
      JSON.stringify({ access_token, user_email, user_id, refresh_token })
    );
  }
);

export const getTicketList = createAsyncThunkHandler(
  GET_TICKET_LIST_API,
  "ticket_List"
);

export const userLogout:any = createAsyncThunkHandler(LOGOUT_API, "logout");

export const userAccountManagementAccount = createAsyncThunkHandler(
  USER_ACCOUNT_MANAGEMENT_ACCOUNT_API,
  "user_account_management"
);

export const inventoryAssets = createAsyncThunkHandler(
  INVENTORY_ASSETS_API,
  "inventory_Assets"
);

export const getNotifications:any = createAsyncThunkHandler(
  NOTIFICATIONS_API,
  "notification_list"
);

interface DashboardState {
  candidate_status_list: any[];
  interview_and_hired_details: any;
  posted_job_list: any[];
  posted_job_active_list: any[];
  today_meeting_details_list: any[];
  activities_list: any[];
  // Add other properties as needed
  loading: boolean;
}
type DashboardKeys = keyof DashboardState;
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    candidate_status_list: [],
    interview_and_hired_details: {},
    posted_job_list: [],
    posted_job_active_list: [],
    today_meeting_details_list: [],
    activities_list: [],
    upcomings_list: [],
    hirings_list: [],
    ticket_List: [],
    inventory_Assets: [],
    notification_list: [],
    login: {},
    logout: {},
    user_account_management: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      builder.addMatcher(
        (action: AnyAction): action is PayloadAction<any> =>
          action.type.startsWith("dashboard/") &&
          action.type.endsWith("/fulfilled"),
        (state:any, action) => {
          state.loading = false;
          const propName = action.type.split("/")[1] as DashboardKeys; // Extract property name from action type
          state[propName] = action.payload;
        }
      )
      // .addMatcher(
      //   (action) =>
      //     action.type.startsWith("dashboard/") &&
      //     action.type.endsWith("/fulfilled"),
      //   (state, action) => {
      //     state.loading = false;
      //     const propName = action.type.split("/")[1]; // Extract property name from action type
      //     state[propName] = action.payload;
      //   }
      // )
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/") &&
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const dashboardSelector = (state: any) => state.dashboard;
export default dashboardSlice.reducer;
