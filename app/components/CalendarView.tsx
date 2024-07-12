import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MeetingModal from './MeetingDetail';
import styles from './Calendar.module.css';
import { BASE_URL } from "@/constants/ENVIRONMENT_VARIABLES";
interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  meetings: any[]; // Define the type of meetings array as needed
  count: number;
  
}
interface CalendarViewProps {
  fromDate: string;
  toDate: string;
}
const localizer = momentLocalizer(moment);

const MyCalendar: React.FC<CalendarViewProps> = ({}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMeetings, setSelectedMeetings] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents(currentDate);
  }, [currentDate]);

  const fetchEvents = async (date: Date) => {
    const from_date = moment(date).startOf('month').format('YYYY-MM-DD');
    const to_date = moment(date).endOf('month').format('YYYY-MM-DD');

    const response = await fetch(`${BASE_URL}/calendar_app/api/calendar?from_date=${from_date}&to_date=${to_date}`);
    
    if (!response.ok) {
      console.error("Failed to fetch events");
      return;
    }

    const data = await response.json();

    // Process events to group by time
    const eventMap: { [key: number]: any[] } = {};
    data.forEach((event: any) => {
      const eventTime = new Date(event.start).getTime();
      if (!eventMap[eventTime]) {
        eventMap[eventTime] = [];
      }
      eventMap[eventTime].push({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      });
    });

    const processedEvents = Object.keys(eventMap).map(key => {
      const eventGroup = eventMap[key as any];
      return {
        id: eventGroup[0].id, // use the first event's id for reference
        title: `${eventGroup.length} meetings`,
        start: eventGroup[0].start,
        end: eventGroup[0].end,
        meetings: eventGroup,
        count: eventGroup.length,
      };
    });

    setEvents(processedEvents);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedMeetings(event.meetings);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.controls}>
        <button onClick={() => handleNavigate(new Date())}>Today</button>
        <button onClick={() => handleNavigate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}>Back</button>
        <button onClick={() => handleNavigate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}>Next</button>
      </div>
      <div style={{ height: '80vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          step={60}
          showMultiDayTimes
          selectable
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={(event: Event) => {
            if (event.count > 1) {
              return { style: { backgroundColor: 'goldenrod' } };
            }
            return {};
          }}
        />
      </div>
      {isModalOpen && <MeetingModal meetings={selectedMeetings} onClose={closeModal} />}
    </div>
  );
};

export default MyCalendar;
