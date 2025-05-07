package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Character;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcCharacterDao implements CharacterDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcCharacterDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Character getCharacterByCharacterId(int characterId) {
        Character character = null;
        String sql = "SELECT * FROM characters WHERE character_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, characterId);
            if (results.next()) {
                character = mapRowToCharacter(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return character;
    }

    @Override
    public List<Character> getCharactersByUsername(String username) {
        List<Character> characters = new ArrayList<>();
        String sql = "SELECT *\n" +
                "FROM characters c\n" +
                "JOIN users u\n" +
                "ON c.user_id = u.user_id\n" +
                "WHERE u.username = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                characters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return characters;
    }
    @Override
    public List<Character> getAliveCharactersByUsername(String username) {
        List<Character> aliveCharacters = new ArrayList<>();
        String sql = "SELECT * FROM characters c " +
                "JOIN users u ON c.user_id = u.user_id " +
                "WHERE u.username = ? AND isalive = true;\n";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                aliveCharacters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return aliveCharacters;
    }

    @Override
    public List<Character> getDeadCharactersByUsername(String username) {
        List<Character> deadCharacters = new ArrayList<>();
        String sql = "SELECT * FROM characters c " +
                "JOIN users u ON c.user_id = u.user_id " +
                "WHERE u.username = ? AND isalive = false;\n";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                deadCharacters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return deadCharacters;
    }

    @Override
    public List<Character> getAllAliveCharacters() {
        List<Character> allAliveCharacters = new ArrayList<>();
        String sql = "SELECT * \n" +
                "FROM characters \n" +
                "WHERE isalive = true;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                allAliveCharacters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return allAliveCharacters;
    }

    @Override
    public List<Character> getTopAliveCharacters() {
        List<Character> topAliveCharacters = new ArrayList<>();
        String sql = "SELECT * \n" +
                "FROM characters \n" +
                "WHERE isalive = true \n" +
                "ORDER BY number_of_battles DESC, character_name DESC \n" +
                "LIMIT 10;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                topAliveCharacters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return topAliveCharacters;
    }

    @Override
    public List<Character> getAllDeadCharacters() {
        List<Character> allDeadCharacters = new ArrayList<>();
        String sql = "SELECT *\n" +
                "FROM characters\n" +
                "WHERE isalive = false;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                allDeadCharacters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return allDeadCharacters;
    }

    @Override
    public List<Character> getTopDeadCharacters() {
        List<Character> topDeadCharacters = new ArrayList<>();
        String sql = "SELECT * \n" +
                "FROM characters \n" +
                "WHERE isalive = false \n" +
                "ORDER BY number_of_battles DESC, character_name DESC \n" +
                "LIMIT 10;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Character character = mapRowToCharacter(results);
                topDeadCharacters.add(character);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return topDeadCharacters;
    }


    @Override
    public int deleteCharacterByCharacterId(int characterId) {
        int rowsAffected = 0;
        String sql = "DELETE FROM characters WHERE character_id = ?";

        try {
            rowsAffected = jdbcTemplate.update(sql, characterId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }

        return rowsAffected;
    }

    @Override
    public Character createCharacter(Character character) {

        Character newCharacter = null;
        String sql = "INSERT INTO characters("+
                                "user_id,"+
                                "character_name,"+
                                "character_class,"+
                                "character_level,"+
                                "strength_integer,"+
                                "dexterity_integer,"+
                                "constitution_integer,"+
                                "wisdom_integer,"+
                                "intelligence_integer,"+
                                "charisma_integer,"+
                                "max_health,"+
                                "gold,"+
                                "weapon_id,"+
                                "armor_id,"+
                                "number_of_battles,"+
                                "monster_killed_by,"+
                                "isAlive) \n"+
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?) \n" +
                "RETURNING character_id;";

        try{
            int newCharacterId = jdbcTemplate.queryForObject(sql,
                    int.class,
                    character.getUserId(),
                    character.getCharacterName(),
                    character.getCharacterClass(),
                    character.getCharacterLevel(),
                    character.getStrength_integer(),
                    character.getDexterity_integer(),
                    character.getConstitution_integer(),
                    character.getWisdom_integer(),
                    character.getIntelligence_integer(),
                    character.getCharisma_integer(),
                    character.getMax_health(),
                    character.getGold(),
                    character.getWeapon_id(),
                    character.getArmor_id(),
                    character.getNumber_of_battles(),
                    character.getMonsterKilledBy(),
                    character.isAlive());

            newCharacter = getCharacterByCharacterId(newCharacterId);
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return newCharacter;
    }

    @Override
    public Character updateCharacter(Character character) {

        Character updatedCharacter = null;
        String sql =
                "UPDATE characters SET "+
                        "character_name = ?,"+
                        "character_class = ?,"+
                        "character_level = ?,"+
                        "strength_integer = ?,"+
                        "dexterity_integer = ?,"+
                        "constitution_integer = ?,"+
                        "wisdom_integer = ?,"+
                        "intelligence_integer = ?,"+
                        "charisma_integer = ?,"+
                        "max_health = ?,"+
                        "gold = ?,"+
                        "weapon_id = ?,"+
                        "armor_id = ?,"+
                        "number_of_battles = ?,"+
                        "monster_killed_by = ?,"+
                        "isAlive = ? \n"+
                        "WHERE character_id = ?;";

        try{

            int numberOfRowsUpdated = jdbcTemplate.update(sql,

                    character.getCharacterName(),
                    character.getCharacterClass(),
                    character.getCharacterLevel(),

                    character.getStrength_integer(),
                    character.getDexterity_integer(),
                    character.getConstitution_integer(),
                    character.getWisdom_integer(),
                    character.getIntelligence_integer(),
                    character.getCharisma_integer(),

                    character.getMax_health(),
                    character.getGold(),

                    character.getWeapon_id(),
                    character.getArmor_id(),

                    character.getNumber_of_battles(),
                    character.getMonsterKilledBy(),

                    character.isAlive(),
                    character.getCharacterId());

            if(numberOfRowsUpdated == 0){
                throw new DaoException("Zero rows affected. expected at least one");
            }
            else{
                updatedCharacter = getCharacterByCharacterId(character.getCharacterId());
            }
        }

        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return updatedCharacter;
    }

    private Character mapRowToCharacter(SqlRowSet rowSet) {
        Character character = new Character();

        character.setCharacterId(rowSet.getInt("character_id"));
        character.setUserId(rowSet.getInt("user_id"));

        character.setCharacterName(rowSet.getString("character_name"));
        character.setCharacterClass(rowSet.getString("character_class"));
        character.setCharacterLevel(rowSet.getInt("character_level"));

        character.setStrength_integer(rowSet.getInt("strength_integer"));
        character.setDexterity_integer(rowSet.getInt("dexterity_integer"));
        character.setConstitution_integer(rowSet.getInt("constitution_integer"));
        character.setWisdom_integer(rowSet.getInt("wisdom_integer"));
        character.setIntelligence_integer(rowSet.getInt("intelligence_integer"));
        character.setCharisma_integer(rowSet.getInt("charisma_integer"));

        character.setMax_health(rowSet.getInt("max_health"));
        character.setGold(rowSet.getInt("gold"));

        character.setWeapon_id(rowSet.getInt("weapon_id"));
        character.setArmor_id(rowSet.getInt("armor_id"));

        character.setNumber_of_battles(rowSet.getInt("number_of_battles"));
        character.setMonsterKilledBy(rowSet.getString("monster_killed_by"));

        character.setAlive(rowSet.getBoolean("isalive"));
        return character;
    }
}
