
import {useContext, useEffect, useState} from "react";
import CharacterDetails from "../../components/CharacterRoasterDetail/CharacterRoasterDetail";
import CharacterService from "../../services/CharacterService";
import CharacterCreator from "../../components/CharacterCreator/CharacterCreator";
import BatuCharacterCreator
  from "../../components/BatuhanComponentsForDoingSomeFunnyStuff/BatuCharacterCreator/BatuCharacterCreator.jsx";
import BatuCharacterCreatorShop
  from "../../components/BatuhanComponentsForDoingSomeFunnyStuff/BatuCharacterCreatorShop/BatuCharacterCreatorShop.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import HomepageMonsterOfTheWeekList from "../../components/HomepageMonsterOfTheWeek/HomepageMonsterOfTheWeekList.jsx";

export default function BautTestingView() {

  const displayHideStyle = {display: "none"};

  const [selectedClass, setSelectedClass] = useState("Barbarian");

  const changeArcher = () => {
    setSelectedClass("Archer")
  }

  const changeRogue = () => {
    setSelectedClass("Rogue")
  }

  const changeBarbarian = () => {
    setSelectedClass("Barbarian")
  }
  const [characterClass, setCharacterClass] = useState("Barbarian");

  return (
    //   <>
    //     <BatuCharacterCreator/>
    //     <button onClick={changeRogue}>Change Rogue</button>
    //     <button onClick={changeArcher}>Change Archer</button>
    //     <button onClick={changeBarbarian}>Change Barbarian</button>
    //     <BatuCharacterCreatorShop
    //       selectedClass={"Barbarian"}
    //       style={selectedClass === "Barbarian" ? {} : displayHideStyle}
    //     />
    //     <BatuCharacterCreatorShop
    //         selectedClass={"Rogue"}
    //         style={selectedClass === "Rogue" ? {} : displayHideStyle}
    //     />
    //     <BatuCharacterCreatorShop
    //         selectedClass={"Archer"}
    //         style={selectedClass === "Archer" ? {} : displayHideStyle}
    //     />
    //   </>
    <>
        {/* <BatuCharacterCreator/> */}
        <HomepageMonsterOfTheWeekList/>
        </>
    
  );
}
