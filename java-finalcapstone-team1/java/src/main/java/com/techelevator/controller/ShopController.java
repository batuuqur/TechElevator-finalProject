package com.techelevator.controller;

import com.techelevator.dao.ArmorDao;
import com.techelevator.dao.ShopDao;
import com.techelevator.dao.WeaponDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.CharacterCreationShopDTO;
import com.techelevator.model.Shop;
import com.techelevator.model.ShopDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class ShopController {

    private final WeaponDao weaponDao;
    private final ArmorDao armorDao;
    private ShopDao shopDao;

    public ShopController(ShopDao shopDao, WeaponDao weaponDao, ArmorDao armorDao){
        this.shopDao = shopDao;
        this.weaponDao = weaponDao;
        this.armorDao = armorDao;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/shops", method = RequestMethod.GET)
    public List<Shop> shopList(){
        List<Shop> shopList = new ArrayList<>();
        try
        {
            shopList = shopDao.getAllShops();
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }
        return shopList;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/shop", method = RequestMethod.GET)
    public List<ShopDTO> getShops(){
        List<ShopDTO> allShops = new ArrayList<>();
        Shop rogueShop = shopDao.getShopById(1);
        ShopDTO rogueShopData = new ShopDTO();
        Shop archerShop = shopDao.getShopById(2);
        ShopDTO archerShopData = new ShopDTO();
        Shop barbarianShop = shopDao.getShopById(3);
        ShopDTO barbarianShopData = new ShopDTO();

        try
        {
            rogueShopData.setShop(rogueShop);
            rogueShopData.setWeaponListData(weaponDao.getWeaponsByShopList(rogueShop));
            rogueShopData.setArmorListData(armorDao.getArmorByShopList(rogueShop));
            allShops.add(rogueShopData);

            archerShopData.setShop(archerShop);
            archerShopData.setWeaponListData(weaponDao.getWeaponsByShopList(archerShop));
            archerShopData.setArmorListData(armorDao.getArmorByShopList(archerShop));
            allShops.add(archerShopData);

            barbarianShopData.setShop(barbarianShop);
            barbarianShopData.setWeaponListData(weaponDao.getWeaponsByShopList(barbarianShop));
            barbarianShopData.setArmorListData(armorDao.getArmorByShopList(barbarianShop));
            allShops.add(barbarianShopData);
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }
        return allShops;
    }

    @RequestMapping(path = "/startingshop", method = RequestMethod.GET)
    public List<ShopDTO> getStartingShops(){
        List<ShopDTO> startingShops = new ArrayList<>();
        Shop rogueShop = shopDao.getShopById(4);
        ShopDTO rogueShopData = new ShopDTO();
        Shop archerShop = shopDao.getShopById(5);
        ShopDTO archerShopData = new ShopDTO();
        Shop barbarianShop = shopDao.getShopById(6);
        ShopDTO barbarianShopData = new ShopDTO();

        try
        {
            rogueShopData.setShop(rogueShop);
            rogueShopData.setWeaponListData(weaponDao.getWeaponsByShopList(rogueShop));
            rogueShopData.setArmorListData(armorDao.getArmorByShopList(rogueShop));
            startingShops.add(rogueShopData);

            archerShopData.setShop(archerShop);
            archerShopData.setWeaponListData(weaponDao.getWeaponsByShopList(archerShop));
            archerShopData.setArmorListData(armorDao.getArmorByShopList(archerShop));
            startingShops.add(archerShopData);

            barbarianShopData.setShop(barbarianShop);
            barbarianShopData.setWeaponListData(weaponDao.getWeaponsByShopList(barbarianShop));
            barbarianShopData.setArmorListData(armorDao.getArmorByShopList(barbarianShop));
            startingShops.add(barbarianShopData);
        }
        catch (DaoException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Transfers could not be found");
        }
        return startingShops;
    }
}
