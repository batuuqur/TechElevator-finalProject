import CharacterService from "../../services/CharacterService.js";
import {useEffect, useState} from "react";
import CharacterDetails from "../CharacterDetails/CharacterDetails.jsx";
import MiniCharacterIDCard from "../IDCards/CharacterIDCard/MiniCharacterIDCard.jsx";
import styles from "./Roster.module.css"
import CreateNewCharacterButton from "./InternalComponents/CreateNewCharacterButton.jsx";
import CharacterRosterDetails from "../CharacterRoasterDetail/CharacterRoasterDetail.jsx";
import Shop from "../Shop/Shop.jsx";
import {useNavigate} from "react-router-dom";

export default function Roster()
{
    const navigate = useNavigate();
    const [loading, setLoading] =useState(true)
    const [apiData, setApiData] = useState([])
    const [amountOfCharacters, setAmountOfCharacters] = useState(0)
    const [characterSlot1Data, setCharacterSlot1Data] = useState()
    const [characterSlot2Data, setCharacterSlot2Data] = useState()
    const [characterSlot3Data, setCharacterSlot3Data] = useState()
    const [characterSlot4Data, setCharacterSlot4Data] = useState()
    const [characterSlot5Data, setCharacterSlot5Data] = useState()
    const [selectedCharacterSlot, setSelectedCharacterSlot] = useState(1)
    const [selectedCharacterData, setSelectedCharacterData] = useState()

    useEffect(()=>{

    },[])

    useEffect(() => {
        setLoading(true)
        CharacterService.getCharacters()
            .then((res)=>{
                // console.log(res.data)
                if(res.data.length === 0)
                {
                    navigate("/CharacterCreation")
                }
                setApiData(res.data)
                setSelectedCharacterData(res.data.at(0))
                setCharacterSlot1Data(res.data.at(0))
                setCharacterSlot2Data(res.data.at(1))
                setCharacterSlot3Data(res.data.at(2))
                setCharacterSlot4Data(res.data.at(3))
                setCharacterSlot5Data(res.data.at(4))
                setAmountOfCharacters(res.data.length)
                setLoading(false)
            })
    }, [navigate]);

    function handleCharacterChange(number)
    {
        if(selectedCharacterSlot === 1 && number === -1)
        {
            setSelectedCharacterSlot(amountOfCharacters)
        }
        else if(selectedCharacterSlot === amountOfCharacters && number === 1)
        {
            setSelectedCharacterSlot(1)
        }
        else
        {
            setSelectedCharacterSlot(selectedCharacterSlot+number)
        }
    }

    useEffect(()=>{
        if(selectedCharacterSlot === 1){
            setSelectedCharacterData(characterSlot1Data)
        }
        if(selectedCharacterSlot === 2){
            setSelectedCharacterData(characterSlot2Data)
        }
        if(selectedCharacterSlot === 3){
            setSelectedCharacterData(characterSlot3Data)
        }
        if(selectedCharacterSlot === 4){
            setSelectedCharacterData(characterSlot4Data)
        }
        if(selectedCharacterSlot === 5){
            setSelectedCharacterData(characterSlot5Data)
        }
    },[selectedCharacterSlot])

    function handleCharacterDelete(character)
    {
        console.log(selectedCharacterData)
        if (!character) return;
        const confirmDelete = window.confirm(character.characterData.number_of_battles <= 0 ? `Delete ${character.characterData.characterName}?` : `Send ${character.characterData.characterName} to The Shadow Realm?`);
        if (!confirmDelete) return;

        CharacterService.deleteCharacter(character.characterData.characterId)
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                console.error(":-/ Failed to delete character:", error);
            });
    }


    const notSelectedStyle = {
        opacity: 0.5
    }

    const displayHideStyle = {display: "none"};

    if(loading)
    {
        return <>loading...</>
    }

    return(
        <>
            <div className={styles.TopNav}>
            <div className={styles.CharacterSwitcherContainer}>
                <button className={styles.LeftRightButton} onClick={()=>{handleCharacterChange(-1)}}>{"⮘"}</button>
                <div className={styles.charactersContainer}>
                    {
                        amountOfCharacters > 0 ?
                            <MiniCharacterIDCard
                                characterData={characterSlot1Data.characterData}
                                style={selectedCharacterSlot !== 0 ? (1 === selectedCharacterSlot ? null : displayHideStyle) : null}
                            />
                            : null
                    }
                    {
                        amountOfCharacters > 1 ?
                            <MiniCharacterIDCard
                                characterData={characterSlot2Data.characterData}
                                style={selectedCharacterSlot !== 0 ? (2 === selectedCharacterSlot ? null : displayHideStyle) : null}
                            />
                            : null
                    }
                    {
                        amountOfCharacters > 2 ?
                            <MiniCharacterIDCard
                                characterData={characterSlot3Data.characterData}
                                style={selectedCharacterSlot !== 0 ? (3 === selectedCharacterSlot ? null : displayHideStyle) : null}
                            /> : null
                    }
                    {
                        amountOfCharacters > 3 ?
                            <MiniCharacterIDCard
                                characterData={characterSlot4Data.characterData}
                                style={selectedCharacterSlot !== 0 ? (4 === selectedCharacterSlot ? null : displayHideStyle) : null}
                            />
                            : null
                    }
                    {
                        amountOfCharacters > 4 ?
                            <MiniCharacterIDCard
                                characterData={characterSlot5Data.characterData}
                                style={selectedCharacterSlot !== 0 ? (5 === selectedCharacterSlot ? null : displayHideStyle) : null}
                            />
                            : null
                    }
                </div>
                <button className={styles.LeftRightButton} onClick={()=>{handleCharacterChange(1)}}>{"⮚"}</button>
                <button className={styles.createButton}onClick={()=>{navigate("/CharacterCreation")}}> Create Character</button>
                <button className={styles.createButton}onClick={()=>{handleCharacterDelete(selectedCharacterData)}}>Delete Character</button>
            </div>
            </div>
            {
                amountOfCharacters > 0 ?
                    <div
                        className={styles.tabContainer}
                        style={selectedCharacterSlot !== 0 ? (1 === selectedCharacterSlot ? null : displayHideStyle) : null}
                    >
                        <CharacterRosterDetails characterDTO={characterSlot1Data}/>
                        <Shop character={characterSlot1Data}/>
                    </div> : null
            }
            {
                amountOfCharacters > 1 ?
                    <div
                        className={styles.tabContainer}
                        style={selectedCharacterSlot !== 0 ? (2 === selectedCharacterSlot ? null : displayHideStyle) : null}
                    >
                        <CharacterRosterDetails characterDTO={characterSlot2Data}/>
                        <Shop character={characterSlot2Data}/>
                    </div> : null
            }
            {
                 amountOfCharacters > 2 ?
                    <div
                        className={styles.tabContainer}
                        style={selectedCharacterSlot !== 0 ? (3 === selectedCharacterSlot ? null : displayHideStyle) : null}
                    >
                         <CharacterRosterDetails characterDTO={characterSlot3Data}/>
                         <Shop character={characterSlot3Data}/>
                    </div> : null
            }
            {
                amountOfCharacters > 3 ?
                    <div
                        className={styles.tabContainer}
                        style={selectedCharacterSlot !== 0 ? (4 === selectedCharacterSlot ? null : displayHideStyle) : null}
                    >
                          <CharacterRosterDetails characterDTO={characterSlot4Data}/>
                          <Shop character={characterSlot4Data}/>
                    </div> : null
            }
            {
                amountOfCharacters > 4 ?
                    <div
                        className={styles.tabContainer}
                        style={selectedCharacterSlot !== 0 ? (5 === selectedCharacterSlot ? null : displayHideStyle) : null}
                    >
                          <CharacterRosterDetails characterDTO={characterSlot5Data}/>
                          <Shop character={characterSlot5Data}/>
                    </div>: null
            }
        </>
    )
}