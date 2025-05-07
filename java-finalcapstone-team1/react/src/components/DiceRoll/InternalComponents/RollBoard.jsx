import styles from '../DiceRoll.module.css'

export default function RollBoard({children})
{
    return(
        <div className={styles.RollBoard}>
            {children}
        </div>
    )
}