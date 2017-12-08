package com.shawnsong.universityrank.entity;

import javax.persistence.CascadeType;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * Created by shawn on 2017/12/1.
 */
@IdClass(UniversityYelpId.class)
public class UniversityYelpId implements Serializable {
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name")
    private University name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private YelpBusiness id;

    public UniversityYelpId() {

    }

    public UniversityYelpId(University name, YelpBusiness id) {
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

    public int hashCode() {
        String res = name.getName() + ":" + id.getId();
        return res.hashCode();
    }

    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        final UniversityYelpId objId = (UniversityYelpId) obj;
        return objId.name.getName().equals(this.name.getName())
                && objId.id.getId().equals(this.id.getId());
    }
}
