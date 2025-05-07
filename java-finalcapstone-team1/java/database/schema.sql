BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS weapons;
DROP TABLE IF EXISTS armors;
DROP TABLE IF EXISTS monsters;
DROP TABLE IF EXISTS battles;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS shops;

CREATE TABLE users (

	user_id SERIAL,
	username varchar(100) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	role varchar(100) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)

);

CREATE TABLE weapons(

    weapon_id SERIAL PRIMARY KEY,
    level_requirement INT,
    class_requirement varchar(100),
    weapon_tier INT,
    price INT,
    weapon_name varchar(100) NOT NULL,
    weapon_description varchar(500) NOT NULL,
    weapon_damage_integer INT

);

CREATE TABLE armors(
    
    armor_id SERIAL PRIMARY KEY,
    level_requirement INT,
    class_requirement varchar(100),
    armor_tier INT,
    price INT,
    armor_name varchar(100) NOT NULL,
    armor_description varchar(500) NOT NULL,
    armor_class_integer INT

);

CREATE TABLE monsters(

    monster_id SERIAL PRIMARY KEY,
    monster_name varchar(100) NOT NULL,
    monster_description varchar(500) NOT NULL,
    monster_tier INT,
    monster_level INT,

    strength_integer INT,
    dexterity_integer INT,
    constitution_integer INT,
    wisdom_integer INT,
    intelligence_integer INT,
    charisma_integer INT,

    max_health INT,
    armor_type varchar(100),
    armor_class_integer INT,
    weapon_type varchar(100),
    monster_damage_integer INT,

    active BOOLEAN

);


CREATE TABLE characters (
	
	character_id SERIAL PRIMARY KEY,
	
	FOREIGN KEY (user_id) REFERENCES users(user_id),
    user_id INT,
	
    character_name VARCHAR(100),
    character_class VARCHAR(100),

    character_level INT,

    strength_integer INT,
    dexterity_integer INT,
    constitution_integer INT,
    wisdom_integer INT,
    intelligence_integer INT,
    charisma_integer INT,

    max_health INT,

    gold int,

    FOREIGN KEY(weapon_id) REFERENCES weapons(weapon_id),
    weapon_id INT,

    FOREIGN KEY(armor_id) REFERENCES armors(armor_id),
    armor_id INT,
    number_of_battles INT,
    monster_killed_by varchar(100) not null,
    isAlive BOOLEAN DEFAULT TRUE
   
);

CREATE TABLE battles(

    battle_id SERIAL PRIMARY KEY,
    character_id INT,
    monster_id INT,
    battle_completed BOOLEAN,

    FOREIGN KEY (character_id) REFERENCES characters(character_id),
    FOREIGN KEY (monster_id) REFERENCES monsters(monster_id)
);

CREATE TABLE shops (

    shop_id SERIAL,
    shop_title varchar,
    internal_shop_title varchar,

    tier_1_weapon_slot_1 int,
    tier_1_weapon_slot_2 int,
    tier_1_weapon_slot_3 int,

    tier_1_armor_slot_1 int,
    tier_1_armor_slot_2 int,
    tier_1_armor_slot_3 int,

    tier_2_weapon_slot_1 int,
    tier_2_weapon_slot_2 int,
    tier_2_weapon_slot_3 int,

    tier_2_armor_slot_1 int,
    tier_2_armor_slot_2 int,
    tier_2_armor_slot_3 int,

    tier_3_weapon_slot_1 int,
    tier_3_weapon_slot_2 int,
    tier_3_weapon_slot_3 int,

    tier_3_armor_slot_1 int,
    tier_3_armor_slot_2 int,
    tier_3_armor_slot_3 int,

    tier_4_weapon_slot_1 int,
    tier_4_weapon_slot_2 int,
    tier_4_weapon_slot_3 int,

    tier_4_armor_slot_1 int,
    tier_4_armor_slot_2 int,
    tier_4_armor_slot_3 int
);


COMMIT TRANSACTION;
