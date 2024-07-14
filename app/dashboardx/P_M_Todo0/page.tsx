// "use client";
// import React, { useState,useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import { enUS } from "date-fns/locale";
// import Link from "next/link";
// import MeetingModal from '../../components/MeetingDetail';
// import { BASE_URL } from "@/constants/ENVIRONMENT_VARIABLES";
// import {
//   Calendar,
//   momentLocalizer,
//   dateFnsLocalizer,
// } from "react-big-calendar";

// import "./style.css";
// import moment from 'moment';
// import SideMenu from "@/app/dashboard/component/SideMenu";
// import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the calendar styles

// const locales = {
//   "en-US": enUS,
// };

// // const localizer = dateFnsLocalizer({
// //   format,
// //   parse,
// //   startOfWeek,
// //   getDay,
// //   locales,
// // });
// interface Event {
//   id: number;
//   title: string;
//   start: Date;
//   end: Date;
//   meetings: any[]; // Define the type of meetings array as needed
//   count: number;
  
// }
// export default function P_M_Todo0() {

//   const dispatch = useDispatch()




//   const myEventsList = [
//     {
//       title: "Event 1",
//       start: new Date(),
//       end: new Date(new Date().setHours(new Date().getHours() + 1)),
//     },
//   ];
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   // const [activeEventModal, setActiveEventModal] = useState();
//   const [activeEventModal, setActiveEventModal] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   // const [events, setEvents] = useState(myEventsList);

//   const localizer = momentLocalizer(moment);
//   // Define months and years
//   const months = [
//     { value: "01", label: "January" },
//     { value: "02", label: "February" },
//     { value: "03", label: "March" },
//     { value: "04", label: "April" },
//     { value: "05", label: "May" },
//     { value: "06", label: "June" },
//     { value: "07", label: "July" },
//     { value: "08", label: "August" },
//     { value: "09", label: "September" },
//     { value: "10", label: "October" },
//     { value: "11", label: "November" },
//     { value: "12", label: "December" },
//   ];

//   const years = [
//     { value: "2022", label: "2022" },
//     { value: "2023", label: "2023" },
//     { value: "2024", label: "2024" },
//     // Add more years as needed
//   ];

//   // Handle month and year changes
//   const handleMonthChange = (e: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setSelectedMonth(e.target.value);
//   };

//   const handleYearChange = (e: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setSelectedYear(e.target.value);
//   };


//   const handleSelectSlot = (event: any) => {
//     if (typeof event.start === "string") {
//       event.start = new Date(event.start);
//     }

//     if (typeof event.end === "string") {
//       event.end = new Date(event.end);
//     }

//     setActiveEventModal(event);

//   };

//   const handleSelect = (event: any, e:any) => {
//     const { start, end } = event;
//     setActiveEventModal(event);
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   const [events, setEvents] = useState<Event[]>([]);
//   const [currentDate, setCurrentDate] = useState<Date>(new Date());
//   const [selectedMeetings, setSelectedMeetings] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     fetchEvents(currentDate);
//   }, [currentDate]);

//   const fetchEvents = async (date: Date) => {
//     const from_date = moment(date).startOf('month').format('YYYY-MM-DD');
//     const to_date = moment(date).endOf('month').format('YYYY-MM-DD');

//     const response = await fetch(`${BASE_URL}/calendar_app/api/calendar?from_date=${from_date}&to_date=${to_date}`);
    
//     if (!response.ok) {
//       console.error("Failed to fetch events");
//       return;
//     }

//     const data = await response.json();

//     // Process events to group by time
//     const eventMap: { [key: number]: any[] } = {};
//     data.forEach((event: any) => {
//       const eventTime = new Date(event.start).getTime();
//       if (!eventMap[eventTime]) {
//         eventMap[eventTime] = [];
//       }
//       eventMap[eventTime].push({
//         ...event,
//         start: new Date(event.start),
//         end: new Date(event.end),
//       });
//     });

//     const processedEvents = Object.keys(eventMap).map(key => {
//       {console.log("eventMap",)}
//       const eventGroup = eventMap[key as any];
//       return {
//         id: eventGroup[0].id, // use the first event's id for reference
//         title: `${eventGroup.length} meetings`,
//         start: eventGroup[0].start,
//         end: eventGroup[0].end,
//         meetings: eventGroup,
//         count: eventGroup.length,
//       };
//     });

//     setEvents(processedEvents);
//   };

//   const handleNavigate = (date: Date) => {
//     setCurrentDate(date);
//   };

//   const handleSelectEvent = (event: Event) => {
//     setSelectedMeetings(event.meetings);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Custom Event Component
//   const processedEvents = ({ event }: any) => {
//     return (
//       <>
//         <div className="calendarTopSection">
//           <ul>
//             <li className="text-[12px] py-1">Python Developer</li>
//             <li className="text-[12px] py-1">Interviewer: Geetha</li>
//             <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//             <li className="text-[12px] py-1">Via : Google Voice</li>
//           </ul>
//         </div>
//         {/* <div className="shadow bg-white" style={{ position: "relative" }}>
//           <strong className="text-black">{event.title}</strong>
//           <p>{event.start.toLocaleString()}</p>
//         </div>
//         {activeEventModal && <EventDetailModal />} */}
//       </>
//     );
//   };

//   return (
//     <section className="">
//       <div className="container-fluid my-md-5 my-4">
//         <div className="row">
//           <div className="col-lg-1 leftMenuWidth ps-0 position-relative">
//             <SideMenu />
//           </div>

//           <div className="col-lg-11 pe-lg-4 ps-lg-0">
//             <div className="row justify-content-between align-items-center">
//               <div className="col-lg-8 projectText">
//                 <h1>Calendar</h1>
//                 <p className="mt-3">
//                   Enjoy your selecting potential candidates Tracking and
//                   Management System.
//                 </p>
//               </div>

//               <div className="col-lg-4 mt-3 mt-lg-0 text-center text-lg-end">
//                 <Link
//                   prefetch
//                   href="/P_M_JobDescriptions1"
//                   className="btn btn-light me-3 mx-lg-2"
//                 >
//                   JD Assets
//                 </Link>
//                 <Link
//                   prefetch
//                   href="P_M_JobDescriptions4"
//                   className="btn btn-blue bg-[#0a66c2!important]"
//                 >
//                   Create New JD
//                 </Link>
//               </div>
//             </div>

//             <div className="TotalEmployees shadow bg-white rounded-3 p-3 w-100 mt-4">
//               <div className="md:flex align-items-center">
//                 <h3 className="projectManHeading">Your Todo’s</h3>
//                 <div className="ml-auto d-flex todoHeadingSelect">
//                   <div className="month-year-picker">
//                     <select value={selectedMonth} onChange={handleMonthChange}>
//                       <option value="">Select Month</option>
//                       {months.map((month) => (
//                         <option key={month.value} value={month.value}>
//                           {month.label}
//                         </option>
//                       ))}
//                     </select>
//                     <select value={selectedYear} onChange={handleYearChange}>
//                       <option value="">Select Year</option>
//                       {years.map((year) => (
//                         <option key={year.value} value={year.value}>
//                           {year.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className="d-none d-lg-block "
//                 style={{ width: "100%", position: "relative" }}
//               >

//                 {/* <div className="calendarTopSection top-[250px] left-[100px]">
//                   <ul>
//                     <li className="text-[12px] py-1">Python Developer</li>
//                     <li className="text-[12px] py-1">Interviewer: Geetha</li>
//                     <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//                     <li className="text-[12px] py-1">Via : Google Voice</li>
//                   </ul>
//                 </div>

//                 <div className="calendarTopSection top-[450px] left-[200px]">
//                   <ul>
//                     <li className="text-[12px] py-1">Python Developer</li>
//                     <li className="text-[12px] py-1">Interviewer: Geetha</li>
//                     <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//                     <li className="text-[12px] py-1">Via : Google Voice</li>
//                   </ul>
//                 </div>

//                 <div className="calendarTopSection top-[450px] left-[800px]">
//                   <ul>
//                     <li className="text-[12px] py-1">Python Developer</li>
//                     <li className="text-[12px] py-1">Interviewer: Geetha</li>
//                     <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//                     <li className="text-[12px] py-1">Via : Google Voice</li>
//                   </ul>
//                 </div>


//                 <div className="calendarTopSection top-[280px] left-[400px]">
//                   <ul>
//                     <li className="text-[12px] py-1">Python Developer</li>
//                     <li className="text-[12px] py-1">Interviewer: Geetha</li>
//                     <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//                     <li className="text-[12px] py-1">Via : Google Voice</li>
//                   </ul>
//                 </div>

//                 <div className="calendarTopSection top-[280px] left-[700px]">
//                   <ul>
//                     <li className="text-[12px] py-1">Python Developer</li>
//                     <li className="text-[12px] py-1">Interviewer: Geetha</li>
//                     <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//                     <li className="text-[12px] py-1">Via : Google Voice</li>
//                   </ul>
//                 </div>

//                 <div className="calendarTopSection top-[320px] left-[1000px]">
//                   <ul>
//                     <li className="text-[12px] py-1">Python Developer</li>
//                     <li className="text-[12px] py-1">Interviewer: Geetha</li>
//                     <li className="text-[12px] py-1">Time : 10 - 11 A.M</li>
//                     <li className="text-[12px] py-1">Via : Google Voice</li>
//                   </ul>
//                 </div> */}
//                 <Calendar
//                   localizer={localizer}
//                   events={events}
//                   startAccessor="start"
//                   endAccessor="end"
//                   style={{ height: 500 }}
//                   defaultView="month"
//                   views={['month', 'week', 'day', 'agenda']}
//                   step={60}
//                   showMultiDayTimes
//                   selectable
//                   onNavigate={handleNavigate}
//                   onSelectEvent={handleSelectEvent}
//                   // eventPropGetter={(event: Event) => {
//                   //   if (event.count > 1) {
//                   //     return { style: { backgroundColor: 'goldenrod' } };
//                   //   }
//                   //   return {};
//                   // }}
//                 />
//                  {isModalOpen && <MeetingModal meetings={selectedMeetings} onClose={closeModal} />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // const CustomEvent = (event:any) => {
// //   console.log(event,"sadfsdfsd")
// //   return (
// //     <span> <strong> {event.title} </strong> </span>
// //   )
// // }
// // Custom Toolbar Component
// const CustomToolbar = ({ label }: any) => {
//   return (
//     <div className="custom-toolbar ">
//       <strong>{label}</strong>
//       {/* Add custom buttons or components here */}
//     </div>
//   );
// };
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import MeetingModal from '../../components/MeetingDetail';
import { BASE_URL } from "@/constants/ENVIRONMENT_VARIABLES";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import "./style.css";
import moment from 'moment';
import SideMenu from "@/app/dashboard/component/SideMenu";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the calendar styles

const locales = {
  "en-US": enUS,
};

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  meetings: any[]; // Define the type of meetings array as needed
  count: number;
}

export default function P_M_Todo0() {
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [activeEventModal, setActiveEventModal] = useState<null | HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const localizer = momentLocalizer(moment);
  
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  const handleMonthChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedYear(e.target.value);
  };

  const handleSelectSlot = (event: any) => {
    if (typeof event.start === "string") {
      event.start = new Date(event.start);
    }
    if (typeof event.end === "string") {
      event.end = new Date(event.end);
    }
    setActiveEventModal(event);
  };

  const handleSelect = (event: any, e: any) => {
    const { start, end } = event;
    setActiveEventModal(event);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMeetings, setSelectedMeetings] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [visitedEvents, setVisitedEvents] = useState<number[]>([]); 
  const handleEventClick = (event: Event) => {
    // Toggle visited state for the event
    const updatedVisitedEvents = visitedEvents.includes(event.id)
      ? visitedEvents.filter(id => id !== event.id)
      : [...visitedEvents, event.id];
    setVisitedEvents(updatedVisitedEvents);
  };
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
        title: `${eventGroup.length}`,
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
{console.log("isModalOpen",isModalOpen)}
  // Custom Event Component
  const CustomEvent = ({ event }: { event: Event }) => {
    const isVisited = visitedEvents.includes(event.id);
    return (
      <div className={`calendarTopSection calendar-event ${isVisited ? 'visited' : ''}`} onClick={() => handleEventClick(event)}>
        <h4 className="event-title">{event.title}</h4>
        <p>{event.start.toLocaleString()}</p>
        <ul>
          {event.meetings.map((meeting, index) => (

            <li key={index}>
              {/* {console.log("meeting",meeting)} */}
              {/* <strong>Interviewer:</strong> {meeting.interviewer} | */}
              {/* <strong> Time:</strong> {meeting.time} | */}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="">
      <div className="container-fluid my-md-5 my-4">
        <div className="row">
          <div className="col-lg-1 leftMenuWidth ps-0 position-relative">
            <SideMenu />
          </div>

          <div className="col-lg-11 pe-lg-4 ps-lg-0">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-8 projectText">
                <h1>Calendar</h1>
                <p className="mt-3">
                  Enjoy your selecting potential candidates Tracking and Management System.
                </p>
              </div>

              <div className="col-lg-4 mt-3 mt-lg-0 text-center text-lg-end">
                <Link prefetch href="/P_M_JobDescriptions1" className="btn btn-light me-3 mx-lg-2">
                  JD Assets
                </Link>
                <Link prefetch href="P_M_JobDescriptions4" className="btn btn-blue bg-[#0a66c2!important]">
                  Create New JD
                </Link>
              </div>
            </div>

            <div className="TotalEmployees shadow bg-white rounded-3 p-3 w-100 mt-4">
              <div className="md:flex align-items-center">
                <h3 className="projectManHeading">Your Todo’s</h3>
                <div className="ml-auto d-flex todoHeadingSelect">
                  <div className="month-year-picker">
                    <select value={selectedMonth} onChange={handleMonthChange}>
                      <option value="">Select Month</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <select value={selectedYear} onChange={handleYearChange}>
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="d-none d-lg-block" style={{ width: "100%", position: "relative" }}>
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
                  components={{ event: CustomEvent }}
                />
                {isModalOpen && <MeetingModal meetings={selectedMeetings} onClose={closeModal} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom Toolbar Component
const CustomToolbar = ({ label }: any) => {
  return (
    <div className="custom-toolbar">
      <strong>{label}</strong>
      {/* Add custom buttons or components here */}
    </div>
  );
};
