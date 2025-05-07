import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
// import './DashBoard.css';
import Modal from '../../components/Modal/Modal';
import HomepageRosterView from "../../components/HomepageRosterView/HomepageRosterView.jsx";
import { useEffect } from 'react';
import NewLeaderboard from './NewLeaderboard.jsx';
import FallenLeaderboard from './FallenHeroes.jsx';
import CharacterService from '../../services/CharacterService.js';
import MonsterOfTheWeek from '../../components/MonsterOfTheWeek/MonsterOfTheWeekList.jsx';

export default function LoggedDash() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [infoType, setInfoType] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleInfoClick = (type, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 10,
      left: rect.left + window.scrollX + rect.width - 335,
    });
    setInfoType(type);
  };

  const closeModal = () => {
    setInfoType(null);
  };

  const getInfoText = (type) => {
    switch (type) {
      case 'characters':
        return 'Select "View" in order to view all your characters. Here, you can create, delete, and view all of your currently living heroes';
      case 'heroes':
        return 'These are the fallen champions who battled bravely. Once a hero dies, their name is immortalized here in the Hall of Fallen Heroes.';
      case 'monster':
        return 'Each day a community-voted monster appears here. You can click the monster to vote for your favorite and influence what appears tomorrow!';
      case 'leaderboard':
        return 'This leaderboard shows the top heroes who are still alive and battling monsters. Compete by leveling up and climbing the ranks!';
      default:
        return '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.tooltip-content') && !e.target.classList.contains('info-icon')) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      <section className="hero-img">

      <img src="../Public-Assets/newest-back.jpg" alt="Character Placeholder" />
      <Link to="/characterLineUp" className="character-button">
              Create Your Character
            </Link>
      </section>
      
          <div className="welcome-box">
            <h1 className="welcome-title">MonsteRama</h1>
            <p className="subtitle">Welcome back {user?.username || 'Player'}!</p>
          </div>
        
          

      {/* Character Selection/Roster Section */}
      {/* <HomepageRosterView onInfoClick={handleInfoClick} /> */}

      {/* Main Dashboard Grid - Based on your sketch */}
      <div className="dashboard-grid logged-in">
        {/* Left Side - Leaderboard */}
        <section className="leaderboard-card">
          <NewLeaderboard onInfoClick={handleInfoClick} isLoggedIn={!!user} />
        </section>

        {/* Right Side - Hall of Fallen Heroes */}
        <section className="fallen-heroes-card">
          <FallenLeaderboard />
        </section>
      </div>

      

      {/* Info Tooltip */}
      {infoType && (
        <div className="tooltip-box" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <div className="tooltip-content">
            <button className="tooltip-close" onClick={closeModal}>×</button>
            <p>{getInfoText(infoType)}</p>
          </div>
        </div>
      )}
    </div>
  );
}





