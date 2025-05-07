package com.techelevator.controller;

import com.techelevator.dao.*;
import com.techelevator.exception.DaoException;
import com.techelevator.model.*;
import com.techelevator.model.Character;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class BattleController {

    private BattleDao battleDao;
    private CharacterDao characterDao;
    private MonsterDao monsterDao;
    private WeaponDao weaponDao;
    private ArmorDao armorDao;

    public BattleController
            (
                    BattleDao battleDao,
                    CharacterDao characterDao,
                    MonsterDao monsterDao,
                    WeaponDao weaponDao,
                    ArmorDao armorDao
            )
    {
        this.battleDao = battleDao;
        this.characterDao = characterDao;
        this.monsterDao = monsterDao;
        this.weaponDao = weaponDao;
        this.armorDao = armorDao;
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @RequestMapping(path="/battles", method = RequestMethod.GET)
    public List<CharacterMonstersBattledDTO> getBattles(Principal principal)
    {
        List<CharacterMonstersBattledDTO> characterMonstersBattledDTOList = new ArrayList<>();
        try
        {
            List<Battle> battleList = new ArrayList<>();
            List<Character> characters = characterDao.getAliveCharactersByUsername(principal.getName());

            for(Character character : characters)
            {
                CharacterMonstersBattledDTO characterMonstersBattledDTO = new CharacterMonstersBattledDTO();
                characterMonstersBattledDTO.setCharacter(character);

                List<Monster> monstersBattled = new ArrayList<>();
                List<Battle> charactersBattles = battleDao.getBattlesByCharacterId(character.getCharacterId());
                for( Battle battle : charactersBattles)
                {
                    monstersBattled.add(monsterDao.getMonsterById(battle.getMonsterId()));
                }
                characterMonstersBattledDTO.setMonstersBattled(monstersBattled);
                characterMonstersBattledDTOList.add(characterMonstersBattledDTO);
            }
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }

        return characterMonstersBattledDTOList;
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @RequestMapping(path="/battle", method = RequestMethod.POST)
    public BattleRecapDTO startBattle(@RequestBody Battle battle)
    {
        Character characterInBattle = characterDao.getCharacterByCharacterId(battle.getCharacterId());

        if(!characterInBattle.isAlive())
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "That guy is dead man. He can't fight nobody");
        }

        Monster monsterInBattle = monsterDao.getMonsterById(battle.getMonsterId());

        BattleRecapDTO battleRecapDTO = simulateBattle(characterInBattle, monsterInBattle);

        return battleRecapDTO;
    }

    public BattleRecapDTO simulateBattle(Character character, Monster monster)
    {
        BattleRecapDTO battleRecapDTO = new BattleRecapDTO();
        boolean isCharactersTurn = false;
        List<String> recap = new ArrayList<>();

        battleRecapDTO.setCharacterBeforeBattle(characterDao.getCharacterByCharacterId(character.getCharacterId()));

        character.setNumber_of_battles(character.getNumber_of_battles() + 1);
        character.setMonsterKilledBy("");

        //Create Local Variables for Character
        String characterName = character.getCharacterName();
        int characterHealth = character.getMax_health();
        Armor characterArmor = armorDao.getArmorById(character.getArmor_id());
        String characterArmorName = characterArmor.getArmor_name();
        int characterArmorClass = characterArmor.getArmor_class_integer();
        Weapon characterWeapon = weaponDao.getWeaponById(character.getWeapon_id());
        String characterWeaponName = characterWeapon.getName();
        int characterWeaponDamage = characterWeapon.getDamage();
        int characterStatBonus = handleCharacterStatBonus(character);
        String characterStatBonusString = handleCharacterStatBonusString(character);

        battleRecapDTO.setCharacterName(characterName);
        battleRecapDTO.setCharacterID(character.getCharacterId());

        //Create Local Variables for Monster
        String monsterName = monster.getMonsterName();
        int monsterHealth = monster.getMaxHealth();
        String monsterArmorType = monster.getArmorType();
        int monsterArmorClass = monster.getArmorClass();
        String monsterWeaponType = monster.getWeaponType();
        int monsterDamage = monster.getMonsterDamageValue();

        battleRecapDTO.setMonsterName(monsterName);
        battleRecapDTO.setMonsterID(monster.getMonsterId());

        //Roll for initiative
        int characterInitiative = rollD20();
        recap.add(characterName+" rolls for initiative: "+characterInitiative);
        int monsterInitiative = rollD20();
        recap.add(monsterName+" rolls for initiative: "+monsterInitiative);

        while(characterInitiative == monsterInitiative)
        {
            recap.add("Re-Rolling");
            characterInitiative = rollD20();
            recap.add(characterName+" rolls for initiative: "+characterInitiative);
            monsterInitiative = rollD20();
            recap.add(monsterName+" rolls for initiative: "+monsterInitiative);
        }

        //Compare values and change the 'isCharacterTurn' accordingly
        if(characterInitiative>monsterInitiative)
        {
            recap.add(characterName+" wins the roll and will attack first.");
            isCharactersTurn = true;
        }
        else
        {
            recap.add(monsterName+" wins the roll and wil attack first");
        }

        //main game loop
        while(characterHealth > 0 && monsterHealth > 0)
        {
            if(isCharactersTurn)
            {
                int characterChanceHit = rollD20();
                if(characterChanceHit > monsterArmorClass)
                {
                    recap.add(characterName+" rolls ["+characterChanceHit+"] for chance to hit "+monsterName+" and SUCCEEDS!");
                    recap.add(characterName+" uses their "+characterWeaponName+" to attack. It does ["+characterWeaponDamage+" Damage | +"+characterStatBonus+characterStatBonusString+"] to "+monsterName);
                    monsterHealth -= characterWeaponDamage + characterStatBonus;
                    if(monsterHealth > 0)
                    {
                        recap.add(monsterName+" has "+monsterHealth+" health remaining");
                    }
                    else
                    {
                        recap.add(monsterName+" has been Felled...");
                        handleGold(character, recap);
                        handleLevelUp(character, recap);
                        battleRecapDTO.setBattleWinner(characterName);
                    }
                    isCharactersTurn = false;
                }
                else
                {
                    recap.add(characterName+" rolls ["+characterChanceHit+"] for chance to hit "+monsterName+" and FAILS!");
                    recap.add(characterName+" uses their "+characterWeaponName+" to attack. It bounces off it's "+monsterArmorType+" ["+monsterArmorClass+" AC]");
                    isCharactersTurn = false;
                }
            }
            else
            {
                int monsterChanceHit = rollD20();
                if(monsterChanceHit > characterArmorClass)
                {
                    recap.add(monsterName+" rolls ["+monsterChanceHit+"] for chance to hit "+characterName+" and SUCCEEDS!");
                    recap.add(monsterName+" uses their "+monsterWeaponType+" to attack. It does ["+monsterDamage+" Damage] to "+characterName);
                    characterHealth -= monsterDamage;
                    if(characterHealth > 0)
                    {
                        recap.add(characterName+" has "+characterHealth+" health remaining");
                    }
                    else
                    {
                        recap.add(characterName+" has been Felled...");
                        character.setMonsterKilledBy(monsterName);
                        character.setAlive(false);
                        battleRecapDTO.setBattleWinner(monsterName);
                    }

                    isCharactersTurn = true;
                }
                else
                {
                    recap.add(monsterName+" rolls ["+monsterChanceHit+"] for chance to hit "+characterName+" and FAILS!");
                    recap.add(monsterName+" uses their "+monsterWeaponType+" to attack. It bounces off their "+characterArmorName+" ["+characterArmorClass+" AC]");
                    isCharactersTurn = true;
                }
            }
        }

        characterDao.updateCharacter(character);

        //Log the Battle in the DB
        Battle battleData = new Battle();
        battleData.setCharacterId(character.getCharacterId());
        battleData.setMonsterId(monster.getMonsterId());
        battleData.setBattleCompleted(true);
        battleDao.createBattle(battleData);

        //Package Data before send to client
        battleRecapDTO.setBattleRecap(recap);
        return battleRecapDTO;
    }

    private int rollD20()
    {
        int max = 20;
        int min = 1;
        int randomNum = min + (int)(Math.random() * ((max - min) + 1));
        return randomNum;
    }

    private void handleLevelUp(Character character, List<String> recap)
    {
        if(character.getCharacterLevel() != 12)
        {
            recap.add(character.getCharacterName()+" has leveled up from "+character.getCharacterLevel()+" to "+(character.getCharacterLevel() + 1)+"!");
            character.setCharacterLevel(character.getCharacterLevel() + 1);
            character.setConstitution_integer(character.getConstitution_integer() + 1);
            recap.add(character.getCharacterName()+" has gained +1 Constitution");

            if(character.getCharacterClass().equals("Barbarian"))
            {
                character.setStrength_integer(character.getStrength_integer() + 1);
                recap.add(character.getCharacterName()+" has gained +1 Strength");
            }
            if(character.getCharacterClass().equals("Archer"))
            {
                character.setDexterity_integer(character.getDexterity_integer() + 1);
                recap.add(character.getCharacterName()+" has gained +1 Dexterity");
            }
            if(character.getCharacterClass().equals("Rogue"))
            {
                character.setDexterity_integer(character.getDexterity_integer() + 1);
                recap.add(character.getCharacterName()+" has gained +1 Dexterity");
            }
            characterDao.updateCharacter(character);
        }
    }

    private int goldAmountRandomizer(int min, int max)
    {
        int randomNum = min + (int)(Math.random() * ((max - min) + 1));
        return randomNum;
    }

    private void handleGold(Character character, List<String> recap)
    {
        int amountGained = 0;
        int rollChanceForGoldAmount = rollD20();
        recap.add(character.getCharacterName()+" rolls a "+rollChanceForGoldAmount+" for loot chance.");
        if(rollChanceForGoldAmount <= 5)
        {
            amountGained = goldAmountRandomizer(50,150);
            recap.add(character.getCharacterName()+" gains "+amountGained+" gold!");
            character.setGold(character.getGold() + amountGained);
        }
        else if(rollChanceForGoldAmount <= 10)
        {
            amountGained = goldAmountRandomizer(150,250);
            recap.add(character.getCharacterName()+" gains "+amountGained+" gold!");
            character.setGold(character.getGold() + amountGained);
        }
        else if(rollChanceForGoldAmount <= 15)
        {
            amountGained = goldAmountRandomizer(250,350);
            recap.add(character.getCharacterName()+" gains "+amountGained+" gold!");
            character.setGold(character.getGold() + amountGained);
        }
        else
        {
            amountGained = goldAmountRandomizer(350,500);
            recap.add(character.getCharacterName()+" gains "+amountGained+" gold!");
            character.setGold(character.getGold() + amountGained);
        }

    }

    private int handleCharacterStatBonus(Character character)
    {
        if(character.getCharacterClass().equals("Barbarian"))
        {
            return (character.getStrength_integer() - 10) / 2;
        }
        if(character.getCharacterClass().equals("Archer"))
        {
            return (character.getDexterity_integer() - 10) / 2;
        }
        if(character.getCharacterClass().equals("Rogue"))
        {
            return (character.getDexterity_integer() - 10) / 2;
        }
        return 0;
    }

    private String handleCharacterStatBonusString(Character character)
    {
        if(character.getCharacterClass().equals("Barbarian"))
        {
            return " from Str";
        }
        if(character.getCharacterClass().equals("Archer"))
        {
            return " from Dex";
        }
        if(character.getCharacterClass().equals("Rogue"))
        {
            return " from Dex";
        }
        return "";
    }


}
