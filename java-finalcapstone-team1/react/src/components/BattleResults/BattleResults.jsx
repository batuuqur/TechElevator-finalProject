import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BattleResults/BattleResults.css';

export default function BattleResults({ battleResults }) {
    const [visibleRows, setVisibleRows] = useState(0);
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const [characterName, setCharacterName] = useState("");
    const [monsterName, setMonsterName] = useState("");
    const [battleWinner, setBattleWinner] = useState("");
    const [battleRecap, setBattleRecap] = useState([]);

    useEffect(() => {
        setCharacterName(battleResults.characterName);
        setMonsterName(battleResults.monsterName);
        setBattleWinner(battleResults.battleWinner);
        setBattleRecap(battleResults.battleRecap);
        console.log("battle Recap Data: " + battleResults.battleRecap);
    }, [battleResults]);

    const handleShowNext = () => {
        setVisibleRows((prev) => Math.min(prev + 1, battleRecap.length));
    };

    const allRoundsShown = visibleRows >= battleRecap.length;

    return (
        <>
            <div className='leaderboard-title'>
                <table className='centered-table'>
                    <thead>
                        <tr>
                            <th className='leaderboard-title'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='battle-participants'>
                                <span>
                                    {characterName}
                                    <span className='vs-text'> VS </span>
                                    {monsterName}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="cascade-table-container show">
                <table className='leaderboard-table centered-table cascade-table'>
                    <thead>
                        <tr>
                            <th className='leaderboard-title'>
                                
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {battleRecap.slice(0, visibleRows).map((round, index) => (
                            <tr className='fade-in-row' key={index}>
                                <td>{round}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="battle-toggle-button-container">
                <button className="battle-toggle-btn" onClick={handleGoHome}>
                    Home
                </button>
            </div>
        </>
    );
}
