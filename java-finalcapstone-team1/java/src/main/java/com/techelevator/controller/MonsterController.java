package com.techelevator.controller;

import com.techelevator.dao.MonsterDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Character;
import com.techelevator.model.Monster;
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
public class MonsterController {

    private MonsterDao monsterDao;

    public MonsterController(MonsterDao monsterDao)
    {
        this.monsterDao = monsterDao;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/monsters", method = RequestMethod.GET)
    public List<Monster> monsterList(){
        List<Monster> monsterList = new ArrayList<>();
        try
        {
            monsterList = monsterDao.getAllMonsters();
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }
        return monsterList;
    }

//    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/monsters/{monsterId}", method = RequestMethod.GET)
    public Monster getMonsterByID(@PathVariable int monsterId){
        Monster monster = null;
        try
        {
            monster = monsterDao.getMonsterById(monsterId);
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }
        return monster;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/monsters/active", method = RequestMethod.GET)
    public List<Monster> activeMonsterList(){
        List<Monster> activeMonsterList = new ArrayList<>();
        try
        {
            activeMonsterList = monsterDao.getAllActiveMonsters();
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }
        return activeMonsterList;
    }
}
