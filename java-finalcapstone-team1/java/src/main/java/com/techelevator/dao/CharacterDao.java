package com.techelevator.dao;
import com.techelevator.model.Character;

import java.util.List;

public interface CharacterDao {
    Character getCharacterByCharacterId(int characterId);
    List<Character> getCharactersByUsername(String username);
    int deleteCharacterByCharacterId(int characterId);
    Character createCharacter(Character character);
    Character updateCharacter(Character character);
    List<Character> getAliveCharactersByUsername(String username);
    List<Character> getDeadCharactersByUsername(String username);
    List<Character> getAllAliveCharacters();
    List<Character> getTopAliveCharacters();
    List<Character> getTopDeadCharacters();
    List<Character> getAllDeadCharacters();
}
