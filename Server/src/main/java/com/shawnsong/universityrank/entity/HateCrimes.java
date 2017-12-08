package com.shawnsong.universityrank.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

/**
 * Created by shawn on 2017/11/20.
 */
@Entity
@IdClass(CrimeId.class)
public class HateCrimes {
    @Id
    @JsonIgnore
    private University name;
    @Id
    private String year;
    @Id
    private String type;

    private Integer murder_manslaughter;
    private Integer robbery;
    private Integer aggravated_assault;
    private Integer burglary;
    private Integer motor_vehicle_theft;
    private Integer arson;
    private Integer simple_assault;

    public HateCrimes() {

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getMurder_manslaughter() {
        return murder_manslaughter;
    }

    public void setMurder_manslaughter(Integer murder_manslaughter) {
        this.murder_manslaughter = murder_manslaughter;
    }

    public Integer getRobbery() {
        return robbery;
    }

    public void setRobbery(Integer robbery) {
        this.robbery = robbery;
    }

    public Integer getAggravated_assault() {
        return aggravated_assault;
    }

    public void setAggravated_assault(Integer aggravated_assault) {
        this.aggravated_assault = aggravated_assault;
    }

    public Integer getBurglary() {
        return burglary;
    }

    public void setBurglary(Integer burglary) {
        this.burglary = burglary;
    }

    public Integer getMotor_vehicle_theft() {
        return motor_vehicle_theft;
    }

    public void setMotor_vehicle_theft(Integer motor_vehicle_theft) {
        this.motor_vehicle_theft = motor_vehicle_theft;
    }

    public Integer getArson() {
        return arson;
    }

    public void setArson(Integer arson) {
        this.arson = arson;
    }

    public Integer getSimple_assault() {
        return simple_assault;
    }

    public void setSimple_assault(Integer simple_assault) {
        this.simple_assault = simple_assault;
    }

}