import BattlePrepScreen from "../../components/BattlePrepScreen/BattlePrepScreen.jsx";
import NewBattleResults from "../../components/NewBattleResults/NewBattleResults.jsx"
import {useState} from "react";

export default function BattleView()
{
    const [battleResults, setBattleResults] = useState(null);

    return(
        <>
            {battleResults ? <NewBattleResults battleResults={battleResults} />:<BattlePrepScreen setBattleResults={setBattleResults} />}
        </>
    )
}