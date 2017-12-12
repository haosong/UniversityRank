package com.shawnsong.universityrank.entity;

import javax.persistence.*;
import java.io.Serializable;

@IdClass(CrimeId.class)
public class CrimeId implements Serializable {
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name")
    private University name;
    private String year;
    private String type;

    public University getName() {
        return name;
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

    public int hashCode() {
        String res = name.getName() + ":" + year + ":" + type;
        return res.hashCode();
    }

    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        final CrimeId objId = (CrimeId) obj;
        return objId.name.getName().equals(this.name.getName())
                && objId.year.equals(this.year)
                && objId.type.equals(this.type);
    }
}
