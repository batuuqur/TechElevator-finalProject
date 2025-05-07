package com.techelevator.controller;
import com.techelevator.dao.ArmorDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Armor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/armors")
@PreAuthorize("isAuthenticated()")
public class ArmorController {

    private ArmorDao armorDao;

    public ArmorController(ArmorDao armorDao){
        this.armorDao = armorDao;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "", method = RequestMethod.GET)
    public List<Armor> allArmorsList(){

        // create list to hold characters
        List<Armor> allArmorsList = new ArrayList<>();

        try{
            // populate list with characters based on username
            allArmorsList = armorDao.getAllArmors();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Armors could not be found");
        }

        return allArmorsList;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Armor getArmorById(@PathVariable int id){

        Armor armor = armorDao.getArmorById(id);
        if( armor == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Armor could not be found");
        }
        else {
            return armor;
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/crude/{classString}", method = RequestMethod.GET)
    public List<Armor> getCrudeArmorsByClass(@PathVariable String classString) {
        List<Armor> crudeArmorForClass = new ArrayList<>();
        crudeArmorForClass = armorDao.getCrudeArmorsByClass(classString);
        if (crudeArmorForClass == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Weapon not found");
        }
        return crudeArmorForClass;
    }

}
