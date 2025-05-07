package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Character;
import com.techelevator.model.Monster;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcMonsterDao implements MonsterDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcMonsterDao(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Monster> getAllMonsters() {
        List<Monster> allMonsters = new ArrayList<>();
        String sql = "SELECT * FROM monsters;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Monster monster = mapRowToMonster(results);
                allMonsters.add(monster);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return allMonsters;
    }

    @Override
    public Monster getMonsterById(int monsterId) {
        Monster monster = null;
        String sql = "SELECT * FROM monsters WHERE monster_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, monsterId);
            if (results.next()) {
                monster = mapRowToMonster(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return monster;
    }


    @Override
    public Monster updateMonster(Monster monster) {

        Monster updatedMonster = null;

        String sql =
                "UPDATE monsters SET " +
                        "monster_name = ?, " +
                        "monster_description = ?, " +
                        "monster_tier = ?, " +
                        "monster_level = ?, " +
                        "strength_integer = ?, " +
                        "dexterity_integer = ?, " +
                        "constitution_integer = ?, " +
                        "wisdom_integer = ?, " +
                        "intelligence_integer = ?, " +
                        "charisma_integer = ?, " +
                        "max_health = ?, " +
                        "armor_type = ?, " +
                        "armor_class_integer = ?, " +
                        "weapon_type = ?, " +
                        "monster_damage_integer = ?, " +
                        "active = ? " +
                        "WHERE monster_id = ?;";

        try {
            int numberOfRowsUpdated = jdbcTemplate.update(sql,
                    monster.getMonsterName(),
                    monster.getMonsterDescription(),
                    monster.getMonsterTier(),
                    monster.getMonsterLevel(),
                    monster.getStrengthInteger(),
                    monster.getDexterityInteger(),
                    monster.getConstitutionInteger(),
                    monster.getWisdomInteger(),
                    monster.getIntelligenceInteger(),
                    monster.getCharismaInteger(),
                    monster.getMaxHealth(),
                    monster.getArmorType(),
                    monster.getArmorClass(),
                    monster.getWeaponType(),
                    monster.getMonsterDamageValue(),
                    monster.isActive(),
                    monster.getMonsterId()
            );

            if (numberOfRowsUpdated == 0) {
                throw new DaoException("Zero rows affected. Expected at least one row to be updated.");
            } else {
                updatedMonster = getMonsterById(monster.getMonsterId());
            }

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }

        return updatedMonster;
    }



    public List<Monster> getAllActiveMonsters()
    {
        List<Monster> activeMonsters = new ArrayList<>();
        String sql = "SELECT * FROM monsters WHERE active = true";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while(results.next())
            {
                Monster monster = mapRowToMonster(results);
                activeMonsters.add(monster);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to get list of alive monsters", e);
        }

        return activeMonsters;
    }

    private Monster mapRowToMonster(SqlRowSet rowSet){
        Monster monster = new Monster();
        monster.setMonsterId(rowSet.getInt("monster_id"));
        monster.setMonsterName(rowSet.getString("monster_name"));
        monster.setMonsterDescription(rowSet.getString("monster_description"));
        monster.setMonsterTier(rowSet.getInt("monster_tier"));
        monster.setMonsterLevel(rowSet.getInt("monster_level"));
        monster.setStrengthInteger(rowSet.getInt("strength_integer"));
        monster.setDexterityInteger(rowSet.getInt("dexterity_integer"));
        monster.setConstitutionInteger(rowSet.getInt("constitution_integer"));
        monster.setWisdomInteger(rowSet.getInt("wisdom_integer"));
        monster.setIntelligenceInteger(rowSet.getInt("intelligence_integer"));
        monster.setCharismaInteger(rowSet.getInt("charisma_integer"));
        monster.setMaxHealth(rowSet.getInt("max_health"));
        monster.setArmorType(rowSet.getString("armor_type"));
        monster.setArmorClass(rowSet.getInt("armor_class_integer"));
        monster.setWeaponType(rowSet.getString("weapon_type"));
        monster.setMonsterDamageValue(rowSet.getInt("monster_damage_integer"));
        monster.setActive(rowSet.getBoolean("active"));
        return monster;
    }
}
