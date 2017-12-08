package com.shawnsong.universityrank.entity;

/**
 * Created by shawn on 2017/11/27.
 */
public class UniversityDetail {
    private String name;
    private String address;
    private String city;
    private String state;
    private String zip;
    private Integer men_total;
    private Integer women_total;
    private Integer total;
    private Float men_ratio;
    private Float women_ratio;

    public UniversityDetail() {

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

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Integer getMen_total() {
        return men_total;
    }

    public void setMen_total(Integer men_total) {
        this.men_total = men_total;
    }

    public Integer getWomen_total() {
        return women_total;
    }

    public void setWomen_total(Integer women_total) {
        this.women_total = women_total;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Float getMen_ratio() {
        return men_ratio;
    }

    public void setMen_ratio(Float men_ratio) {
        this.men_ratio = men_ratio;
    }

    public Float getWomen_ratio() {
        return women_ratio;
    }

    public void setWomen_ratio(Float women_ratio) {
        this.women_ratio = women_ratio;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
