// import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slices/employeeHandler';
import Swal from 'sweetalert2';
import { AppDispatch } from '../redux/store';

const NavigationBar = () => {
  const auth = localStorage.getItem('token');

  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();

  const showConfirmationDialog = async (title:string, text:string) => {
    const result = await Swal.fire({
      icon: 'question',
      title: title || 'Are you sure?',
      text: text || 'Are you sure you want to proceed?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      padding: '1em',
      customClass: 'sweet-alerts',
    });

    return result.isConfirmed;
  };

  const handleLogout = async () => {
    const confirm = await showConfirmationDialog(
      'Logout User',
      'Are you sure you want to Logout?',
    );
    if (confirm) {
      dispatch(logoutUser());
      navigate('/login');
    }
  };

  return (
    <>
      {auth ? (
        <>
          <div className="navbar">
            <div className="nav-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/add">Add Employee</NavLink>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <Outlet />
        </>
      ) : (
        <>
          <div className="navbar">
            <div className="nav-links">
              <NavLink to="/signup">signup</NavLink>
              <NavLink to="/login">login</NavLink>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};
export default NavigationBar;
