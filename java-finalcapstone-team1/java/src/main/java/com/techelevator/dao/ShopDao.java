package com.techelevator.dao;

import com.techelevator.model.Shop;

import java.util.List;

public interface ShopDao {

    Shop getShopById(int shopId);
    List<Shop> getAllShops();

}
