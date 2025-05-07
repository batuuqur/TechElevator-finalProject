import React, { useEffect, useState } from "react";
import "./Leaderboard.css"; 
import CharacterService from "../../services/CharacterService";
import { Link } from 'react-router-dom';

export default function FallenLeaderboard() {
  const [sortOption, setSortOption] = useState("level");
  const [sortDirection, setSortDirection] = useState("desc");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleGetDeadCharacters() {
    setLoading(true);
    CharacterService.getAllDeadCharacters()
      .then(result => {
        console.log("Success response: ", result.data);
        setCharacters(result.data);
        setError(null);
      })
      .catch(error => {
        console.error(":-/ Failed to get characters: ", error);
        setError("Failed to load fallen heroes. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    handleGetDeadCharacters();
  }, []);

  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleDirectionChange = (e) => setSortDirection(e.target.value);

  const sortedData = [...characters].sort((a, b) => {
    
    if (sortOption === "name") {
      
      if (sortDirection === "asc") {
        return b.characterName.localeCompare(a.characterName);
      } else {
        return a.characterName.localeCompare(b.characterName);
      }
    }
    
    if (sortOption === "class") {
     
      if (sortDirection === "asc") {
        return b.characterClass.localeCompare(a.characterClass);
      } else {
        return a.characterClass.localeCompare(b.characterClass);
      }
    }
    
    
    if (sortOption === "killedBy") {
      
      if (!a.monster_killed_by && !b.monster_killed_by) return 0;
      if (!a.monster_killed_by) return 1;
      if (!b.monster_killed_by) return -1;
      
      
      if (sortDirection === "asc") {
        return b.monster_killed_by.localeCompare(a.monster_killed_by);
      } else {
        return a.monster_killed_by.localeCompare(b.monster_killed_by);
      }
    }
    
    
    if (sortOption === "level") {
      
      if (sortDirection === "asc") {
        return a.characterLevel - b.characterLevel;
      } else {
        return b.characterLevel - a.characterLevel;
      }
    }
    
    if (sortOption === "monsters") {
      
      if (sortDirection === "asc") {
        return a.number_of_battles - b.number_of_battles;
      } else {
        return b.number_of_battles - a.number_of_battles;
      }
    }
    
    return 0;
  });

  if (loading) {
    return (
      <div className="fallen-card">
        <h2 className="leaderboard-title">Hall of Fallen Heroes</h2>
        <div className="loading-message">Loading fallen heroes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-card">
        <h2 className="leaderboard-title">Hall of Fallen Heroes</h2>
        <div className="error-message">{error}</div>
        <button onClick={handleGetDeadCharacters} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-fallen-card">
      <h2 className="leaderboard-title">Hall of Fallen Heroes</h2>
      <div className="leaderboard-controls">
        {/* <div>
          <label htmlFor="fallen-sort">Sort By:</label>
          <select
            id="fallen-sort"
            className="dropdown"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="level">Level</option>
            <option value="name">Name</option>
            <option value="class">Class</option>
            <option value="monsters">Monsters Beaten</option>
            <option value="killedBy">Monster Killed By</option>
          </select>

          <label htmlFor="fallen-direction">Sort Direction:</label>
          <select
            id="fallen-direction"
            className="dropdown"
            onChange={handleDirectionChange}
            value={sortDirection}
          >
            <option value="desc">Descending (High-Low / A-Z)</option>
            <option value="asc">Ascending (Low-High / Z-A)</option>
          </select>
        </div> */}
      </div>
      {characters.length === 0 ? (
        <div className="empty-state">No fallen heroes yet.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Class</th>
              <th>Level</th>
              <th>Monsters Beaten</th>
              <th>Monster Killed By</th>
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
                <td>{player.monster_killed_by || "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}