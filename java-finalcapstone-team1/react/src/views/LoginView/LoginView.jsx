import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import styles from './LoginView.module.css';


export default function LoginView({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isInModal = location.pathname !== '/login';

  function handleSubmit(event) {
    event.preventDefault();

    AuthService.login({ username, password })
      .then((response) => {
        // Grab the user, user role and token
        const user = response.data.user;
        const token = response.data.token;
        const role = response.data.role;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Add the login and role data to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role)
        localStorage.setItem('token', token);

        // Use the callback to add user to state
        if (onLogin){
        onLogin(user);
        }

        // Navigate to the home page
        if (!isInModal){
        navigate('/');
        }
      })
      .catch((error) => {
        // Check for a response message, but display a default if that doesn't exist
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message: message });
      });
  }

  

  return (
    <div id="view-login">
      <Notification notification={notification} clearNotification={() => setNotification(null)} />

      <form onSubmit={handleSubmit}>

        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} size="50" required autoFocus autoComplete="username"
              onChange={ event => setUsername(event.target.value)} />
        </div>



        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} size="50" required
              onChange={ event => setPassword(event.target.value)} />
        </div>



        <button type="submit" className={`btn-primary ${styles.formButton}`}>Sign in</button>
        <Link to="/register" className={`btn-primary ${styles.formButton}`}>New? Register here!</Link>
      </form>
    </div>
  );
}
