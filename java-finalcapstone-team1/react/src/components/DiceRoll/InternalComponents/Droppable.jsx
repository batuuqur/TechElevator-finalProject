import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import styles from '../DiceRoll.module.css'

export default function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
        data: {
            accepts: ['dice1', 'dice2', 'dice3', 'dice4', 'dice5', 'dice6']
        }
    });

    return (
        <div ref={setNodeRef} className={styles.DroppableDiv}>
            {props.children}
        </div>
    );
}