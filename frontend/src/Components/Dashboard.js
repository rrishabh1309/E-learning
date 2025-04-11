import React from 'react';
import {Link} from 'react-router-dom';


const Dashboard = () => {
    const userId = localStorage.getItem('userId');

  return (
    <div className='container'>
        <h2>Welcome {userId}!</h2>
        <p>This is the Dashboard. Have a great Day!</p>
        <Link to = "/courses">Go to Courses</Link>
    </div>
  );
};

export default Dashboard;
