package com.techelevator.model;

public class Weapon {
    private int id;
    private String name;
    private int damage;
    private int levelRequirement;
    private String classRequirement;
    private int weaponTier;
    private int price;
    private String weaponDescription;

    public Weapon() {}

    public Weapon(int id, String name, int damage) {
        this.id = id;
        this.name = name;
        this.damage = damage;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }

    public int getLevelRequirement() {
        return levelRequirement;
    }

    public void setLevelRequirement(int levelRequirement) {
        this.levelRequirement = levelRequirement;
    }

    public String getClassRequirement() {
        return classRequirement;
    }

    public void setClassRequirement(String classRequirement) {
        this.classRequirement = classRequirement;
    }

    public int getWeaponTier() {
        return weaponTier;
    }

    public void setWeaponTier(int weaponTier) {
        this.weaponTier = weaponTier;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getWeaponDescription() {
        return weaponDescription;
    }

    public void setWeaponDescription(String weaponDescription) {
        this.weaponDescription = weaponDescription;
    }
}
