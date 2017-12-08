package com.shawnsong.universityrank.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by shawn on 2017/11/12.
 */

@Entity
@Table(name = "Test")
public class World {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private Integer size;

    public World() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
}
