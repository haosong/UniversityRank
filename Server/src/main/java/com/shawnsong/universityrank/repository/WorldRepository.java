package com.shawnsong.universityrank.repository;

import com.shawnsong.universityrank.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by shawn on 2017/11/12.
 */
public interface WorldRepository extends JpaRepository<World, Integer> {
    public List<World> findBySize(Integer size);
}
