import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "../services/api";


const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const location = useLocation();

useEffect(() => {
  axios.post("/activities/log", {
    action: "PAGE_VISIT",
    description: `Visited ${location.pathname}`,
  }).catch(() => {});
}, [location.pathname]);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar user={user} onLogout={handleLogout} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;