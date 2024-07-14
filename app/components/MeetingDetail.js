// components/MeetingModal.js
import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { BASE_URL } from "@/constants/ENVIRONMENT_VARIABLES";

const MeetingModal = ({ meetings, onClose }) => {
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

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

  const handleMeetingDetailsClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingDetailsModal(true);
  };

  const handleCloseMeetingDetailsModal = () => {
    setShowMeetingDetailsModal(false);
    setSelectedMeeting(null);
  };

  const handleJoinMeeting = (link) => {
    // Open Google Meet link in new tab
    window.open(link, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {meetingDetails.map((meeting, index) => (
          <div key={index}>
            <div className='card' style={{width: "18rem", marginTop: "10px"}}>
              <div className="card-body">
                <p><strong>Description:</strong> {meeting.desc}</p>
                <p><strong>Start Time:</strong> {new Date(meeting.start).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(meeting.end).toLocaleString()}</p>
                <button className="btn btn-primary" onClick={() => handleMeetingDetailsClick(meeting)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Meeting Details Modal */}
      {showMeetingDetailsModal && selectedMeeting && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseMeetingDetailsModal}>
              &times;
            </button>
            <h3>Meeting Details</h3>
            <p><strong>Description:</strong> {selectedMeeting.desc}</p>
            <p><strong>Start Time:</strong> {new Date(selectedMeeting.start).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(selectedMeeting.end).toLocaleString()}</p>
            {selectedMeeting.link && (
              
              <button className="btn btn-primary" onClick={() => handleJoinMeeting(selectedMeeting.link)}>
                Join Meeting
              </button>
            )}
            {console.log("selectedMeeting",selectedMeeting)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingModal;
