package com.techelevator.model;

public class Armor {
    private int armor_id;
    private String armor_name;
    private int armor_class_integer;
    private int levelRequirement;
    private String classRequirement;
    private int armorTier;
    private int price;
    private String armorDescription;

    public int getArmor_id() {
        return armor_id;
    }

    public void setArmor_id(int armor_id) {
        this.armor_id = armor_id;
    }

    public String getArmor_name() {
        return armor_name;
    }

    public void setArmor_name(String armor_name) {
        this.armor_name = armor_name;
    }

    public int getArmor_class_integer() {
        return armor_class_integer;
    }

    public void setArmor_class_integer(int armor_class_integer) {
        this.armor_class_integer = armor_class_integer;
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

    public int getArmorTier() {
        return armorTier;
    }

    public void setArmorTier(int armorTier) {
        this.armorTier = armorTier;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getArmorDescription() {
        return armorDescription;
    }

    public void setArmorDescription(String armorDescription) {
        this.armorDescription = armorDescription;
    }
}
