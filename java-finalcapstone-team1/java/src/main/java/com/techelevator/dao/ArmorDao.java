package com.techelevator.dao;

import com.techelevator.model.Armor;
import com.techelevator.model.Shop;

import java.util.List;

public interface ArmorDao {

    List<Armor> getAllArmors();
    Armor getArmorById(int armor_id);
    List<Armor> getCrudeArmorsByClass(String classString);
    List<Armor> getArmorByShopList(Shop shop);
}
