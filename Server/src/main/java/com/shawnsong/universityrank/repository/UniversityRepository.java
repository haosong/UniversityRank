package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UniversityRepository extends JpaRepository<University, String> {
    public List<University> findByName(String name);

    public List<University> findByGeohash(String geohash);
}
