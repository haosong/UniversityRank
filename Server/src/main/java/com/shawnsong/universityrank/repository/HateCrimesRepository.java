package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.CrimeId;
import com.shawnsong.universityrank.entity.HateCrimes;
import com.shawnsong.universityrank.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by shawn on 2017/12/2.
 */
public interface HateCrimesRepository extends JpaRepository<HateCrimes, CrimeId> {
    List<HateCrimes> findAllByName(University name);
}
