import {Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ESG from './pages/ESG';
import UserLayout from './layout/Userlayout';
import AdminRoute from './components/common/AdminRoute';
import Calculator from './pages/Calculator';

function App() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AdminRoute><UserLayout/></AdminRoute>}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="esg" element={<ESG />} />
             <Route path="/calculator" element={<Calculator />} />
          </Route>
        </Routes>
  );
}

export default App;