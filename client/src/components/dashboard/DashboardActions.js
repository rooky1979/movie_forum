import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dashboard-buttons'>
      <Link to='/edit-profile' className='btn btn-light my-1'>
        <i className='fas fa-user-edit'></i> Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
