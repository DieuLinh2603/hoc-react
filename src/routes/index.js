import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutDefault from "../layout/LayoutDefault";
import CompanyDetail from "../Pages/CompanyDetail";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import JobDetail from "../Pages/JobDetail";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Register from "../Pages/Register";
import Search from "../Pages/Search";
import InfoCompany from "../Pages/InfoCompanny";
import JobManage from "../Pages/JobManage";
import CreateJob from "../Pages/CreateJob";
import DetailJob from "../Pages/DetailJob";
import EditJob from "../Pages/EditJob";
import CVManage from "../Pages/CVManage";
import DetailCV from "../Pages/DetailCV";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "jobs/:id",
        element: <JobDetail />,
      },
      {
        path: "company/:id",
        element: <CompanyDetail />,
      },
    ],
  },

  // private
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        path: "admin",
        element: <Dashboard />,
      },
      {
        path: "info-company",
        element: <InfoCompany />,
      },
      {
        path: "job-manage",
        element: <JobManage />,
      },
      {
        path: "create-job",
        element: <CreateJob />,
      },
      {
        path: "detail-job/:id",
        element: <DetailJob />,
      },
      {
        path: "cv-manage",
        element: <CVManage />,

      },
      {
        path: "detail-cv/:id", 
        element: <DetailCV/>
      }
    ],
  },
];
