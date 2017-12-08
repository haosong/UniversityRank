package com.shawnsong.universityrank.entity;

import javax.persistence.*;

/**
 * Created by shawn on 2017/11/20.
 */
@Entity
// @IdClass(FireStatisticId.class)
public class FireStatistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name")
    private University name;
    //@Id
    private String year;
    //@Id
    private String facility;

    private Integer fires;
    private Integer injuries;
    private Integer deaths;
    private String cause;
    private String category;
    private String damage;

    public FireStatistic() {

    }

    public University getName() {
        return name;
    }

    public String getUniversityName() {
        return name.getName();
    }

    public void setName(University name) {
        this.name = name;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }

    public Integer getFires() {
        return fires;
    }

    public void setFires(Integer fires) {
        this.fires = fires;
    }

    public Integer getInjuries() {
        return injuries;
    }

    public void setInjuries(Integer injuries) {
        this.injuries = injuries;
    }

    public Integer getDeaths() {
        return deaths;
    }

    public void setDeaths(Integer deaths) {
        this.deaths = deaths;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDamage() {
        return damage;
    }

    public void setDamage(String damage) {
        this.damage = damage;
    }

}