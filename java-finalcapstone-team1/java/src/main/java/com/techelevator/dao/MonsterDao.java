package com.techelevator.dao;

import com.techelevator.model.Monster;

import java.util.List;

public interface MonsterDao {

    List<Monster> getAllMonsters();
    Monster getMonsterById(int monsterId);
    Monster updateMonster(Monster monster);
    List<Monster> getAllActiveMonsters();

}
