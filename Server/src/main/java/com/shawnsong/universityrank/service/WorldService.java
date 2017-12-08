package com.shawnsong.universityrank.service;

import com.shawnsong.universityrank.entity.World;
import com.shawnsong.universityrank.repository.WorldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by shawn on 2017/11/12.
 */
@Service
public class WorldService {

    @Autowired
    private WorldRepository worldRepository;

    @Transactional
    public void insertTwoWorlds() {
        World worldA = new World();
        worldA.setName("WorldA");
        worldA.setSize(1000);
        worldRepository.save(worldA);

        World worldB = new World();
        worldB.setName("WorldB");
        worldB.setSize(2000);
        worldRepository.save(worldB);
    }
}
