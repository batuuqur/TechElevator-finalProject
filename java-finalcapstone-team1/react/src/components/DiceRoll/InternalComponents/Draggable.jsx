import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import styles from '../DiceRoll.module.css'

export default function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {
            diceIndex: props.diceIndex,
            type: props.id,
            diceValue: props.value,
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.2)`,
    } : undefined;

    return (
        <div className={styles.DiceButtonContainer}>
            <button ref={setNodeRef} className={styles.DragButton} style={style} {...listeners} {...attributes}>
                {props.children}
            </button>
        </div>
    );
}