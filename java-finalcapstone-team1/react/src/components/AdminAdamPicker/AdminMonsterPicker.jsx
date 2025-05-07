import AdminMonsterService from "../../services/AdminMonsterService.js";
import MonsterService from "../../services/MonsterService.js";
import { useState, useEffect } from "react";
import '../AdminAdamPicker/AdminMonsterPicker.css';

export default function AdminMonsterPicker() {
    const [monsters, setMonsters] = useState([]);
    const [selectedMonsters, setSelectedMonsters] = useState({
        tier1: ["", "", ""],
        tier2: ["", "", ""],
        tier3: ["", "", ""],
        tier4: ["", "", ""],
    });

    useEffect(() => {
        MonsterService.getAllMonsters()
            .then((res) => {
                console.log("Incoming list:", JSON.stringify(res.data, null, 10));
                setMonsters(res.data);
            })
            .catch((err) => {
                console.error("Error fetching monsters:", err);
            });
    }, []);

    const handleSelectChange = (tier, index, value) => {
        // Turn value to integer?
        const intValue = parseInt(value, 10);
        setSelectedMonsters((prev) => ({
            ...prev,
            [tier]: prev[tier].map((monster, i) => (i === index ? intValue : monster)),
        }));
    };

    function handleSubmit() {
        const adminMonsterPicksDTO = {
        t1PickSlot1: selectedMonsters.tier1[0],
        t1PickSlot2: selectedMonsters.tier1[1],
        t1PickSlot3: selectedMonsters.tier1[2],
        t2PickSlot1: selectedMonsters.tier2[0],
        t2PickSlot2: selectedMonsters.tier2[1],
        t2PickSlot3: selectedMonsters.tier2[2],
        t3PickSlot1: selectedMonsters.tier3[0],
        t3PickSlot2: selectedMonsters.tier3[1],
        t3PickSlot3: selectedMonsters.tier3[2],
        t4PickSlot1: selectedMonsters.tier4[0],
        t4PickSlot2: selectedMonsters.tier4[1],
        t4PickSlot3: selectedMonsters.tier4[2],};

        console.log("Getting list of AdminMonsterPicksDTO:", adminMonsterPicksDTO)

        AdminMonsterService.submitAdminPicks(adminMonsterPicksDTO)
        .then((res) => {

            window.location.reload(); // refresh the page
            console.log("Submitted successfully?", res.data)
            console.log("")
        })
        .catch((err) => {
            console.log("There is a problem with submit", err)
        });
        
    }

    function printData() {
        console.log("Selected Monsters Data:", selectedMonsters);
    }

    function allMonstersSelected() {
      return (
          selectedMonsters.tier1.every(id => id) &&
          selectedMonsters.tier2.every(id => id) &&
          selectedMonsters.tier3.every(id => id) &&
          selectedMonsters.tier4.every(id => id)
      );
  }

    return (
        <div className="admin-monster-picker">
          <h2>Admin Monster Picker</h2>
      
          <table>
            <thead>
              <tr>
                <th>Tier 1</th>
                <th>Tier 2</th>
                <th>Tier 3</th>
                <th>Tier 4</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2].map((slot) => (
                <tr key={slot}>
                  {[0, 1, 2, 3].map((tierIndex) => {
                    const tier = `tier${tierIndex + 1}`;
                    const alreadySelectedIds = selectedMonsters[tier].filter((id, i) => i !== slot);
                    return (
                      <td key={tier}>
                        <select
                          value={selectedMonsters[tier][slot]}
                          onChange={(e) => handleSelectChange(tier, slot, e.target.value)}
                          required
                        >
                          <option value="">monster</option>
                          {monsters
                            .filter((monster) => monster.monsterTier === tierIndex + 1)
                            .filter((monster) => !alreadySelectedIds.includes(monster.monsterId))
                            .map((monster) => (
                              <option key={monster.monsterId} value={monster.monsterId}>
                                {monster.monsterName}
                              </option>
                            ))}
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSubmit} disabled={!allMonstersSelected()} className='submit-button'>Submit</button>
        </div>
      );
}


