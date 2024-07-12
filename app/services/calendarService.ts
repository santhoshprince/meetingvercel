// services/calendarService.ts

import axios from 'axios';

const API_BASE_URL = 'http://52.35.66.255:8000/calendar_app/api';

export const getCalendarDetails = (fromDate: string, toDate: string) => {
  return axios.get(`${API_BASE_URL}/calendar`, {
    params: { from_date: fromDate, to_date: toDate },
  });
};

export const getMeetingDetails = (id: number) => {
  return axios.get(`${API_BASE_URL}/calendar_meeting`, {
    params: { id },
  });
};
