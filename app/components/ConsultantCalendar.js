// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import { enUS } from "date-fns/locale";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const locales = {
//   "en-US": enUS,
// };


// const CalendarPage: React.FC = () => {
//   const [events, setEvents] = useState<any[]>([]);


//   return (
//     <div className="calendar-container">
//       <h1>Calendar</h1>
//       <Calendar
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// };

// export default CalendarPage;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ConsultantCalendar = ({ from_date, to_date }) => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://52.35.66.255:8000/calendar_app/api/calendar", {
          params: {
            from_date: "2024-04-01",
            to_date: "2024-04-30",
          },
        });

        const formattedEvents = response.data.map((event) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <h1>Consultant Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default ConsultantCalendar;
