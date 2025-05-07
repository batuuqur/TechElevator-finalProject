import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';
import { UserContext } from '../../context/UserContext';
import './DashBoard.css';
import { useEffect } from 'react';
import NewLeaderboard from './NewLeaderboard.jsx';
import MonsterOfTheWeek from '../../components/MonsterOfTheWeek/MonsterOfTheWeekList.jsx';
import HomepageMonsterOfTheWeekList from "../../components/HomepageMonsterOfTheWeek/HomepageMonsterOfTheWeekList.jsx";

export default function NotLoggedDash({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [infoType, setInfoType] = useState(null);
  const navigate = useNavigate();

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const user = useContext(UserContext);

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
    setInfoType(null);
  };

  const handleLoginSuccess = (userData) => {
    onLogin(userData);
    closeModal();
  };

  const handleRegisterClick = () => {
    closeModal();
  };

  const handleInfoClick = (type, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 10,      
      left: rect.left + window.scrollX + rect.width - 335,  
    });
    setInfoType(type);
  };

  const getInfoText = (type) => {
    switch (type) {
      case 'monster':
        return 'Each day a community-voted monster appears here. You can click the monster to vote for your favorite and influence what appears tomorrow! *Must be a logged in user to vote*';
      case 'leaderboard':
        return 'This leaderboard shows the top heroes who are still alive and battling monsters. Compete by leveling up and climbing the ranks!';
      default:
        return '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideTooltip = e.target.closest('.tooltip-content');
      const isInfoIcon = e.target.classList.contains('info-icon');
      const isInsideModal = e.target.closest('.modal-content');

      if (!isInsideTooltip && !isInfoIcon && !isInsideModal) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Full-width hero image that spans the entire page width */}
      <section className="hero-img">

      <img src="../Public-Assets/newest-back.jpg" alt="Character Placeholder" />
      </section>
        
          <div className="welcome-box">
            <h1 className="welcome-title">MonsteRama</h1>
            <p className="subtitle">Create your character and battle monsters!</p>
          </div>
        
     

      
      <section className="dashboard-panel game-description">
        <div className= "description-title">What is Monsterama?</div>
        <div className="description-text">
          <h2>Create. Battle. Rise. Fall. Your story lives forever.</h2>
          <p className="description">Dive into a world where your choices echo through eternity. Monsterama combines classic D&D 5e character creation with relentless monster-slaying action that evolves daily</p>
          <p className="description">Craft your hero from scratch—roll for stats, choose your class, and embark on a journey of glory or doom. Face off against a rotating bestiary of over 100 unique monsters that refresh every day, keeping the challenge fresh and unpredictable</p>
          <p className="description">As you triumph in battle, collect gold to forge your arsenal with powerful weapons and armor. Climb through four ascending tiers of challenge, where each victory brings you closer to legendary status—but beware, death lurks around every corner</p>
          <p className="description">In Monsterama, defeat isn't the end—it's immortality. Your fallen heroes earn their place in the Hall of the Fallen, a separate leaderboard honoring those who fought valiantly before meeting their end</p>
          <p className="description">Remember: in this unforgiving realm, death is permanent. Every decision matters. Every battle could be your last</p>
          <p className="description">Will your name rise to the top of the living legends, or will you claim eternal glory in death?</p>
          <p className="description">Monsterama awaits. Roll the dice. Meet your destiny</p>
        </div>
      </section>

      {/* Monster and leaderboard in a horizontal grid */}
      <div className="dashboard-grid not-logged-in">
        <section className="dashboard-panel monster-thingy">
          
          <HomepageMonsterOfTheWeekList/>
          <span className="info-icon" onClick={(e) => handleInfoClick('monster', e)} title="What is this?"> ℹ️ </span>
        </section>
        
        <section className="dashboard-panel leaderboard-card">
          <NewLeaderboard onInfoClick={handleInfoClick} isLoggedIn={false} />
        </section>
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

      {infoType && (
        <div
          className="tooltip-box"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          <div className="tooltip-content">
            <button className="tooltip-close" onClick={closeModal}>
              ×
            </button>
            <p>{getInfoText(infoType)}</p>
          </div>
        </div>
      )}
    </div>
  );
}