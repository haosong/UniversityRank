package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.University;
import com.shawnsong.universityrank.entity.UniversityYelp;
import com.shawnsong.universityrank.entity.UniversityYelpId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by shawn on 2017/12/1.
 */
public interface UniversityYelpRepository extends JpaRepository<UniversityYelp, UniversityYelpId> {
    // @Query("select y from UniversityYelp y where y.name=:name")
    List<UniversityYelp> findAllByName(University name);
}
