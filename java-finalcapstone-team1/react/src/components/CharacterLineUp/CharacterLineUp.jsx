import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './CharacterLineUp.css';
import CharacterService from '../../services/CharacterService';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

export default function CharacterLineUp() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const totalSlots = 5;
  const navigate = useNavigate();


  function handleGetAliveCharacters() {
    CharacterService.getAliveCharacters()
      .then(result => {
        const filledCharacters = [...result.data];
        while (filledCharacters.length < totalSlots) {
          filledCharacters.push(null);
        }
        setCharacters(filledCharacters);
      })
      .catch(error => {
        console.error("Failed to get characters:", error);
      });
  }

  const handleDeleteCharacter = (character, index) => {
    if (!character || !character.characterId) return;
    const confirmDelete = window.confirm(character.number_of_battles <= 0 ? `Delete ${character.characterName}?` : `Send ${character.characterName} to The Shadow Realm?`);
    if (!confirmDelete) return;

    CharacterService.deleteCharacter(character.characterId)
      .then(() => {
        setSelectedCharacter(null);
        handleGetAliveCharacters();
      })
      .catch(error => {
        console.error(":-/ Failed to delete character:", error);
      });
  };

  useEffect(() => {
    handleGetAliveCharacters();
  }, []);

  return (
    <>
    <h2 className="character-header">Your Characters</h2>
    <div className="character-lineup">
      <div className="lineup-container">
        <div className="lineup-grid">
            {characters.map((character, index) => (
              <div
                className={`lineup-slot ${selectedCharacter?.characterId === character?.characterId ? 'selected' : ''}`}
                key={index}
                onClick={() => character && setSelectedCharacter(character)}
              >
                {character ? (
                  <>
                    <div className="character-name">{character.characterName}</div>
                    <div className="slot-buttons">
                      <button
                        className="btn delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCharacter(character, index);
                        }}
                      >
                        –
                      </button>
                    </div>

                    {/* I decided to put stat box, inside slot(DON'T FORGET)  */}
                    {selectedCharacter?.characterId === character?.characterId && (
                      <CharacterDetails character={character} />
                    )}
                  </>
                ) : (
                  <NavLink to={`/CharacterCreation?slot=${index}`} className="btn add-btn">
                    +
                  </NavLink>
                )}
              </div>
            ))}
        </div>
      </div>

      
    </div>
    </>
  );
}


// // CharacterService.js
// const getAllWeapons = () => axios.get('/weapons');
// const getAllArmors = () => axios.get('/armors');


// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import './CharacterLineUp.css';
// import CharacterService from '../../services/CharacterService';

// export default function CharacterLineUp() {
//   const [characters, setCharacters] = useState([]);
//   const [selectedCharacter, setSelectedCharacter] = useState(null);
//   const totalSlots = 5;
//   const navigate = useNavigate();

//   function handleGetAliveCharacters() {
//     CharacterService.getAliveCharacters()
//       .then(result => {
//         const filledCharacters = [...result.data];
//         while (filledCharacters.length < totalSlots) {
//           filledCharacters.push(null);
//         }
//         setCharacters(filledCharacters);
//       })
//       .catch(error => {
//         console.error("Failed to get characters:", error);
//       });
//   }

//   const handleDeleteCharacter = (character, index) => {
//     if (!character || !character.characterId) return;
//     const confirmDelete = window.confirm(`Delete ${character.characterName}?`);
//     if (!confirmDelete) return;

//     CharacterService.deleteCharacter(character.characterId)
//       .then(() => {
//         setSelectedCharacter(null);
//         handleGetAliveCharacters();
//       })
//       .catch(error => {
//         console.error(":-/ Failed to delete character:", error);
//       });
//   };

//   useEffect(() => {
//     handleGetAliveCharacters();
//   }, []);

//   return (
//     <>
//     <h2>Your Characters</h2>
//     <div className="character-lineup">
//       <div className="lineup-container">
//         <div className="lineup-grid">
//             {characters.map((character, index) => (
//             <div
//                 className={`lineup-slot ${selectedCharacter?.characterId === character?.characterId ? 'selected' : ''}`}
//                 key={index}
//                 onClick={() => character && setSelectedCharacter(character)}
//             >
//                 {character ? (
//                 <>
//                     <div className="character-name">{character.characterName}</div>
//                     <div className="slot-buttons">
//                     <button
//                         className="btn delete-btn"
//                         onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteCharacter(character, index);
//                         }}
//                     >
//                         –
//                     </button>
//                     </div>
//                 </>
//                 ) : (
//                 <NavLink to={`/CharacterCreation?slot=${index}`} className="btn add-btn">
//                     +
//                 </NavLink>
//                 )}
//             </div>
//             ))}
//         </div>
//       </div>

//       {selectedCharacter && (
//         <div className="character-details-inline">
//           <h3>{selectedCharacter.characterName}</h3>
//           <p><strong>Class:</strong> {selectedCharacter.characterClass}</p>
//           <ul>
//             <li><strong>Strength:</strong> {selectedCharacter.strength_integer}</li>
//             <li><strong>Dexterity:</strong> {selectedCharacter.dexterity_integer}</li>
//             <li><strong>Constitution:</strong> {selectedCharacter.constitution_integer}</li>
//             <li><strong>Wisdom:</strong> {selectedCharacter.wisdom_integer}</li>
//             <li><strong>Intelligence:</strong> {selectedCharacter.intelligence_integer}</li>
//             <li><strong>Charisma:</strong> {selectedCharacter.charisma_integer}</li>
//           </ul>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }