"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import ApplicationsReceived from "@/app/dashboard/component/ProjectManager/ApplicationsReceived";
import SideMenu from "@/app/dashboard/component/SideMenu";
import TotalEmployees from "@/app/dashboard/component/ProjectManager/TotalEmployees";
import NumberofVacancies from "@/app/dashboard/component/ProjectManager/NumberofVacancies";
import Number_of_Interviews from "@/app/dashboard/component/ProjectManager/Number_of_Interviews";
import TodayInterviews from "@/app/dashboard/component/ProjectManager/TodayInterviews";

import PostedJobsCard from "@/app/dashboard/component/ProjectManager/PostedJobsCard";
import CandidateStatus from "@/app/dashboard/component/ProjectManager/CandidateStatus";
import PostedJobsTop from "@/app/dashboard/component/ProjectManager/PostedJobsTop";
import Upcomings from "@/app/dashboard/component/ProjectManager/Upcomings";
import Activity from "@/app/dashboard/component/ProjectManager/Activity";
import HiringCandidates from "@/app/dashboard/component/ProjectManager/HiringCandidates";
import ScheduledInterviewsGraph from "@/app/dashboard/component/ProjectManager/ScheduledInterviewsGraph";
import CalendarProject from "@/app/dashboard/component/ProjectManager/CalendarProject";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Loader from "@/app/dashboard/common/Loader";
import ConsultantCalendar from "./components/ConsultantCalendar";
import MeetingDetail from "./components/MeetingDetail";
import { BASE_URL ,ACCESS_TOKEN} from "@/constants/ENVIRONMENT_VARIABLES";
import {
  dashboardSelector,
  userlogin,
  getActivities,
  getHirings,
  getInterviewAndHiredDetails,
  getPostedJobList,
  getTodayMeetingDetailsList,
  getUpcomings,
  getPostedJobActiveList,
} from "@/store/reducers/dashboard";
import {
  P_M_JOB_DESCRIPTIONS1,
  P_M_JOB_DESCRIPTIONS4,
} from "@/constants/ROUTES";
import { useRouter } from 'next/navigation'
import CalendarView from './components/CalendarView';
interface prss {
  fromDate:any
  
}
const Home:React.FC  = ({}) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboardSelector);
  const router = useRouter()
  useEffect(() => {
    dispatch(getInterviewAndHiredDetails());
    dispatch(getPostedJobList());
    dispatch(getPostedJobActiveList());
    dispatch(getTodayMeetingDetailsList());
    dispatch(getUpcomings());
    dispatch(getActivities());
    dispatch(getHirings());
    dispatch(userlogin());
  }, []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set the loading state to false after 2 seconds (you can adjust this delay)

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // tab start
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className:any;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { className,children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className="p-0" sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (!BASE_URL) {
    return null;
  }
  if (loading) {
    return <Loader />;
  }
  const from_date = "2024-04-01";
  const to_date = "2024-04-30";

  // const MeetingDetailPage = ({ query }) => {
  //   const id = query.id || 3; // Default to id 3 if not provided
  
  //   return <MeetingDetail id={id} />;
  // };
  const activeJobsData = dashboardData?.posted_job_list || [];
  const inactiveJobsData = dashboardData?.posted_job_active_list || [];
 
  //tab end
  return (
    
    <main className="">
      <section className="container-fluid my-md-5 my-4">
        <div className="row">
          <div className="col-lg-1 leftMenuWidth ps-0 position-relative">
            <SideMenu />
          </div>

          <div className="col-lg-11 pe-lg-4 ps-lg-0">
            <div className="row justify-content-between  align-items-center">
              <div className="col-lg-8 projectText">
                <h1>Project Manager</h1>
                <p className="mt-3">
                  Enjoy your selecting potential candidates Tracking and
                  Management System.
                </p>
              </div>

              <div className="col-lg-4 mt-3 mt-lg-0 text-center text-lg-end">
                {P_M_JOB_DESCRIPTIONS1 && (
                  <Link
                    prefetch
                    href={P_M_JOB_DESCRIPTIONS1}
                    className="btn btn-light me-3 mx-lg-2"
                  >
                    JD Assets
                  </Link>
                )}
                {P_M_JOB_DESCRIPTIONS4 && (
                  <Link
                    prefetch
                    href={P_M_JOB_DESCRIPTIONS4}
                    className="btn btn-blue bg-[#0a66c2!important]"
                  >
                    Create New JD
                  </Link>
                )}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-8 col-md-7 mt-3 mt-md-0 projectText d-flex">
                <ScheduledInterviewsGraph />
              </div>

              <div className="col-lg-4 col-md-5 mt-3 mt-md-0">
                <ApplicationsReceived />
              </div>
            </div>

            {/* new section */}

            <div className="row">
              <div className="col-lg-4 col-md-6 mt-4 pt-md-2">
                <TotalEmployees />
              </div>

              <div className="col-lg-4 col-md-6 mt-4 pt-md-2">
                <NumberofVacancies />
              </div>

              <div className="col-lg-4 col-md-12 mt-4 pt-md-2 d-flex">
                <Number_of_Interviews />
              </div>
            </div>

            {/* new section */}

            <div className="row">
              <div className="col-lg-9  mt-4">
                <div className="shadow bg-white p-3">
                  <h3 className="projectManHeading">
                    Today Interviews Meetings Info
                  </h3>
                  <hr className="my-3" />

                  <div className="d-flex overflow-x-scroll interviewScroll">
                    <TodayInterviews />
                    {/* <TodayInterviews />
                    <TodayInterviews />
                    <TodayInterviews /> */}
                  </div>
                </div>

                {/* new section */}

                <div className="shadow bg-white mt-4">
                  <PostedJobsTop
                    titleName="Posted Jobs"
                    classTitle=""
                    classSamll="text-underline"
                    samllText="View All"
                    viewAllPath={"/JobApplication0"} className={undefined} filterBtnClass={undefined}                  />

                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab
                          className="postedTab"
                          label="Active Jobs"
                          {...a11yProps(0)}
                        />
                        <Tab
                          className="postedTab"
                          label="Inactive Jobs"
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>
                    <hr className="mt-0" />
                    <CustomTabPanel className="p-0" value={value} index={0}>
                      <div className="row px-3 pb-3">
                        {Array.isArray(activeJobsData) && activeJobsData.length > 0 ? (
                          activeJobsData.map((job: any, index: any) => (
                            <PostedJobsCard key={index} {...job} />
                          ))
                        ) : (
                          <p>No active jobs available</p>
                        )}
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel
                      className="p-0 bg-dark"
                      value={value}
                      index={1}
                    >
                      <div className="row px-3 pb-3">
                        {Array.isArray(inactiveJobsData) && inactiveJobsData.length > 0 ? (
                          inactiveJobsData.map((job: any, index: any) => (
                            <PostedJobsCard key={index} {...job} />
                          ))
                        ) : (
                          <p>No inactive jobs available</p>
                        )}
                      </div>
                    </CustomTabPanel>
                  </Box>
                </div>

                {/* new sections */}
                <div className="shadow bg-white mt-4">
                  <PostedJobsTop
                    titleName="Candidate Status"
                    classSamll="text-underline"
                    samllText="View All"
                    viewAllPath={"/CandidateStatusList"} className={undefined} classTitle={undefined} filterBtnClass={undefined}                  />
                  <CandidateStatus />
{/* 
                  <h1>Calendar</h1>
                  <CalendarView fromDate="2024-04-01" toDate="2024-04-30" /> */}
                  
                </div>
              </div>

              <div className="col-lg-3 mt-4">
                <div className="overflow-hidden d-flex justify-center ">
                  <CalendarProject />
                </div>
                <div className="mt-5">
                  <Upcomings />
                </div>

                <div className="mt-5">
                  <Activity />
                </div>

                <div className="mt-5">
                  <HiringCandidates />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Home;