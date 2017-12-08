package com.shawnsong.universityrank.controller;

import com.shawnsong.universityrank.entity.CriminalOffense;
import com.shawnsong.universityrank.entity.University;
import com.shawnsong.universityrank.repository.CriminalOffenseRepository;
import com.shawnsong.universityrank.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shawn on 2017/11/21.
 */
@RestController
public class CriminalOffenseController {
    @Autowired
    private CriminalOffenseRepository criminalOffenseRepository;

    @Autowired
    private UniversityRepository universityRepository;

    @CrossOrigin
    @GetMapping(value = "/addCriminalOffense")
    public CriminalOffense addCriminalOffense() {
        University u = universityRepository.findOne("Yale");
        if (u == null) u = new University("Yale");
        CriminalOffense c = new CriminalOffense();
        c.setName(u);
        c.setYear("2015");
        c.setType("Off_campus");
        c.setMurder_manslaughter(1);
        c.setNegligent_manslaughter(1);
        c.setArson(1);
        c.setMotor_vehicle_theft(1);
        c.setBurglary(1);
        c.setAggravated_assault(1);
        c.setRobbery(1);
        criminalOffenseRepository.save(c);
        return c;
    }
}
