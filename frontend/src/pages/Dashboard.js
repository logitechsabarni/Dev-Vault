import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/protected`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Dashboard</h2>
      <p>{message || 'Loading...'}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
