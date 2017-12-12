package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.CrimeId;
import com.shawnsong.universityrank.entity.HateCrimes;
import com.shawnsong.universityrank.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HateCrimesRepository extends JpaRepository<HateCrimes, CrimeId> {
    List<HateCrimes> findAllByName(University name);
}
