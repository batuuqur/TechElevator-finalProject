import React, { useEffect, useState } from "react";
import "../views/DashBoard/Leaderboard.css"; 
import CharacterService from "../services/CharacterService";
import { Link } from 'react-router-dom';

export default function FallenLeaderboard() {
  const [sortOption, setSortOption] = useState("level");
  const [sortDirection, setSortDirection] = useState("desc");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleGetDeadCharacters() {
    setLoading(true);
    CharacterService.getFallenHeroes()
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
    
    
    if (sortOption === "strength") {
      if (sortDirection === "asc") {
        return a.strength_integer - b.strength_integer;
      } else {
        return b.strength_integer - a.strength_integer;
      }
    }
    
    if (sortOption === "dexterity") {
      if (sortDirection === "asc") {
        return a.dexterity_integer - b.dexterity_integer;
      } else {
        return b.dexterity_integer - a.dexterity_integer;
      }
    }
    
    if (sortOption === "constitution") {
      if (sortDirection === "asc") {
        return a.constitution_integer - b.constitution_integer;
      } else {
        return b.constitution_integer - a.constitution_integer;
      }
    }
    
    if (sortOption === "wisdom") {
      if (sortDirection === "asc") {
        return a.wisdom_integer - b.wisdom_integer;
      } else {
        return b.wisdom_integer - a.wisdom_integer;
      }
    }
    
    if (sortOption === "intelligence") {
      if (sortDirection === "asc") {
        return a.intelligence_integer - b.intelligence_integer;
      } else {
        return b.intelligence_integer - a.intelligence_integer;
      }
    }
    
    if (sortOption === "charisma") {
      if (sortDirection === "asc") {
        return a.charisma_integer - b.charisma_integer;
      } else {
        return b.charisma_integer - a.charisma_integer;
      }
    }
    
    return 0;
  });

  if (loading) {
    return (
      <div className="leaderboard-card">
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
    <div className="fallen-page">
    <div className="leaderboard-header">
      <div className="fallen-icon-row">
      <h2 className="fallen-title">Hall of Fallen Heroes
      
      
      </h2>
      </div>
      <div className="leaderboard-controls">
        <div>
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
            <option value="strength">Strength</option>
            <option value="dexterity">Dexterity</option>
            <option value="constitution">Constitution</option>
            <option value="wisdom">Wisdom</option>
            <option value="intelligence">Intelligence</option>
            <option value="charisma">Charisma</option>
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
        </div>
      </div>

      {characters.length === 0 ? (
        <div className="empty-state">No fallen heroes yet.</div>
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
                <th>Killed By</th>
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
                  <td>{player.monster_killed_by || "Not specified"}</td>
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