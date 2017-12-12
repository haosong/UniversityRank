package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.CrimeId;
import com.shawnsong.universityrank.entity.CriminalOffense;
import com.shawnsong.universityrank.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CriminalOffenseRepository extends JpaRepository<CriminalOffense, CrimeId> {
    List<CriminalOffense> findAllByName(University name);
}
