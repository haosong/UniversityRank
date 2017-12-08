package com.shawnsong.universityrank.entity;

/**
 * Created by shawn on 2017/12/3.
 */
public class FoodDetail {
    private String name;
    private String address;
    private Integer reviewCount;
    private Float stars;

    public FoodDetail() {

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

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Float getStars() {
        return stars;
    }

    public void setStars(Float stars) {
        this.stars = stars;
    }
}
