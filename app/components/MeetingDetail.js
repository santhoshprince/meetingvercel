// components/MeetingModal.js
import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { BASE_URL } from "@/constants/ENVIRONMENT_VARIABLES";
const MeetingModal = ({ meetings, onClose }) => {
  const [meetingDetails, setMeetingDetails] = useState([]);

  useEffect(() => {
    fetchMeetingDetails(meetings);
  }, [meetings]);

  const fetchMeetingDetails = async (meetings) => {
    const details = await Promise.all(
      meetings.map(async (meeting) => {
        const response = await fetch(`${BASE_URL}/calendar_app/api/calendar_meeting?id=${meeting.id}`);
        const data = await response.json();
        return data;
      })
    );
    setMeetingDetails(details);
  };
  console.log("meetingDetails",meetingDetails)

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2 style={{borderBottom: "1px solid #b4a8a8",paddingBottom: "10px"}}>Meeting Details</h2>
        {meetingDetails.map((meeting, index) => (
          <div key={index}>
              <h4 style={{paddingTop: "10px"}}>Meeting {index + 1}</h4>
            {/* <h3>{meeting.title}</h3> */}
            <p><strong>Description:</strong>{meeting.desc}</p>
            <p><strong>Start Time:</strong> {new Date(meeting.start).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(meeting.end).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingModal;
