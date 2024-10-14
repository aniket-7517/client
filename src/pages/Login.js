import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../animation/login.css'; // Adjust the path based on your file structure

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/tasklist'); // Redirect to task list if already logged in
    }
  }, [navigate]);

  // Clear error message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(''); // Clear error after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.username || !credentials.password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const { data } = await axios.post('https://server-1t1d.onrender.com/api/user/login', credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/tasklist');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ fontFamily: 'serif', textDecoration: "underline" }}>Login</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="col-md-5 mx-auto border p-5 shadow">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="form-control"
            />
          </div>
          {error && <div className={`alert alert-danger error-message ${error ? 'show' : ''}`}>{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
