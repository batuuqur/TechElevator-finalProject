import { useEffect, useState } from 'react';
import BattleService from '../../services/BattleService';
import MonsterService from "../../services/MonsterService.js";
import CharacterService from "../../services/CharacterService.js";
import CharacterIDCard from '../IDCards/CharacterIDCard/CharacterIDCard.jsx';
import MiniMonsterIDCard from '../IDCards/MonsterIDCard/MiniMonsterIDCard.jsx';
import './BattlePrepStyle.css';
import {useNavigate} from "react-router-dom";

export default function BattlePrepScreen({ setBattleResults }) {
  const navigate = useNavigate();
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [selectedMonsterId, setSelectedMonsterId] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBattleLoading, setIsBattleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [battlesHad, setBattlesHad] = useState([])

  const getCharacterTier = (characterLevel) => {
    if (characterLevel <= 3) return 1;
    if (characterLevel <= 6) return 2;
    if (characterLevel <= 9) return 3;
    return 4;
  };

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacterId(characterId);
    setSelectedMonsterId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCharacterId || !selectedMonsterId) return;

    const battleData = {
      characterId: selectedCharacterId,
      monsterId: selectedMonsterId,
    };

    try {
      setIsBattleLoading(true);
      const response = await BattleService.postNewBattle(battleData);
      setBattleResults(response.data);
    } catch (error) {
      console.error("Error starting battle!", error);
      setError("Failed to start battle. Please try again.");
    } finally {
      setIsBattleLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [charactersRes, monstersRes, battleRes] = await Promise.all([
          CharacterService.getAliveCharacters(),
          MonsterService.getActiveMonsters(),
          BattleService.getBattles(),
        ]);
        if(charactersRes.data.length === 0){
            navigate("/CharacterLineUp")
        }
        console.log(battleRes.data)
        setBattlesHad(battleRes.data);
        setCharacters(charactersRes.data);
        setMonsters(monstersRes.data);

        if (charactersRes.data.length > 0) {
          setSelectedCharacterId(charactersRes.data[0].characterId);
          setSelectedCharacter(charactersRes.data[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load characters and monsters. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // This useEffect runs only once to fetch the data initially.

  useEffect(() => {
    if (selectedCharacterId && characters.length > 0) {
      const character = characters.find((char) => char.characterId === selectedCharacterId);
      setSelectedCharacter(character);
      setSelectedMonsterId(null);

      if (character) {
        const characterTier = getCharacterTier(character.characterLevel);
        const matchingMonsters = monsters.filter(
          (monster) => monster.monsterTier === characterTier
        );
        if (matchingMonsters.length > 0) {
          setSelectedMonsterId(matchingMonsters[0].monsterId);
        }
      }
    }
  }, [selectedCharacterId, characters, monsters]);

  if (isLoading && characters.length === 0 && monsters.length === 0) {
    return <div className="loading">Loading battle preparation...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // handleMonsterBattledCheck(selectedMonsterId)

  const characterTier = selectedCharacter ? getCharacterTier(selectedCharacter.characterLevel) : null;
  const filteredMonsters = characterTier
    ? monsters.filter((monster) => monster.monsterTier === characterTier)
    .slice(0, 3)
    : [];

  function handleMonsterBattledCheck(monsterId)
  {
    battlesHad.map((charBattlePair)=>{
      console.log("made it into battlesHad")
      if(charBattlePair.character.characterId === selectedCharacterId)
      {
        console.log("battlePair Character is selected Character")
        charBattlePair.monstersBattled.map((monsterBattled)=>{
          console.log("Made it into charBattlePair's Monsters battled")
          if(monsterBattled.monsterId === monsterId)
          {
            console.log("returns monster has been battled")
            // alert("You fought him!");
            return false
          }
        })
      }
    })
    return true
  }

  return (
    <div className="battle-prep-screen">
      <div  className='center-container'>
      <h2 className="h2-dnd-title">READY YOUR ARMS</h2>
      </div>
      {selectedCharacter && (
        <div className="row">
          <div className="character-selection-bar">
            <CharacterIDCard
              characterId={selectedCharacter.characterId}
              selected={true}
            />
            <div className="column">

              {characters.slice(0, 5).map((character) => (
                <div
                  key={character.characterId}
                  className={`character-box ${selectedCharacterId === character.characterId ? 'selected' : ''}`}
                  onClick={() => handleCharacterSelect(character.characterId)}
                >
                  <div className="character-box-name">{character.characterName}</div>
                </div>
              ))}
            </div>
          </div>
          {filteredMonsters.length > 0 ? (
            <div className="monster-selection-bar">
              {filteredMonsters.map((monster) => (
                <div
                  key={monster.monsterId}
                  className={`monster-card ${selectedMonsterId === monster.monsterId ? 'selected' : ''}`}
                >
                  <MiniMonsterIDCard
                    monsterId={monster.monsterId}
                    onClick={() => setSelectedMonsterId(monster.monsterId)}
                    selected={selectedMonsterId === monster.monsterId}
                    selectable={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-monsters-message">
              No monsters available for this character's tier level.
            </div>
          )}
        </div>
      )}
      <div className='center-container'>
        <button
          onClick={handleSubmit}
          disabled={!selectedCharacterId || !selectedMonsterId || isBattleLoading}
          className="button-dnd"
        >
          {isBattleLoading ? 'Starting Battle...' : 'Start Battle'}
        </button>
      </div>
    </div>
  );
}
