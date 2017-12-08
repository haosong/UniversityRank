package com.shawnsong.universityrank.entity;

import javax.persistence.*;

/**
 * Created by shawn on 2017/12/1.
 */
@Entity
@IdClass(UniversityYelpId.class)
public class UniversityYelp {
    // @EmbeddedId
    // private UniversityYelpId id;

    @Id
    private University name;

    @Id
    private YelpBusiness id;

    public UniversityYelp() {

    }

    public UniversityYelp(University name, YelpBusiness id) {
        // this.id = new UniversityYelpId(name, id);
        this.name = name;
        this.id = id;
    }

    public University getName() {
        return name;
    }

    public void setName(University name) {
        this.name = name;
    }

    public YelpBusiness getId() {
        return id;
    }

    public void setId(YelpBusiness id) {
        this.id = id;
    }

    //
    // public University getUniversity() {
    //     return id.getName();
    // }
    //
    // public String getName() {
    //     return id.getName().getName();
    // }
    //
    // public YelpBusiness getYelpBusiness() {
    //     return id.getId();
    // }
    //
    // public String getId() {
    //     return id.getId().getId();
    // }

}
