package com.shawnsong.universityrank.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(CrimeId.class)
public class VawaOffenses {
    @Id
    @JsonIgnore
    private University name;
    @Id
    private String year;
    @Id
    private String type;

    private Integer domestic_violence;
    private Integer dating_violence;
    private Integer staking;

    public VawaOffenses() {

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

    public Integer getDomestic_violence() {
        return domestic_violence;
    }

    public void setDomestic_violence(Integer domestic_violence) {
        this.domestic_violence = domestic_violence;
    }

    public Integer getDating_violence() {
        return dating_violence;
    }

    public void setDating_violence(Integer dating_violence) {
        this.dating_violence = dating_violence;
    }

    public Integer getStaking() {
        return staking;
    }

    public void setStaking(Integer staking) {
        this.staking = staking;
    }
}
