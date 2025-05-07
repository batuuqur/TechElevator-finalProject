import { useState, useEffect } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomepageRosterView.css';
import CharacterService from '../../services/CharacterService';

export default function HomepageRosterView() {

  const [apiData, setApiData] = useState([])
  const [characters, setCharacters] = useState([]);
  const [infoVisible, setInfoVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    CharacterService.getAliveCharacters()
        .then((result)=>{
          console.log("Success response:", result.data);
          setCharacters(result.data)
          // setApiData(result.data)
        })
        .catch(error => {
          console.error(":-/ Failed to get characters: ", error);
        });
  }, []);

  // useEffect(() => {
  //   apiData.map((character)=>{
  //     setCharacters((prevChar) => {return [...prevChar, character.characterData]})
  //   })
  // }, [apiData]);

  // Handle info icon click
  const handleInfoClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 10,
      left: rect.left + window.scrollX + rect.width - 335,
    });
    setInfoVisible(!infoVisible);
  };

  // Close tooltip
  const closeTooltip = () => setInfoVisible(false);

  function printData()
  {
    console.log(apiData)
    console.log(characters)
  }

  return (
    <section className="character-creation">
      <h2 className="character-selection-heading">
        Character Selection
        <span
          className="info-icon-roster"
          title="What is this?"
          onClick={handleInfoClick}
        >
          ℹ️
        </span>
      </h2>

      <div className="character-selection">
        <div className="character-options">
          {characters.map((char, index) => (
            <div className="character-slot" key={index}>
              {char ? (
                <>
                  <div className="character-image">
                    {char.imageUrl ? (
                      <img src={char.imageUrl} alt={char.characterName} />
                    ) : (
                      <div className="image-placeholder">🧍</div>
                    )}
                  </div>
                  <div className="character-name">{char.characterName}</div>
                </>
              ) : (
                <div className="empty-slot">⚪️</div>
              )}
            </div>
          ))}
        </div>

        <div className="character-actions">
          <NavLink to="/CharacterLineUp" className="btn view-btn">View</NavLink>
        </div>
        <p className="selection-hint">Must select 1 or more character</p>
      </div>

      {/* Tooltip for info icon */}
      {infoVisible && (
        <div className="tooltip-box" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <div className="tooltip-content">
            <button className="tooltip-close" onClick={closeTooltip}>×</button>
            <p>Select "View" in order to view all your characters. Here, you can create, delete, and view all of your currently living heroes.</p>
          </div>
        </div>
      )}

      {/*<button onClick={printData}>Print Data</button>*/}
    </section>
  )
}
