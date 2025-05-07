import React, {useEffect, useState} from "react";
import "./Leaderboard.css";
import CharacterService from "../../services/CharacterService";


export default function Leaderboard() {
  const [sortOption, setSortOption] = useState("characterLevel");
  const [sortDirection, setSortDirection] = useState("desc");
  const [characters, setCharacters]=useState([]);

  function handleGetTopAliveCharacters(){
    CharacterService.getAllAliveCharacters()
    .then(result => {
      console.log("Success response: ", result.data);
      setCharacters(result.data);
    })
    .catch(error => {
      console.error(":-/ Failed to get characters: ", error);
    });
  }

    useEffect(() => {
        handleGetTopAliveCharacters();
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

  return (
    <div className="home-leader-card">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div className="leaderboard-controls">
        {/* <div>
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
        </div> */}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Class</th>
            <th>Level</th>
            <th>Monsters Beaten</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}