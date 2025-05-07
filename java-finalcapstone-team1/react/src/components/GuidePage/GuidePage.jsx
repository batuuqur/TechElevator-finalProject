import React from "react";
import { Link } from "react-router-dom";
import styles from './GuidePage.module.css';

export default function GuidePage() {
  return (
    <div className={styles.guideCard}>
      <h1 className={styles.leaderboardTitle}>Monsterama Guidebook</h1>

      <section className={styles.guideSection}>
        <h2>Getting Started</h2>
        <p>
          Welcome to Monster-Rama! This guide will walk you through character creation, gameplay mechanics, and how to dominate the leaderboards. 
          Whether you're a seasoned adventurer or brand new to monster slaying, everything you need is here.
        </p>
      </section>

      <section className={styles.guideSection}>
        <h2>Character Creation</h2>
        <p>
          Start by going to "characters". Here, you can create your character by creating a name, selecting a class, and rolling for your stats.
        </p>
        <ul>
          <li><strong>Knight</strong> – Well-rounded defender with strong Constitution</li>
          <li><strong>Archer</strong> – Fast and agile, excels in Dexterity and ranged combat</li>
          <li><strong>Barbarian</strong> – High Strength, perfect for overwhelming offense</li>
        </ul>
      </section>

      <section className={styles.guideSection}>
        <h2>Leveling up</h2>
        <ul>
          <li>You start at level 1, each time you win a battle, you level up one time</li>
          <li>Depending on your class, you will gain stats on each level up</li>
          <li>There are four tiers in Monster-Rama: TIER 1: levels 1-3, TIER 2: levels 4-6, TIER 3: levels 7-9, TIER 4: levels 10-12</li>
          <li>Each time you enter a new tier, you are able to battle new monsters</li>
        </ul>
      </section>

      <section className={styles.guideSection}>
        <h2>Core Stats Explained</h2>
        <p>Each stat has a specific effect on combat:</p>
        <ul>
          <li><strong>Strength</strong> – Affects melee damage and breaking armor.</li>
          <li><strong>Dexterity</strong> – Hit chance, dodge, and ranged attacks.</li>
          <li><strong>Constitution</strong> – Health and physical resistance.</li>
          <li><strong>Wisdom</strong> – Resistance to magical attacks.</li>
          <li><strong>Intelligence</strong> – Spell damage and learning (future).</li>
          <li><strong>Charisma</strong> – Flavor stat for future events.</li>
        </ul>
      </section>

      <section className={styles.guideSection}>
        <h2>Combat System</h2>
        <ul>
          <li>Roll for initiative – highest roll attacks first</li>
          <li>Roll vs enemy armor – beat it to land a hit</li>
          <li>Damage based on your weapon, monsters have base damage</li>
          <li>First to 0 HP loses</li>
        </ul>
      </section>

      <section className={styles.guideSection}>
        <h2>Progression & Leaderboard</h2>
        <p>Leaderboards are based on:</p>
        <ol>
          <li>Level</li>
          <li>Monsters Beaten</li>
          <li>Stat Totals</li>
        </ol>
      </section>

      <section className={styles.guideSection}>
        <h2>Tips for Success</h2>
        <ul>
          <li>Buy armor and weapons in the shop!</li>
          <li>Characters that die are immortalized in the Hall of Fallen Heroes</li>
          <li>Choose your monsters wisely</li>
          <li>Log in regularly to progress</li>
        </ul>
      </section>

      <div className={styles.guideFooter}>
        <p><em>More sections coming soon</em></p>
      </div>
    </div>
  );
}