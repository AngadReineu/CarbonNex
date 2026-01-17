import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, LogOut, User } from 'lucide-react';
import { Calculator as CalculatorIcon } from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import bg from '../../assets/xv.png'

const Sidebar = ({ user, onLogout }) => {
  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    { 
      path: '/esg', 
      label: 'ESG Data Management',
      icon: <Database className="w-5 h-5" />
    },
    {
  path: "/calculator",
  label: "Calculator",
  icon: <CalculatorIcon className="w-5 h-5" />
}

  ];

  return (
    <aside className="w-64 bg-[##00d5be]/70 min-h-[calc(100vh-80px)] border-r border-white/40 shadow-xl flex flex-col"
    style={{
    backgroundImage: `url(${bg})`,
  }}>
      <div className="p-6 border-b flex-1">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${
                user?.role === 'admin' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
              <span className="text-xs text-gray-500">{user?.email}</span>
            </div>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/40 shadow-xl rounded-xl">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;