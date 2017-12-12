package com.shawnsong.universityrank.entity;

public class UniversityBrief {
    private String id; // geohash
    private String name;
    private Float crime;
    private Float food;
    private String rank;
    private Float total;

    public UniversityBrief() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getCrime() {
        return crime;
    }

    public void setCrime(Float crime) {
        this.crime = crime;
    }

    public Float getFood() {
        return food;
    }

    public void setFood(Float food) {
        this.food = food;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

}
