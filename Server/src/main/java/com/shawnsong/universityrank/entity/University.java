package com.shawnsong.universityrank.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by shawn on 2017/11/20.
 */
@Entity
public class University {
    @Id
    private String name;

    private String address;
    private String city;
    private String state;
    private String zip;
    private Integer male_total;
    private Integer female_total;
    private Integer total;
    private Float male_ratio;
    private Float female_ratio;
    private String ranking;
    private String overall_score;
    private String resources_score;
    private String engagement_score;
    private String outcomes_score;
    private String environment;
    private String tuition_fees;
    private String room_board;
    private String salary_ten_years;
    private String geohash;

    public University() {

    }

    public University(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Integer getMale_total() {
        return male_total;
    }

    public void setMale_total(Integer male_total) {
        this.male_total = male_total;
    }

    public Integer getFemale_total() {
        return female_total;
    }

    public void setFemale_total(Integer female_total) {
        this.female_total = female_total;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Float getMale_ratio() {
        return male_ratio;
    }

    public void setMale_ratio(Float male_ratio) {
        this.male_ratio = male_ratio;
    }

    public Float getFemale_ratio() {
        return female_ratio;
    }

    public void setFemale_ratio(Float female_ratio) {
        this.female_ratio = female_ratio;
    }

    public String getRanking() {
        return ranking;
    }

    public void setRanking(String ranking) {
        this.ranking = ranking;
    }

    public String getOverall_score() {
        return overall_score;
    }

    public void setOverall_score(String overall_score) {
        this.overall_score = overall_score;
    }

    public String getResources_score() {
        return resources_score;
    }

    public void setResources_score(String resources_score) {
        this.resources_score = resources_score;
    }

    public String getEngagement_score() {
        return engagement_score;
    }

    public void setEngagement_score(String engagement_score) {
        this.engagement_score = engagement_score;
    }

    public String getOutcomes_score() {
        return outcomes_score;
    }

    public void setOutcomes_score(String outcomes_score) {
        this.outcomes_score = outcomes_score;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getTuition_fees() {
        return tuition_fees;
    }

    public void setTuition_fees(String tuition_fees) {
        this.tuition_fees = tuition_fees;
    }

    public String getRoom_board() {
        return room_board;
    }

    public void setRoom_board(String room_board) {
        this.room_board = room_board;
    }

    public String getSalary_ten_years() {
        return salary_ten_years;
    }

    public void setSalary_ten_years(String salary_ten_years) {
        this.salary_ten_years = salary_ten_years;
    }

    public String getGeohash() {
        return geohash;
    }

    public String getGeohash(int precision) {
        return geohash.substring(0, precision);
    }

    public void setGeohash(String geohash) {
        this.geohash = geohash;
    }
}
