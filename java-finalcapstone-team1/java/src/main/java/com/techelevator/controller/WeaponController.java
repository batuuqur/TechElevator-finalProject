package com.techelevator.controller;
import com.techelevator.dao.WeaponDao;
import com.techelevator.model.Weapon;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/weapons")
@PreAuthorize("isAuthenticated()")
public class WeaponController
{
    private final WeaponDao weaponDao;
    public WeaponController(WeaponDao weaponDao)
    {
        this.weaponDao = weaponDao;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<Weapon> getAllWeapons()
    {
        return weaponDao.getAllWeapons();
    }


    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Weapon getWeaponById(@PathVariable int id){

        Weapon weapon = weaponDao.getWeaponById(id);
        if (weapon == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Weapon not found");
        }
        return weapon;
    }


    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/crude/{classString}", method = RequestMethod.GET)
    public List<Weapon> getCrudeWeaponsByClass(@PathVariable String classString) {
        List<Weapon> crudeWeaponsForClass = new ArrayList<>();
        crudeWeaponsForClass = weaponDao.getCrudeWeaponsByClass(classString);
        if (crudeWeaponsForClass == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Weapon not found");
        }
        return crudeWeaponsForClass;
    }


}
