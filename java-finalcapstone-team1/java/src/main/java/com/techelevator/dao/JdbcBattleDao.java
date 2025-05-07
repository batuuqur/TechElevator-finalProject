package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Battle;
import com.techelevator.model.Character;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcBattleDao implements BattleDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcBattleDao(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Battle> getAllBattles(){
        List<Battle> battleList = new ArrayList<>();
        String sql = "SELECT * FROM Battles";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while(results.next()) {
               Battle battle = mapRowToBattle(results);
               battleList.add(battle);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return battleList;
    }

    @Override
    public Battle getBattleByIds(int characterId, int monsterId) {
        Battle battle = null;
        String sql = "SELECT * FROM Battles WHERE character_id = ? and monster_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, characterId, monsterId);
            if (results.next()) {
                battle = mapRowToBattle(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return battle;
    }

    @Override
    public List<Battle> getBattlesByCharacterId(int characterId) {
        List<Battle> battleList = new ArrayList<>();
        String sql = "SELECT * FROM Battles WHERE character_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, characterId);
            while(results.next()) {
                Battle battle = mapRowToBattle(results);
                battleList.add(battle);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return battleList;
    }

    @Override
    public Battle getBattleByBattleId(int battleId) {
        Battle battle = null;
        String sql = "SELECT * FROM Battles WHERE battle_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, battleId);
            if (results.next()) {
                battle = mapRowToBattle(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return battle;
    }

    @Override
    public Battle createBattle(Battle battle) {
        Battle newBattle = null;
        String sql = "INSERT INTO battles(" +
                "character_id, monster_id, battle_completed) \n" +
                "VALUES(?, ?, ?) \n" +
                "RETURNING battle_id;";

        try{
            int newBattleId = jdbcTemplate.queryForObject(sql,
                    int.class,
                    battle.getCharacterId(),
                    battle.getMonsterId(),
                    battle.isBattleCompleted());

            newBattle = getBattleByBattleId(newBattleId);
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return newBattle;
    }

    @Override
    public Battle updateBattle(Battle battle) {

        Battle updatedBattle = null;
        String sql =
                "UPDATE battles SET "+
                        "character_id = ?,"+
                        "monster_id = ?,"+
                        "battle_completed = ?,"+
                        "WHERE battle_id = ?;";

        try
        {
            int numberOfRowsUpdated = jdbcTemplate.update(
                    sql,
                    battle.getCharacterId(),
                    battle.getMonsterId(),
                    battle.isBattleCompleted(),
                    battle.getBattleId());

            if(numberOfRowsUpdated == 0){
                throw new DaoException("Zero rows affected. expected at least one");
            }
            else{
                updatedBattle = getBattleByIds(battle.getCharacterId(), battle.getMonsterId());
            }
        }

        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return updatedBattle;
    }

    @Override
    public int deleteAllBattles() {
        int rowsAffected = 0;
        String sql = "delete from battles";
        try {
            rowsAffected = jdbcTemplate.update(sql);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return rowsAffected;
    }

    private Battle mapRowToBattle(SqlRowSet rowSet){
        Battle battle = new Battle();
        battle.setBattleId(rowSet.getInt("battle_id"));
        battle.setCharacterId(rowSet.getInt("character_id"));
        battle.setMonsterId(rowSet.getInt("monster_id"));
        battle.setBattleCompleted(rowSet.getBoolean("battle_completed"));
        return battle;
    }
}
