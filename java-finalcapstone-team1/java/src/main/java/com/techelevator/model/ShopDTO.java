package com.techelevator.model;

import java.util.List;

public class ShopDTO {

    private Shop shop;

    private List<Weapon> weaponListData;

    private List<Armor> armorListData;

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public List<Weapon> getWeaponListData() {
        return weaponListData;
    }

    public void setWeaponListData(List<Weapon> weaponListData) {
        this.weaponListData = weaponListData;
    }

    public List<Armor> getArmorListData() {
        return armorListData;
    }

    public void setArmorListData(List<Armor> armorListData) {
        this.armorListData = armorListData;
    }
}
