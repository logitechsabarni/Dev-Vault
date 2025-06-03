import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function Auth({ type }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = type === 'login' ? '/auth/login' : '/auth/signup';
      const res = await axios.post(API + url, { username, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        alert(res.data.message || 'Success');
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
}

function Vault() {
  const [text, setText] = useState('');
  const [secrets, setSecrets] = useState([]);

  const fetchSecrets = async () => {
    try {
      const res = await axios.get(API + '/secrets', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSecrets(res.data);
    } catch {
      alert('Failed to fetch secrets');
    }
  };

  useEffect(() => { fetchSecrets(); }, []);

  const storeSecret = async () => {
    try {
      await axios.post(API + '/secrets', { text }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setText('');
      fetchSecrets();
    } catch {
      alert('Error storing secret');
    }
  };

  return (
    <div>
      <h2>Your Vault</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter your secret" />
      <button onClick={storeSecret}>Store</button>
      <ul>
        {secrets.map(s => <li key={s.id}>{s.text}</li>)}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Vault</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Vault />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/signup" element={<Auth type="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
