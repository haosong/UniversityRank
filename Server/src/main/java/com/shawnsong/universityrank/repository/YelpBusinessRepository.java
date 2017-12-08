package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.YelpBusiness;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by shawn on 2017/11/26.
 */
public interface YelpBusinessRepository extends JpaRepository<YelpBusiness, String> {
    List<YelpBusiness> findByIdIn(List<String> id);
}
