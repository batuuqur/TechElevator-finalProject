import styles from "./DiceRoll.module.css"
import Dice from "./InternalComponents/Dice.jsx";
import {useEffect, useState} from "react";
import {DndContext} from '@dnd-kit/core';
import Draggable from './InternalComponents/Draggable.jsx';
import Droppable from './InternalComponents/Droppable.jsx';
import DiceSlot from "./InternalComponents/DiceSlot.jsx";
import RollBoard from "./InternalComponents/RollBoard.jsx";
import {all} from "axios";

export default function DiceRoll({setDiceRollData}){

    const [isDiceRolled, setIsDiceRolled] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function RollDiceNumbers()
    {
       diceData.forEach((dice)=>{
           dice.value = randomIntFromInterval(1,20)
       })
    }

    function handleDiceRoll()
    {
        setIsDisabled(true)
        RollDiceNumbers()
        setAllDiceData(diceData)
        setIsDiceRolled(true)
    }

    const stats = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
    const statsFullName = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

    const diceData = [
        { diceIndex: 0, id: 'dice1', boundStat: "RollBoard", value: null },
        { diceIndex: 1, id: 'dice2', boundStat: "RollBoard", value: null },
        { diceIndex: 2, id: 'dice3', boundStat: "RollBoard", value: null },
        { diceIndex: 3, id: 'dice4', boundStat: "RollBoard", value: null },
        { diceIndex: 4, id: 'dice5', boundStat: "RollBoard", value: null },
        { diceIndex: 5, id: 'dice6', boundStat: "RollBoard", value: null }
    ];


    const [allDiceData, setAllDiceData] = useState(diceData)
    const [heldDiceValue, setHeldDiceValue] = useState(null)

    function makeSingleDice(index, smallerScale){
        return(
            <Draggable
                key={allDiceData[index].id}
                id={allDiceData[index].id}
                diceIndex={allDiceData[index].diceIndex}
                boundStat={allDiceData[index].boundStat}
                value={allDiceData[index].value}
                smallerScale={smallerScale}
            >
                <Dice value={allDiceData[index].value}/>
            </Draggable>
        )
    }

    function handleDragStart(event) {
        setHeldDiceValue(event.active.data.current.diceValue)
    }

    function handleDragEnd(event) {
        setHeldDiceValue(null)
        const {active, over} = event;

        allDiceData.forEach((diceData)=>{
            diceData.boundStat === over.id ? diceData.boundStat = "RollBoard" : null;
        })

        if (over && over.data.current.accepts.includes(active.data.current.type) && event.over.id !== active.data.current.boundStat)
        {
            allDiceData[active.data.current.diceIndex].boundStat = over.id
        }
    }

    function handleDicePlacementStats(stat)
    {
        let diceForSlot = null;

        allDiceData.map((diceInfo, index)=>{
            if(allDiceData[index].boundStat === stat)
            diceForSlot = makeSingleDice(index, true)
        })

        return (diceForSlot ? diceForSlot : <DiceSlot/>)
    }

    useEffect(() => {
        setDiceRollData([...allDiceData])
    }, [allDiceData]);

    const buttonHideStyle = {zIndex:-1, opacity: 0}

    return (
        <div className={styles.DiceRollContainer}>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

                <div className={styles.StatContainer}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.StatDiv}>
                            <h3 className={styles.StatText}>{statsFullName.at(index)}:</h3>
                            <div className={styles.StatDropZoneContainer}>
                                <Droppable key={index} id={stat}>
                                    {handleDicePlacementStats(stat)}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.RollBoardContainer}>
                    {
                        <button
                            className={styles.RollDiceButton}
                            onClick={handleDiceRoll}
                            disabled={isDisabled}
                            style={isDisabled ? buttonHideStyle : {}}
                        >Roll Dice</button>
                    }
                    <Droppable id="RollBoard">
                        <RollBoard>
                            {isDiceRolled ? allDiceData.map((diceInfo, index)=>{
                                return(allDiceData[index].boundStat !== "RollBoard" ? null : makeSingleDice(index))
                            }) : null}
                        </RollBoard>
                    </Droppable>
                </div>
            </DndContext>
        </div>
    )
}