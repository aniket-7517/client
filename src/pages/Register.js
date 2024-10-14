import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../animation/register.css';

function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.username || !credentials.password) {
      alert('Please fill in both username and password.');
      return;
    }

    if (credentials.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      await axios.post('https://server-1t1d.onrender.com/api/user/register', credentials);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ fontFamily: 'serif', textDecoration: "underline" }}>Register</h1>
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
          {error && <div className="alert alert-danger error-message show">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
