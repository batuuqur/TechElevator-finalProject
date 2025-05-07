import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import AuthService from '../../services/AuthService'; // Import your AuthService
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import './Navbar.css';
import Modal from '../../components/Modal/Modal';
import LoginView from '../../views/LoginView/LoginView';
import RegisterView from '../../views/RegisterView/RegisterView';
import AdminMonsterPicker from '../../components/AdminAdamPicker/AdminMonsterPicker.jsx';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMosnterPicker, setShowMonsterPicker] = useState(false);
  const [infoType, setInfoType] = useState(null);

  

  const closeModal = () => {
    setShowMonsterPicker(false);
    setShowLogin(false);
    setShowRegister(false);
    setInfoType(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    closeModal();
  };

  const handleRegisterClick = () => {
    closeModal();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear the Authorization header
    delete axios.defaults.headers.common['Authorization'];

    // Update context
    setUser(null);

    setIsMenuOpen(false);
    navigate('/');
    
  };

  return (
    <nav className="navbar">
        <li className="nav-item">
                {user ? (
                    <a className="nav-link logout-btn" style={{ cursor: 'pointer' }}>
                        <span className="username-badge">{user.username}</span>
                    </a>
                ) : (
                    <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => setShowRegister(true)}>
                        Register
                    </a>
                )}
        </li>
         <li className="nav-item">
            {user ? (
                <a className="nav-link logout-btn" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
                </a>
            ) : (
                <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => setShowLogin(true)}>
                    Login
                </a>
            )}
        </li>

        <li className="nav-item">
                {user ? (
                    <NavLink to="/guide" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Guide Book
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
        
        <li className="nav-item">
            {user && user.authorities?.[0]?.name === 'ROLE_ADMIN' ? (
                <a className="nav-link logout-btn" onClick={()=> setShowMonsterPicker(true)} style={{ cursor: 'pointer' }} >
                Select Monsters
                </a>
            ) : (
                <></>
            )}
        </li>
            
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo username-badge:hover">
          M O N S T E R A M A
        </NavLink>

        {/* Hamburger menu for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        {/* Navigation links */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
                {user ? (
                    <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Home
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
          <li className="nav-item">
                {user ? (
                    <NavLink to="/characterLineUp" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Characters
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
            <li className="nav-item">
                {user ? (
                    <NavLink to="/battle" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Battle
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
          <li className="nav-item">
                {user ? (
                    <NavLink to="/monsters" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Monsters
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
          <li className="nav-item">
                {user ? (
                    <NavLink to="/fallen-heroes" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Fallen Heroes
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
          <li className="nav-item">
                {user ? (
                    <NavLink to="/leaderboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                        Leaderboard
                    </NavLink>
                ) : (
                    <></>
                )}
            </li>
        </ul>
      </div>
        {showLogin && (
            <Modal onClose={closeModal}>
                <LoginView onLogin={handleLoginSuccess} />
            </Modal>
        )}

        {showRegister && (
            <Modal onClose={closeModal}>
                <RegisterView onRegister={handleRegisterClick} />
            </Modal>
        )}
        {showMosnterPicker && (
            <Modal onClose={closeModal}>
                <AdminMonsterPicker/>
            </Modal>
        )}
    </nav>
  );
}