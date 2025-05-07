package com.techelevator.controller;

import com.techelevator.dao.ArmorDao;
import com.techelevator.dao.CharacterDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.WeaponDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Character;
import com.techelevator.model.CharacterDTO;
import com.techelevator.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class CharacterController {

    private final WeaponDao weaponDao;
    private final ArmorDao armorDao;
    private CharacterDao characterDao;
    private final UserDao userDao;

    public CharacterController(CharacterDao characterDao, UserDao userDao, WeaponDao weaponDao, ArmorDao armorDao){
        this.characterDao = characterDao;
        this.userDao = userDao;
        this.weaponDao = weaponDao;
        this.armorDao = armorDao;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/characters/alive", method = RequestMethod.GET)
    public List<Character>characterList(Principal principal){

        // create list to hold characters
        List<Character> usersCharactersList = new ArrayList<>();

        // get username from principal
        String username = principal.getName();

        // get user from username
        User currentUser = userDao.getUserByUsername(username);
        System.out.println("User ID: " + username);

        // get userId from current user
        int userId = currentUser.getId();

        try{
            // populate list with characters based on username
            usersCharactersList = characterDao.getAliveCharactersByUsername(username);
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }

        return usersCharactersList;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/characters/dead", method = RequestMethod.GET)
    public List<Character>deadCharacterList(Principal principal){

        // create list to hold characters
        List<Character> usersDeadCharactersList = new ArrayList<>();

        // get username from principal
        String username = principal.getName();

        // get user from username
        User currentUser = userDao.getUserByUsername(username);
        System.out.println("Username: " + username);

        // get userId from current user
        int userId = currentUser.getId();

        try{
            // populate list with characters based on username
            usersDeadCharactersList = characterDao.getDeadCharactersByUsername(username);
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Dead characters could not be found");
        }

        return usersDeadCharactersList;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/all-characters/dead", method = RequestMethod.GET)
    @PreAuthorize("isAuthenticated()")
    public List<Character>allDeadCharactersList(){

        // create list to hold characters
        List<Character> deadCharactersList = new ArrayList<>();

        try{
            // populate list with characters based on username
            deadCharactersList = characterDao.getTopDeadCharacters();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Dead characters could not be found");
        }

        return deadCharactersList;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/characters", method = RequestMethod.GET)
    public List<CharacterDTO> getAliveCharacterList(Principal principal){

        List<CharacterDTO> rosterData = new ArrayList<>();


        // create list to hold characters
        List<Character> usersAliveCharactersList = new ArrayList<>();

        // get username from principal
        String username = principal.getName();

        // get user from username
        User currentUser = userDao.getUserByUsername(username);
        System.out.println("User ID: " + username);

        // get userId from current user
        int userId = currentUser.getId();

        try{
            // populate list with characters based on username
            usersAliveCharactersList = characterDao.getAliveCharactersByUsername(username);
            for(Character character : usersAliveCharactersList)
            {
                CharacterDTO characterDTO = new CharacterDTO();
                characterDTO.setCharacterData(character);
                characterDTO.setWeaponData(weaponDao.getWeaponById(character.getWeapon_id()));
                characterDTO.setArmorData(armorDao.getArmorById(character.getArmor_id()));
                rosterData.add(characterDTO);
            }
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }

        return rosterData;
    }
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/all-characters/alive", method = RequestMethod.GET)
    public List<Character> getAllAliveCharacterList(){

        // create list to hold characters
        List<Character> allAliveCharactersList = new ArrayList<>();


        try{
            // populate list with characters based on username
            allAliveCharactersList = characterDao.getTopAliveCharacters();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }

        return allAliveCharactersList;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/leaderboard", method = RequestMethod.GET)
    public List<Character> getLeaderboard() {
        List<Character> getTopAliveList = new ArrayList<>();

        try {
            getTopAliveList = characterDao.getAllAliveCharacters();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Leaderboard could not be retrieved");
        }

        return getTopAliveList;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/fallen-heroes", method = RequestMethod.GET)
    @PreAuthorize(("isAuthenticated()"))
    public List<Character> getFallenHeroes() {
        List<Character> getTopDeadList = new ArrayList<>();

        try {
            getTopDeadList = characterDao.getAllDeadCharacters();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Leaderboard could not be retrieved");
        }

        return getTopDeadList;
    }


    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/characters/{id}", method = RequestMethod.GET)
    public Character getCharacterById(@PathVariable int id) {
        Character character = characterDao.getCharacterByCharacterId(id);
        if( character == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Character could not be found");
        }
        else {
            return character;
        }
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path="/characters", method = RequestMethod.POST)
    public Character createCharacter(@RequestBody Character character , Principal principal){

        // get the current user using userDao and principal
        User curentUser = userDao.getUserByUsername(principal.getName());

        // create new character object
        Character newCharacter = new Character();

        // get current user id
        int currentUserId = curentUser.getId();

        // set is character created to false
        boolean isCharacterCreated = false;

        // get the size of the list of alive characters using the principal and the characterDao
        int currentAliveCharacters = (characterDao.getAliveCharactersByUsername(principal.getName())).size();

        // if current user has less than 5 characters
        if(currentAliveCharacters < 5){

            System.out.println("\n Creating new character...");
            // set user id of the new character
            character.setUserId(currentUserId);
            character.setMax_health(character.getConstitution_integer()*10);
            // create new character
            newCharacter = characterDao.createCharacter(character);
            // set is character created flag to true
            isCharacterCreated = true;
        }
        // do not create character
        else {
            System.out.println("\n Can only have up to 5 living characters - character not created");
            isCharacterCreated = false;
        }

        return newCharacter;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(path = "/characters/{id}", method = RequestMethod.DELETE)
    public String deleteCharacterById(@PathVariable int id) {

        String whatHappenedInHere = "Error";
        int rowsAffected = 0;

        Character character = characterDao.getCharacterByCharacterId(id);

        if (character.getNumber_of_battles() > 0)
        {
            character.setAlive(false);
            character.setMonsterKilledBy("Sent to Shadow Realm");
            characterDao.updateCharacter(character);
            whatHappenedInHere = "Character Sent to Shadow Realm";
        }
        else
        {
            rowsAffected = characterDao.deleteCharacterByCharacterId(character.getCharacterId());
        }

        if(rowsAffected > 0)
        {
            whatHappenedInHere = "Character Deleted";
        }

        return whatHappenedInHere;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @RequestMapping(path = "/characters", method = RequestMethod.PUT)
    public Character updateCharacter(@RequestBody Character character){

        Character updatedCharacter = new Character();

        updatedCharacter = characterDao.updateCharacter(character);

        return updatedCharacter;
    }





}
