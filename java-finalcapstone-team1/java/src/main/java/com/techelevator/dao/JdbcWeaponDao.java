package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Shop;
import com.techelevator.model.Weapon;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcWeaponDao implements WeaponDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcWeaponDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Weapon> getAllWeapons() {
        List<Weapon> weapons = new ArrayList<>();
        String sql = "SELECT * FROM weapons";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                weapons.add(mapRowToWeapon(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);
        }

        return weapons;
    }

    @Override
    public Weapon getWeaponById(int id) {
        String sql = "SELECT * FROM weapons WHERE weapon_id = ?";
        Weapon weapon = null;

        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql, id);
            if (result.next()) {
                weapon = mapRowToWeapon(result);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);
        }

        return weapon;
    }

    @Override
    public List<Weapon> getCrudeWeaponsByClass(String classString) {
        List<Weapon> weapons = new ArrayList<>();
        String sql = "SELECT * FROM weapons where weapon_tier = 0 and class_requirement = ?";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, classString);
            while (results.next()) {
                weapons.add(mapRowToWeapon(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);
        }
        return weapons;
    }

    @Override
    public List<Weapon> getWeaponsByShopList(Shop shop)
    {
        List<Weapon> weapons = new ArrayList<>();
        weapons.add(getWeaponById(shop.getTier1WeaponSlot1()));
        weapons.add(getWeaponById(shop.getTier1WeaponSlot2()));
        weapons.add(getWeaponById(shop.getTier1WeaponSlot3()));
        weapons.add(getWeaponById(shop.getTier2WeaponSlot1()));
        weapons.add(getWeaponById(shop.getTier2WeaponSlot2()));
        weapons.add(getWeaponById(shop.getTier2WeaponSlot3()));
        weapons.add(getWeaponById(shop.getTier3WeaponSlot1()));
        weapons.add(getWeaponById(shop.getTier3WeaponSlot2()));
        weapons.add(getWeaponById(shop.getTier3WeaponSlot3()));
        weapons.add(getWeaponById(shop.getTier4WeaponSlot1()));
        weapons.add(getWeaponById(shop.getTier4WeaponSlot2()));
        weapons.add(getWeaponById(shop.getTier4WeaponSlot3()));
        return weapons;
    }


    private Weapon mapRowToWeapon(SqlRowSet rowSet) {
        Weapon weapon = new Weapon();
        weapon.setId(rowSet.getInt("weapon_id"));
        weapon.setLevelRequirement(rowSet.getInt("level_requirement"));
        weapon.setClassRequirement(rowSet.getString("class_requirement"));
        weapon.setWeaponTier(rowSet.getInt("weapon_tier"));
        weapon.setPrice(rowSet.getInt("price"));
        weapon.setName(rowSet.getString("weapon_name"));
        weapon.setWeaponDescription(rowSet.getString("weapon_description"));
        weapon.setDamage(rowSet.getInt("weapon_damage_integer"));

        return weapon;
    }

}
