
import React from "react";

export default function Leaderboard() {
  return (
    <div>
      <p>Leaderboard component is being updated. Please check back later.</p>
    </div>
  );
}
// import React, { useState } from "react";
// import "./Leaderboard.css";


  

// export default function Leaderboard() {
//   const [sortOption, setSortOption] = useState("level");
//   const [sortDirection, setSortDirection] = useState("desc");

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   const handleDirectionChange = (e) => {
//     setSortDirection(e.target.value);
//   };

//   const sortedData = [...sampleData].sort((a, b) => {
//     const isAscending = sortDirection === "asc";
//     if (sortOption === "name") {
//       return isAscending
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name);
//     } else if (sortOption === "class") {
//       return isAscending
//         ? a.class.localeCompare(b.class)
//         : b.class.localeCompare(a.class);
//     } else if (sortOption === "level") {
//       return isAscending ? a.level - b.level : b.level - a.level;
//     } else if (sortOption === "monsters") {
//       return isAscending
//         ? a.monstersBeaten - b.monstersBeaten
//         : b.monstersBeaten - a.monstersBeaten;
//     }
//     return 0;
//   });

//   return (
//     <div className="leaderboard-card">
//       <h2 className="leaderboard-title">Leaderboard</h2>
//       <div className="leaderboard-controls">
//         <div>
//           <label htmlFor="sort">Sort By:</label>
//           <select
//             id="sort"
//             className="dropdown"
//             onChange={handleSortChange}
//             value={sortOption}
//           >
//             <option value="level">Level (High to Low)</option>
//             <option value="name">Name (A–Z)</option>
//             <option value="class">Class (A–Z)</option>
//             <option value="monsters">Monsters Beaten (High to Low)</option>
//           </select>

//           <label htmlFor="direction">Sort Direction:</label>
//           <select
//             id="direction"
//             className="dropdown"
//             onChange={handleDirectionChange}
//             value={sortDirection}
//           >
//             <option value="desc">Descending</option>
//             <option value="asc">Ascending</option>
//           </select>
//         </div>
//       </div>

//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Level</th>
//             <th>Monsters Beaten</th>
//             <th>Strength</th>
//             <th>Dexterity</th>
//             <th>Constitution</th>
//             <th>Wisdom</th>
//             <th>Intelligence</th>
//             <th>Charisma</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((player, idx) => (
//             <tr key={idx}>
//               <td>{player.name}</td>
//               <td>{player.class}</td>
//               <td>{player.level}</td>
//               <td>{player.monstersBeaten}</td>
//               <td>{player.strength}</td>
//               <td>{player.dexterity}</td>
//               <td>{player.constitution}</td>
//               <td>{player.wisdom}</td>
//               <td>{player.intelligence}</td>
//               <td>{player.charisma}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
