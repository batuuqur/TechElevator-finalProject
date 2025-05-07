package com.techelevator.model;

public class AdminMonsterPicksDTO {

    private int t1PickSlot1;
    private int t1PickSlot2;
    private int t1PickSlot3;
    private int t2PickSlot1;
    private int t2PickSlot2;
    private int t2PickSlot3;
    private int t3PickSlot1;
    private int t3PickSlot2;
    private int t3PickSlot3;
    private int t4PickSlot1;
    private int t4PickSlot2;
    private int t4PickSlot3;

    public int getT1PickSlot1() {
        return t1PickSlot1;
    }

    public void setT1PickSlot1(int t1PickSlot1) {
        this.t1PickSlot1 = t1PickSlot1;
    }

    public int getT1PickSlot2() {
        return t1PickSlot2;
    }

    public void setT1PickSlot2(int t1PickSlot2) {
        this.t1PickSlot2 = t1PickSlot2;
    }

    public int getT1PickSlot3() {
        return t1PickSlot3;
    }

    public void setT1PickSlot3(int t1PickSlot3) {
        this.t1PickSlot3 = t1PickSlot3;
    }

    public int getT2PickSlot1() {
        return t2PickSlot1;
    }

    public void setT2PickSlot1(int t2PickSlot1) {
        this.t2PickSlot1 = t2PickSlot1;
    }

    public int getT2PickSlot2() {
        return t2PickSlot2;
    }

    public void setT2PickSlot2(int t2PickSlot2) {
        this.t2PickSlot2 = t2PickSlot2;
    }

    public int getT2PickSlot3() {
        return t2PickSlot3;
    }

    public void setT2PickSlot3(int t2PickSlot3) {
        this.t2PickSlot3 = t2PickSlot3;
    }

    public int getT3PickSlot1() {
        return t3PickSlot1;
    }

    public void setT3PickSlot1(int t3PickSlot1) {
        this.t3PickSlot1 = t3PickSlot1;
    }

    public int getT3PickSlot2() {
        return t3PickSlot2;
    }

    public void setT3PickSlot2(int t3PickSlot2) {
        this.t3PickSlot2 = t3PickSlot2;
    }

    public int getT3PickSlot3() {
        return t3PickSlot3;
    }

    public void setT3PickSlot3(int t3PickSlot3) {
        this.t3PickSlot3 = t3PickSlot3;
    }

    public int getT4PickSlot1() {
        return t4PickSlot1;
    }

    public void setT4PickSlot1(int t4PickSlot1) {
        this.t4PickSlot1 = t4PickSlot1;
    }

    public int getT4PickSlot2() {
        return t4PickSlot2;
    }

    public void setT4PickSlot2(int t4PickSlot2) {
        this.t4PickSlot2 = t4PickSlot2;
    }

    public int getT4PickSlot3() {
        return t4PickSlot3;
    }

    public void setT4PickSlot3(int t4PickSlot3) {
        this.t4PickSlot3 = t4PickSlot3;
    }

    @Override
    public String toString()
    {
        String returnString = "";
        returnString += getT1PickSlot1()+" ";
        returnString += getT1PickSlot2()+" ";
        returnString += getT1PickSlot3()+" ";
        returnString += getT2PickSlot1()+" ";
        returnString += getT2PickSlot2()+" ";
        returnString += getT2PickSlot3()+" ";
        returnString += getT3PickSlot1()+" ";
        returnString += getT3PickSlot2()+" ";
        returnString += getT3PickSlot3()+" ";
        returnString += getT4PickSlot1()+" ";
        returnString += getT4PickSlot2()+" ";
        returnString += getT4PickSlot3()+" ";
        return returnString;
    }

}
