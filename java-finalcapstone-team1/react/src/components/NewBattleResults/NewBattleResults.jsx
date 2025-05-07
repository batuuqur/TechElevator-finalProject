import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../NewBattleResults/NewBattleResults.css';
import CharacterIDCard from '../../components/IDCards/CharacterIDCard/CharacterIDCard';
import MonsterIDCard from '../../components/IDCards/MonsterIDCard/MonsterIDCard';

export default function NewBattleResults({ battleResults }) {
    const [visibleRows, setVisibleRows] = useState(0);
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const [characterName, setCharacterName] = useState("");
    const [monsterName, setMonsterName] = useState("");
    const [battleWinner, setBattleWinner] = useState("");
    const [battleRecap, setBattleRecap] = useState([]);

    console.log(battleResults.characterBeforeBattle)

    useEffect(() => {
        setCharacterName(battleResults.characterName);
        setMonsterName(battleResults.monsterName);
        setBattleWinner(battleResults.battleWinner);
        setBattleRecap(battleResults.battleRecap);
    }, [battleResults]);

    const handleShowNext = () => {
        setVisibleRows(prev => Math.min(battleRecap.length, prev + 1));
    };

    const displayedRounds = () => {
        const visibleRounds = battleRecap.slice(0, visibleRows);
        return [...visibleRounds].reverse();
    };

    const allRoundsShown = visibleRows >= battleRecap.length;
    const displayHideStyle = {display: "none"};

    return (
        <div className="battle-container">
            <div className="battle-header">
            <div className="cascade-table-container show">
                <table className="leaderboard-table centered-table cascade-table">
                    <thead>
                        <th>BATTLE RESULTS</th>
                    </thead>
                    <tbody>
                        {displayedRounds().map((round, index) => (
                            <tr className="fade-in-row" key={index}>
                                <td>{round}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                <div className="battle-cards">
                    <CharacterIDCard characterId={battleResults.characterBeforeBattle.characterId} characterDTOData={battleResults.characterBeforeBattle} />
                    {/* Wrap the button with a container to stack vertically */}
                    <div className="go-button-container">
                        <button
                            id="toggle-btn"
                            onClick={handleShowNext}
                            className={`battle-toggle-btn ${allRoundsShown ? 'winner' : ''}`}
                            disabled={allRoundsShown}
                            >
                            {allRoundsShown ? `${battleWinner} wins!` : 'BATTLE'}
                        </button>
                        <button
                            id="toggle-btn"
                            onClick={()=>{window.location.reload()}}
                            className={`battle-toggle-btn again`}
                            disabled={!allRoundsShown}
                            style={allRoundsShown ? {} : displayHideStyle}
                        >
                            Battle Again
                        </button>
                    </div>
                    <MonsterIDCard monsterId={battleResults.monsterID} />
                </div>
            </div>
        </div>
    );
}
