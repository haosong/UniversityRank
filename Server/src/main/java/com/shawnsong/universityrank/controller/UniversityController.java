package com.shawnsong.universityrank.controller;

import com.shawnsong.universityrank.entity.*;
import com.shawnsong.universityrank.repository.*;
import com.shawnsong.universityrank.service.UniversityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class UniversityController {

    private static final Logger logger = LoggerFactory.getLogger(UniversityController.class);

    @Autowired
    private UniversityYelpRepository universityYelpRepository;

    @Autowired
    private CriminalOffenseRepository criminalOffenseRepository;

    @Autowired
    private HateCrimesRepository hateCrimesRepository;

    @Autowired
    private ArrestsRepository arrestsRepository;

    @Autowired
    private VawaOffensesRepository vawaOffensesRepository;

    @Autowired
    private FireStatisticRepository fireStatisticRepository;

    @Autowired
    private UniversityService universityService;

    @CrossOrigin
    @GetMapping(value = "/ranking/{geohash}")
    public UniversityRanking getRanking(@PathVariable("geohash") String geohash) {
        University u = universityService.findUniversityByGeohash(geohash);
        if (u == null) return null;
        UniversityRanking rank = new UniversityRanking();
        rank.setOverallScore(u.getOverall_score());
        rank.setResourceScore(u.getResources_score());
        rank.setEngagementScore(u.getEngagement_score());
        rank.setOutcomesScore(u.getOutcomes_score());
        rank.setEnvironmentScore(u.getEnvironment());
        rank.setTuitionFees(u.getTuition_fees());
        rank.setRoomAndBoard(u.getRoom_board());
        rank.setSalaryTenYears(u.getSalary_ten_years());
        return rank;
    }

    @CrossOrigin
    @GetMapping(value = "/university/{geohash}")
    public UniversityDetail getUniversityDetail(@PathVariable("geohash") String geohash) {
        University u = universityService.findUniversityByGeohash(geohash);
        if (u == null) return null;
        UniversityDetail universityDetail = new UniversityDetail();
        universityDetail.setAddress(u.getAddress());
        universityDetail.setCity(u.getCity());
        universityDetail.setName(u.getName());
        universityDetail.setMen_total(u.getMale_total());
        universityDetail.setWomen_total(u.getFemale_total());
        universityDetail.setTotal(u.getTotal());
        universityDetail.setMen_ratio(u.getMale_ratio());
        universityDetail.setWomen_ratio(u.getFemale_ratio());
        universityDetail.setZip(u.getZip());
        universityDetail.setState(u.getState());
        return universityDetail;
    }

    @CrossOrigin
    @GetMapping(value = "/food/{geohash}")
    public List<YelpBusiness> getFood(@PathVariable("geohash") String geohash) {
        University u = universityService.findUniversityByGeohash(geohash);
        if (u == null) return null;
        List<UniversityYelp> l = universityYelpRepository.findAllByName(u);
        if (l.size() == 0) return null;
        return l.stream().map(UniversityYelp::getId).collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping(value = "/crime/{geohash}")
    public Map<String, CrimeEachYear> getCrime(@PathVariable("geohash") String geohash) {
        University u = universityService.findUniversityByGeohash(geohash);
        if (u == null) return null;
        List<Arrests> arrestsList = arrestsRepository.findAllByName(u);
        List<CriminalOffense> criminalList = criminalOffenseRepository.findAllByName(u);
        List<HateCrimes> hateList = hateCrimesRepository.findAllByName(u);
        List<VawaOffenses> vawaList = vawaOffensesRepository.findAllByName(u);
        List<FireStatistic> fireList = fireStatisticRepository.findAllByName(u);
        String[] years = new String[]{"2013", "2014", "2015"};
        Map<String, CrimeEachYear> ret = new HashMap<>();
        for (String year : years) {
            CrimeEachYear oneYear = new CrimeEachYear();
            oneYear.setArrests(arrestsList.stream().filter(a -> a.getYear().equals(year)).collect(Collectors.toList()));
            oneYear.setCrime(criminalList.stream().filter(a -> a.getYear().equals(year)).collect(Collectors.toList()));
            oneYear.setFire(fireList.stream().filter(a -> a.getYear().equals(year)).collect(Collectors.toList()));
            oneYear.setHate(hateList.stream().filter(a -> a.getYear().equals(year)).collect(Collectors.toList()));
            oneYear.setVawa(vawaList.stream().filter(a -> a.getYear().equals(year)).collect(Collectors.toList()));
            oneYear.setYear(year);
            ret.putIfAbsent(year, oneYear);
        }
        return ret;
    }

    @CrossOrigin
    @GetMapping(value = "/info")
    public List<UniversityBrief> getInfo() {
        int[][] options = new int[4][6];
        for (int i = 0; i < 4; i++) options[i] = new int[]{1, 1, 1, 1, 1, 1};
        return universityService.getUniversityOverallInfo(options, true);
    }

    @CrossOrigin
    @GetMapping(value = "/info/{option}")
    public List<UniversityBrief> getInfoWithOption(@PathVariable("option") String option) {
        int[][] weight = new int[4][6];
        for (int i = 0; i < 4; i++) weight[i] = new int[]{0, 0, 0, 0, 0, 0};
        for (String opt : option.split("__")) {
            int index = Integer.parseInt(opt.charAt(0) + "");
            if (opt.length() == 1) weight[index] = new int[]{1, 1, 1, 1, 1, 1};
            else for (String sub : opt.split("_")) weight[index][Integer.parseInt(sub.charAt(2) + "")] = 1;
        }
        return universityService.getUniversityOverallInfo(weight, false);
    }

}
