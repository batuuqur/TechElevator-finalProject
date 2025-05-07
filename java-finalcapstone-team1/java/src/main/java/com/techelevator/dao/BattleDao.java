package com.techelevator.dao;

import com.techelevator.model.Battle;

import java.util.List;

public interface BattleDao {

    Battle getBattleByBattleId(int battleId);
    List<Battle> getBattlesByCharacterId(int characterId);
    Battle getBattleByIds(int characterId, int monsterId);
    List<Battle> getAllBattles();
    Battle createBattle(Battle battle);
    Battle updateBattle(Battle battle);
    int deleteAllBattles();
}
