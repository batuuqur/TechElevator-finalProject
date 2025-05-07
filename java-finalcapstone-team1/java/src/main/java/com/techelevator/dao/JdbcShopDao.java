package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Monster;
import com.techelevator.model.Shop;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcShopDao implements ShopDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcShopDao(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Shop> getAllShops() {
        List<Shop> allShops = new ArrayList<>();
        String sql = "SELECT * FROM shops";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Shop shop = mapRowToShop(results);
                allShops.add(shop);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return allShops;
    }

    @Override
    public Shop getShopById(int shopId) {
        Shop shop = null;
        String sql = "SELECT * FROM shops WHERE shop_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, shopId);
            if (results.next()) {
                shop = mapRowToShop(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return shop;
    }


    private Shop mapRowToShop(SqlRowSet rowSet)
    {
        Shop shop = new Shop();
        shop.setShopId(rowSet.getInt("shop_id"));
        shop.setShopTitle(rowSet.getString("shop_title"));
        shop.setInternalShopTitle(rowSet.getString("internal_shop_title"));
        shop.setTier1WeaponSlot1(rowSet.getInt("tier_1_weapon_slot_1"));
        shop.setTier1WeaponSlot2(rowSet.getInt("tier_1_weapon_slot_2"));
        shop.setTier1WeaponSlot3(rowSet.getInt("tier_1_weapon_slot_3"));
        shop.setTier2WeaponSlot1(rowSet.getInt("tier_2_weapon_slot_1"));
        shop.setTier2WeaponSlot2(rowSet.getInt("tier_2_weapon_slot_2"));
        shop.setTier2WeaponSlot3(rowSet.getInt("tier_2_weapon_slot_3"));
        shop.setTier3WeaponSlot1(rowSet.getInt("tier_3_weapon_slot_1"));
        shop.setTier3WeaponSlot2(rowSet.getInt("tier_3_weapon_slot_2"));
        shop.setTier3WeaponSlot3(rowSet.getInt("tier_3_weapon_slot_3"));
        shop.setTier4WeaponSlot1(rowSet.getInt("tier_4_weapon_slot_1"));
        shop.setTier4WeaponSlot2(rowSet.getInt("tier_4_weapon_slot_2"));
        shop.setTier4WeaponSlot3(rowSet.getInt("tier_4_weapon_slot_3"));
        shop.setTier1ArmorSlot1(rowSet.getInt("tier_1_armor_slot_1"));
        shop.setTier1ArmorSlot2(rowSet.getInt("tier_1_armor_slot_2"));
        shop.setTier1ArmorSlot3(rowSet.getInt("tier_1_armor_slot_3"));
        shop.setTier2ArmorSlot1(rowSet.getInt("tier_2_armor_slot_1"));
        shop.setTier2ArmorSlot2(rowSet.getInt("tier_2_armor_slot_2"));
        shop.setTier2ArmorSlot3(rowSet.getInt("tier_2_armor_slot_3"));
        shop.setTier3ArmorSlot1(rowSet.getInt("tier_3_armor_slot_1"));
        shop.setTier3ArmorSlot2(rowSet.getInt("tier_3_armor_slot_2"));
        shop.setTier3ArmorSlot3(rowSet.getInt("tier_3_armor_slot_3"));
        shop.setTier4ArmorSlot1(rowSet.getInt("tier_4_armor_slot_1"));
        shop.setTier4ArmorSlot2(rowSet.getInt("tier_4_armor_slot_2"));
        shop.setTier4ArmorSlot3(rowSet.getInt("tier_4_armor_slot_3"));
        return shop;
    }

}
