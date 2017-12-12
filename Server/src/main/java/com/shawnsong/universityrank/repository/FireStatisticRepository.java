package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.FireStatistic;
import com.shawnsong.universityrank.entity.FireStatisticId;
import com.shawnsong.universityrank.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FireStatisticRepository extends JpaRepository<FireStatistic, FireStatisticId> {
    public List<FireStatistic> findAllByName(University name);

}
