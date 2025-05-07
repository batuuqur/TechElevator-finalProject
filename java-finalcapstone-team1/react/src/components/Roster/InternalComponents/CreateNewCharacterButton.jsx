import {NavLink} from "react-router-dom";
import styles from "../Roster.module.css"

export default function CreateNewCharacterButton()
{
    
    return(
        <div className={styles.createButtonContainer}>
            <NavLink className={styles.createButton} to={"/CharacterCreation"}>Create Character</NavLink>
        </div>
        
    )
    
}