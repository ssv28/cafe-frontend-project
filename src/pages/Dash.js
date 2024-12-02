import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); 
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome, Admin!</h1>
    </div>
  );
}

export default Dash;
