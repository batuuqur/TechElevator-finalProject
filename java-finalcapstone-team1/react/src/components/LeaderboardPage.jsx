import React, {useEffect, useState} from "react";
import "../views/DashBoard/Leaderboard.css";
import CharacterService from "../services/CharacterService";
import { Link } from 'react-router-dom';

export default function LeaderboardPage() {
  const [sortOption, setSortOption] = useState("characterLevel");
  const [sortDirection, setSortDirection] = useState("desc");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleGetAllAliveCharacters() {
    setLoading(true);
    CharacterService.getLeaderboard()
      .then(result => {
        console.log("Success response: ", result.data);
        setCharacters(result.data);
        setError(null);
      })
      .catch(error => {
        console.error(":-/ Failed to get characters: ", error);
        setError("Failed to load leaderboard. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    handleGetAllAliveCharacters();
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const sortedData = [...characters].sort((a, b) => {
    
    if (sortOption === "characterName") {
      
      if (sortDirection === "asc") {
        return b.characterName.localeCompare(a.characterName);
      } else {
        return a.characterName.localeCompare(b.characterName);
      }
    }
    
    if (sortOption === "characterClass") {
      
      if (sortDirection === "asc") {
        return b.characterClass.localeCompare(a.characterClass);
      } else {
        return a.characterClass.localeCompare(b.characterClass);
      }
    }
    
    
    if (sortOption === "characterLevel") {
      
      if (sortDirection === "asc") {
        return a.characterLevel - b.characterLevel;
      } else {
        return b.characterLevel - a.characterLevel;
      }
    }
    
    if (sortOption === "number_of_battles") {
      
      if (sortDirection === "asc") {
        return a.number_of_battles - b.number_of_battles;
      } else {
        return b.number_of_battles - a.number_of_battles;
      }
    }
    
   
    if (["strength_integer", "dexterity_integer", "constitution_integer", 
         "wisdom_integer", "intelligence_integer", "charisma_integer"].includes(sortOption)) {
      
      if (sortDirection === "asc") {
        return a[sortOption] - b[sortOption];
      } else {
        return b[sortOption] - a[sortOption];
      }
    }
    
    return 0;
  });

  if (loading) {
    return (
      <div className="leaderboard-card">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <div>
          <Link to="/dashboard" className="return-btn">Back to Dashboard</Link>
        </div>
        <div className="loading-message">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-card">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <div>
          <Link to="/dashboard" className="return-btn">Back to Dashboard</Link>
        </div>
        <div className="error-message">{error}</div>
        <button onClick={handleGetAllAliveCharacters} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className = "fallen-page">
    <div className="leaderboard-header">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div>
        {/* <Link to="/dashboard" className="return-btn">Back to Dashboard</Link> */}
      </div>
      <div className="leaderboard-controls">
        <div>
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            className="dropdown"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="characterLevel">Level</option>
            <option value="characterName">Name</option>
            <option value="characterClass">Class</option>
            <option value="number_of_battles">Monsters Beaten</option>
            <option value="strength_integer">Strength</option>
            <option value="dexterity_integer">Dexterity</option>
            <option value="constitution_integer">Constitution</option>
            <option value="wisdom_integer">Wisdom</option>
            <option value="intelligence_integer">Intelligence</option>
            <option value="charisma_integer">Charisma</option>
          </select>

          <label htmlFor="direction">Sort Direction:</label>
          <select
            id="direction"
            className="dropdown"
            onChange={handleDirectionChange}
            value={sortDirection}
          >
            <option value="desc">Descending (High-Low / A-Z)</option>
            <option value="asc">Ascending (Low-High / Z-A)</option>
          </select>
        </div>
      </div>

      {characters.length === 0 ? (
        <div className="empty-state">No characters found.</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
            
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Class</th>
                <th>Level</th>
                <th>Monsters Beaten</th>
                <th>Strength</th>
                <th>Dexterity</th>
                <th>Constitution</th>
                <th>Wisdom</th>
                <th>Intelligence</th>
                <th>Charisma</th>
              </tr>
              
            </thead>
            <tbody>
              {sortedData.map((player, idx) => (
                <tr key={idx}>
                  <td>{sortDirection === "asc" ? sortedData.length - idx : idx + 1}</td>
                  <td>{player.characterName}</td>
                  <td>{player.characterClass}</td>
                  <td>{player.characterLevel}</td>
                  <td>{player.number_of_battles}</td>
                  <td>{player.strength_integer}</td>
                  <td>{player.dexterity_integer}</td>
                  <td>{player.constitution_integer}</td>
                  <td>{player.wisdom_integer}</td>
                  <td>{player.intelligence_integer}</td>
                  <td>{player.charisma_integer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}