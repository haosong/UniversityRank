package com.shawnsong.universityrank.controller;

import com.shawnsong.universityrank.entity.World;
import com.shawnsong.universityrank.repository.WorldRepository;
import com.shawnsong.universityrank.service.WorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class WorldController {

    @Autowired
    private WorldRepository worldRepository;

    @Autowired
    private WorldService worldService;

    @GetMapping(value = "/worlds")
    public List<World> worldList() {
        return worldRepository.findAll();
    }

    @GetMapping(value = "/worlds/{para}")
    public String worldListWithParam(@PathVariable("para") String para) {
        String[] param = para.split(",");
        String ret = "";
        for (String p : param) {
            ret += "<h2>" + p + "</h2>";
        }
        return ret;
    }

    @PostMapping(value = "/worlds")
    public World addWorld(@RequestParam("name") String name,
                          @RequestParam("size") Integer size) {
        World world = new World();
        world.setName(name);
        world.setSize(size);
        return worldRepository.save(world);
    }

    @GetMapping(value = "/worlds/{id}")
    public World findOneWorld(@PathVariable("id") Integer id) {
        return worldRepository.findOne(id);
    }

    @PutMapping(value = "/worlds/{id}")
    public World updateOneWorld(@PathVariable("id") Integer id,
                                @RequestParam("name") String name,
                                @RequestParam("size") Integer size) {
        World world = new World();
        world.setId(id);
        world.setSize(size);
        world.setName(name);
        return worldRepository.save(world);
    }

    @DeleteMapping(value = "/worlds/{id}")
    public void deleteOneWorld(@PathVariable("id") Integer id) {
        worldRepository.delete(id);
    }

    @GetMapping(value = "/worlds/size")
    public List<World> worldListBySize(@PathVariable("size") Integer size) {
        return worldRepository.findBySize(size);
    }

    @PostMapping(value = "/worlds/two")
    public void worldTwo() {
        worldService.insertTwoWorlds();
    }
}
