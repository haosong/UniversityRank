package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.CrimeId;
import com.shawnsong.universityrank.entity.University;
import com.shawnsong.universityrank.entity.VawaOffenses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VawaOffensesRepository extends JpaRepository<VawaOffenses, CrimeId> {
    public List<VawaOffenses> findAllByName(University name);

}
