import {useContext, useState} from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import Shop from "../../components/Shop/Shop.jsx";
import Roster from "../../components/Roster/Roster.jsx";
import CharacterCreator from "../../components/CharacterCreator/CharacterCreator.jsx";
import CharacterCreatorShop from "../../components/CharacterCreatorShop/CharacterCreatorShop.jsx";


export default function TurnerTestingView() {
  const user = useContext(UserContext);

  const [selectedClass, setSelectedClass] = useState("Archer");

  const changeArcher = () => {
    setSelectedClass("Archer")
  }

  const changeRogue = () => {
    setSelectedClass("Rogue")
  }

  const changeBarbarian = () => {
    setSelectedClass("Barbarian")
  }

    const displayHideStyle = {display: "none"};

  return (
    <>
        <button onClick={changeRogue}>Change Rogue</button>
        <button onClick={changeArcher}>Change Archer</button>
        <button onClick={changeBarbarian}>Change Barbarian</button>
        <CharacterCreatorShop
            selectedClass={"Barbarian"}
            style={selectedClass === "Barbarian" ? {} : displayHideStyle}
        />
        <CharacterCreatorShop
            selectedClass={"Archer"}
            style={selectedClass === "Archer" ? {} : displayHideStyle}
        />
        <CharacterCreatorShop
            selectedClass={"Rogue"}
            style={selectedClass === "Rogue" ? {} : displayHideStyle}
        />
        <Roster/>
    </>
  );
}