package com.techelevator.model;

import jakarta.validation.constraints.Min;

public class Battle {

    private int battleId;

    @Min( value = 1, message = "The field 'characterId' is required.")
    private int characterId;

    @Min( value = 1, message = "The field 'characterId' is required.")
    private int monsterId;

    private boolean battleCompleted;

    public int getBattleId() {
        return battleId;
    }

    public void setBattleId(int battleId) {
        this.battleId = battleId;
    }

    public int getCharacterId() {
        return characterId;
    }

    public void setCharacterId(int characterId) {
        this.characterId = characterId;
    }

    public int getMonsterId() {
        return monsterId;
    }

    public void setMonsterId(int monsterId) {
        this.monsterId = monsterId;
    }

    public boolean isBattleCompleted() {
        return battleCompleted;
    }

    public void setBattleCompleted(boolean battleCompleted) {
        this.battleCompleted = battleCompleted;
    }

}
