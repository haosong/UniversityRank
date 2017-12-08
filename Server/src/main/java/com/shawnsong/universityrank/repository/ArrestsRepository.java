package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.Arrests;
import com.shawnsong.universityrank.entity.CrimeId;
import com.shawnsong.universityrank.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by shawn on 2017/12/2.
 */
public interface ArrestsRepository extends JpaRepository<Arrests, CrimeId> {
    public List<Arrests> findAllByName(University name);

}
