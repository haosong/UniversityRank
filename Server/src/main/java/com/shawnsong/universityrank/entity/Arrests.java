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
public class Arrests {
    @Id
    @JsonIgnore
    private University name;
    @Id
    private String year;
    @Id
    private String type;

    private Integer weapon_carrying_possessing;
    private Integer drug_abuse_violation;
    private Integer liquor_law_violation;

    public Arrests() {

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

    public Integer getWeapon_carrying_possessing() {
        return weapon_carrying_possessing;
    }

    public void setWeapon_carrying_possessing(Integer weapon_carrying_possessing) {
        this.weapon_carrying_possessing = weapon_carrying_possessing;
    }

    public Integer getDrug_abuse_violation() {
        return drug_abuse_violation;
    }

    public void setDrug_abuse_violation(Integer drug_abuse_violation) {
        this.drug_abuse_violation = drug_abuse_violation;
    }

    public Integer getLiquor_law_violation() {
        return liquor_law_violation;
    }

    public void setLiquor_law_violation(Integer liquor_law_violation) {
        this.liquor_law_violation = liquor_law_violation;
    }
}
