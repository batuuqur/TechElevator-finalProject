import CharacterCreator from "../../components/CharacterCreator/CharacterCreator.jsx";
export default function CharacterCreation({ character }) {
  return (
    
    <div>
       <CharacterCreator/>
      <h3>{character.name}</h3>
      <ul>
        <li>Strength: {character.strength}</li>
        <li>Dexterity: {character.dexterity}</li>
        <li>Constitution: {character.constitution}</li>
        <li>Wisdom: {character.wisdom}</li>
        <li>Intelligence: {character.intelligence}</li>
        <li>Charisma: {character.charisma}</li>
      </ul>
    </div>
  );
}











