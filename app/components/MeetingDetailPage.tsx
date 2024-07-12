// components/MeetingDetailPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getMeetingDetails } from '../services/calendarService';

interface MeetingDetail {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

interface MeetingDetailPageProps {
  meetingId: number;
}

const MeetingDetailPage: React.FC<MeetingDetailPageProps> = ({ meetingId }) => {
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      setLoading(true);
      try {
        const response = await getMeetingDetails(meetingId);
        setMeetingDetail(response.data);
      } catch (err) {
        setError('Failed to fetch meeting details');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetail();
  }, [meetingId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!meetingDetail) {
    return <p>No meeting details found.</p>;
  }

  return (
    <div>
      <h1>Meeting Details</h1>
      <p>Title: {meetingDetail.title}</p>
      <p>Date: {meetingDetail.date}</p>
      <p>Time: {meetingDetail.time}</p>
      <p>Description: {meetingDetail.description}</p>
    </div>
  );
};

export default MeetingDetailPage;
