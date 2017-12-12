package com.shawnsong.universityrank.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class YelpBusiness {
    @Id
    private String id;

    private String name;
    private String neighborhood;
    private String address;
    private String city;
    private String state;
    private String postal_code;
    private Float latitude;
    private Float longitude;
    private Float stars;
    private Integer review_count;
    private Integer is_open;
    private String geohash;

    public YelpBusiness() {

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

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
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

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Float getStars() {
        return stars;
    }

    public void setStars(Float stars) {
        this.stars = stars;
    }

    public Integer getReview_count() {
        return review_count;
    }

    public void setReview_count(Integer review_count) {
        this.review_count = review_count;
    }

    public Integer getIs_open() {
        return is_open;
    }

    public void setIs_open(Integer is_open) {
        this.is_open = is_open;
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
