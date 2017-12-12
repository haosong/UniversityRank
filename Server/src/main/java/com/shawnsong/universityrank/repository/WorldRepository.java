package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorldRepository extends JpaRepository<World, Integer> {
    public List<World> findBySize(Integer size);
}
