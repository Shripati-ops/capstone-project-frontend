import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Banner from "../partials/Banner";
import { useUserContext } from "../context/userContext";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    name,
    setName,
    email,
    setEmail,
    avatar,
    setAvatar,
    role,
    setRole,
    _id,
    setId,
  } = useUserContext();
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await localStorage.getItem("access_token");
        setToken(accessToken);

        if (accessToken) {
          const data = jwtDecode(accessToken);
          const name = data.userData.firstName + " " + data.userData.lastName;
          const email = data.userData.email;
          const avatar = data.userData.avatar;
          const role = data.userData.role;
          const id = data.userData._id;
          // Update state variables
          setName(name);
          setEmail(email);
          setAvatar(avatar);
          setRole(role);
          setId(id);
          // Update userData after state updates are completed
          setUserData({ name, email, avatar, role, id });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userData={userData}
        />

        <main>
          <Outlet />
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
