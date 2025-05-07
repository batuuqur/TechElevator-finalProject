package com.techelevator.dao;

import com.techelevator.model.Shop;
import com.techelevator.model.Weapon;
import java.util.List;

public interface WeaponDao {
    List<Weapon> getAllWeapons();
//  List<Weapon> getWeaponsByCharacterId(int characterId);
    Weapon getWeaponById(int id);
    List<Weapon> getCrudeWeaponsByClass(String classString);
    List<Weapon> getWeaponsByShopList(Shop shop);
}


