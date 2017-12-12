package com.shawnsong.universityrank.entity;

import javax.persistence.CascadeType;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.io.Serializable;

@IdClass(FireStatisticId.class)
public class FireStatisticId implements Serializable {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name")
    private University name;
    private String year;
    private String facility;

    public int hashCode() {
        String res = name.getName() + ":" + year + ":" + facility;
        return res.hashCode();
    }

    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        final FireStatisticId objId = (FireStatisticId) obj;
        return objId.name.getName().equals(this.name.getName())
                && objId.year.equals(this.year)
                && objId.facility.equals(this.facility);
    }
}
