package com.shawnsong.universityrank.service;

import com.shawnsong.universityrank.entity.*;
import com.shawnsong.universityrank.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by shawn on 2017/12/2.
 */
@Service
public class UniversityService {
    @Autowired
    private UniversityRepository universityRepository;

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

    public University findUniversityByGeohash(String geohash) {
        List<University> l = universityRepository.findByGeohash(geohash);
        return l.size() == 0 ? null : l.get(0);
    }

    public List<UniversityBrief> getUniversityOverallInfo(int[][] options) {
        List<University> l = universityRepository.findAll();
        List<UniversityBrief> res = new ArrayList<>(l.size());
        Map<String, List<Arrests>> arrestsMap = arrestsRepository.findAll().stream().collect(Collectors.groupingBy(Arrests::getUniversityName));
        Map<String, List<CriminalOffense>> criminalMap = criminalOffenseRepository.findAll().stream().collect(Collectors.groupingBy(CriminalOffense::getUniversityName));
        Map<String, List<HateCrimes>> hateMap = hateCrimesRepository.findAll().stream().collect(Collectors.groupingBy(HateCrimes::getUniversityName));
        Map<String, List<VawaOffenses>> vawaMap = vawaOffensesRepository.findAll().stream().collect(Collectors.groupingBy(VawaOffenses::getUniversityName));
        Map<String, List<FireStatistic>> fireMap = fireStatisticRepository.findAll().stream().collect(Collectors.groupingBy(FireStatistic::getUniversityName));
        for (University u : l) {
            UniversityBrief ui = new UniversityBrief();
            Float arrestSum = 0f, criminalSum = 0f, hateSum = 0f, vawaSum = 0f, fireSum = 0f;
            for (CriminalOffense c : criminalMap.getOrDefault(u.getName(), null)) {
                criminalSum += options[0][0] * (c.getMurder_manslaughter() + c.getNegligent_manslaughter());
                criminalSum += options[0][1] * c.getRobbery();
                criminalSum += options[0][2] * c.getMotor_vehicle_theft();
                criminalSum += options[0][3] * c.getBurglary();
                criminalSum += options[0][4] * c.getArson();
                criminalSum += options[0][5] * c.getAggravated_assault();
            }
            for (HateCrimes h : hateMap.getOrDefault(u.getName(), null)) {
                hateSum += options[1][0] * h.getMurder_manslaughter();
                hateSum += options[1][1] * h.getRobbery();
                hateSum += options[1][2] * h.getMotor_vehicle_theft();
                hateSum += options[1][3] * h.getBurglary();
                hateSum += options[1][4] * h.getArson();
                hateSum += options[1][5] * (h.getSimple_assault() + h.getAggravated_assault());
            }
            for (VawaOffenses v : vawaMap.getOrDefault(u.getName(), null)) {
                vawaSum += options[2][0] * v.getDomestic_violence();
                vawaSum += options[2][1] * v.getDating_violence();
                vawaSum += options[2][2] * v.getStaking();
            }
            for (Arrests a : arrestsMap.getOrDefault(u.getName(), null)) {
                arrestSum += options[3][0] * a.getWeapon_carrying_possessing();
                arrestSum += options[3][1] * a.getDrug_abuse_violation();
                arrestSum += options[3][2] * a.getLiquor_law_violation();
            }
            for (FireStatistic f : fireMap.getOrDefault(u.getName(), new ArrayList<>()))
                fireSum += f.getDeaths() + f.getInjuries() + f.getFires();
            ui.setId(u.getGeohash());
            ui.setName(u.getName());
            Float totalCrime = arrestSum + criminalSum + hateSum + vawaSum + fireSum;
            ui.setCrime(totalCrime);
            String rankStr = u.getRanking();
            int rank;
            if (rankStr.contains(">1")) rank = 1500;
            else if (rankStr.contains(">8")) rank = 900;
            else if (rankStr.contains("-8")) rank = 700;
            else if (rankStr.contains("-6")) rank = 550;
            else rank = Integer.parseInt(rankStr);
            ui.setFood(100f);
            // ui.setRank(u.getRanking());
            ui.setRank(rank + "");
            ui.setTotal(totalCrime * 0.1f + rank * 3);
            res.add(ui);
        }
        return res;
    }
}