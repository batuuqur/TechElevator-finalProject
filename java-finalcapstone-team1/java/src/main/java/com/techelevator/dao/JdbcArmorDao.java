package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Armor;
import com.techelevator.model.Shop;
import com.techelevator.model.Weapon;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcArmorDao implements ArmorDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcArmorDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Armor> getAllArmors() {
        List<Armor> allArmorsList = new ArrayList<>();
        String sql = "SELECT * FROM armors;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Armor armor = mapRowToArmor(results);
                allArmorsList.add(armor);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return allArmorsList;
    }

    @Override
    public Armor getArmorById(int armor_id) {
        Armor armor = null;
        String sql = "SELECT *\n" +
                "FROM armors\n" +
                "WHERE armor_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, armor_id);
            if (results.next()) {
                armor = mapRowToArmor(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return armor;
    }

    @Override
    public List<Armor> getCrudeArmorsByClass(String classString) {
        List<Armor> armors = new ArrayList<>();
        String sql = "SELECT * FROM armors where armor_tier = 0 and class_requirement = ?";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, classString);
            while (results.next()) {
                armors.add(mapRowToArmor(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);
        }
        return armors;
    }

    @Override
    public List<Armor> getArmorByShopList(Shop shop)
    {
        List<Armor> armors = new ArrayList<>();
        armors.add(getArmorById(shop.getTier1ArmorSlot1()));
        armors.add(getArmorById(shop.getTier1ArmorSlot2()));
        armors.add(getArmorById(shop.getTier1ArmorSlot3()));
        armors.add(getArmorById(shop.getTier2ArmorSlot1()));
        armors.add(getArmorById(shop.getTier2ArmorSlot2()));
        armors.add(getArmorById(shop.getTier2ArmorSlot3()));
        armors.add(getArmorById(shop.getTier3ArmorSlot1()));
        armors.add(getArmorById(shop.getTier3ArmorSlot2()));
        armors.add(getArmorById(shop.getTier3ArmorSlot3()));
        armors.add(getArmorById(shop.getTier4ArmorSlot1()));
        armors.add(getArmorById(shop.getTier4ArmorSlot2()));
        armors.add(getArmorById(shop.getTier4ArmorSlot3()));
        return armors;
    }

    private Armor mapRowToArmor(SqlRowSet rowSet) {

        Armor armor = new Armor();

        armor.setArmor_id(rowSet.getInt("armor_id"));
        armor.setLevelRequirement(rowSet.getInt("level_requirement"));
        armor.setClassRequirement(rowSet.getString("class_requirement"));
        armor.setArmorTier(rowSet.getInt("armor_tier"));
        armor.setPrice(rowSet.getInt("price"));
        armor.setArmor_name(rowSet.getString("armor_name"));
        armor.setArmorDescription(rowSet.getString("armor_description"));
        armor.setArmor_class_integer(rowSet.getInt("armor_class_integer"));
        return armor;
    }
}
