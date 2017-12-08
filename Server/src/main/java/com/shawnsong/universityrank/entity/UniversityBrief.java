package com.shawnsong.universityrank.entity;

/**
 * Created by shawn on 2017/11/27.
 */
public class UniversityBrief {
    // obj.add(jp.parseList("[{id: \"1\",name: \"Harvard University\",crime: 32,food: 20,rank: 97,total: 101}]").get(0));

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
