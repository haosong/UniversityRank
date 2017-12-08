package com.shawnsong.universityrank.controller;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.shawnsong.universityrank.entity.University;
import com.shawnsong.universityrank.entity.UniversityYelp;
import com.shawnsong.universityrank.entity.YelpBusiness;
import com.shawnsong.universityrank.repository.UniversityRepository;
import com.shawnsong.universityrank.repository.UniversityYelpRepository;
import com.shawnsong.universityrank.repository.YelpBusinessRepository;
import de.alpharogroup.jgeohash.GeoHashExtensions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by shawn on 2017/12/2.
 */
@RestController
public class DataController {

    private static final Logger logger = LoggerFactory.getLogger(UniversityController.class);

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private YelpBusinessRepository yelpBusinessRepository;

    @Autowired
    private UniversityYelpRepository universityYelpRepository;

    @CrossOrigin
    @GetMapping(value = "/GenerateUniversityWithYelp")
    public String generateUniversityWithYelp() {
        int precision = 6;
        List<University> uList = universityRepository.findAll();
        List<YelpBusiness> yList = yelpBusinessRepository.findAll();
        Map<String, List<YelpBusiness>> roughYelp = yList.stream().collect(Collectors.groupingBy(y -> y.getGeohash(precision)));
        List<UniversityYelp> ans = new ArrayList<>();
        int index = 0;
        int size = uList.size();
        for (University u : uList) {
            String curGeo = u.getGeohash(precision);
            List<String> universityAdjacentAreasList = GeoHashExtensions.getAllAdjacentAreasList(curGeo);
            List<YelpBusiness> nearByYelp = new ArrayList<>();
            for (String geo : universityAdjacentAreasList) {
                if (roughYelp.containsKey(geo)) nearByYelp.addAll(roughYelp.get(geo));
            }
            logger.info(++index + "/" + size + ": " + nearByYelp.size() + " yelp near " + u.getName());
            for (YelpBusiness y : nearByYelp) {
                UniversityYelp relation = new UniversityYelp(u, y);
                ans.add(relation);
            }
        }
        universityYelpRepository.save(ans);
        return ans.size() + "";
    }

    @GetMapping(value = {"/InsertAllUniversity"})
    public String insertAllUniversity() {
        Set<String> set = new HashSet<>();
        try {
            BufferedReader br;
            br = new BufferedReader(new FileReader("C:\\Users\\shawn\\Desktop\\UniversityRank\\Server\\src\\main\\java\\com\\shawnsong\\universityrank\\controller\\university.csv"));
            String line;
            while ((line = br.readLine()) != null) set.add(line);
            for (String s : set) {
                University u = new University(s);
                universityRepository.save(u);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    @GetMapping(value = {"/GenerateGeoHash"})
    public String generateGeoHash() {
        // List<University> l = universityRepository.findAll();
        List<YelpBusiness> l = yelpBusinessRepository.findAll();
        int index = 1;
        int size = l.size();
        for (YelpBusiness u : l) {
            if (u.getGeohash() == null && u.getLatitude() != null) {
                String geohash = GeoHashExtensions.encode(u.getLatitude(), u.getLongitude());
                u.setGeohash(geohash);
                yelpBusinessRepository.save(u);
                logger.info(index++ + "/" + size + ": GeoHash for " + u.getName() + " : " + geohash);
            }
        }
        // for (University u : l) {
        //     if (u.getGeohash() == null && u.getLat() != null) {
        //         String geohash = GeoHashExtensions.encode(u.getLat(), u.getLng());
        //         u.setGeohash(geohash);
        //         universityRepository.save(u);
        //         logger.info("GeoHash for " + u.getName() + " : " + geohash);
        //         // double[] decoded = GeoHashExtensions.decode(geohash);
        //         // Map<String, String> adjacentAreasMap = GeoHashExtensions.getAllAdjacentAreasMap(geohash);
        //         // List<String> adjacentAreasList = GeoHashExtensions.getAllAdjacentAreasList(geohash);
        //     }
        // }
        return "";
    }

    @GetMapping(value = {"/InsertUniversityLatLon"})
    public String insertUniversityLatLon() {
        /*
        List<University> l = universityRepository.findAll();
        String apiKey_1 = "AIzaSyAFQD1NoAz6moZgomYjIFh0Fu7qxZZ5K_Q";
        String apiKey_2 = "AIzaSyA1fV_QEsutP58Yb-IfD_2vQXP16pgOgO0";
        int index = 0;
        int all = l.size();
        for (University u : l) {
            if (u.getLat() != null) continue;
            String apiKey = (index++ % 2 == 0) ? apiKey_1 : apiKey_2;
            GeoApiContext context = new GeoApiContext.Builder().apiKey(apiKey).build();
            try {
                GeocodingResult[] results = GeocodingApi.geocode(context, u.getName()).await();
                if (results.length > 0) {
                    LatLng latLng = results[0].geometry.location;
                    u.setLat(latLng.lat);
                    u.setLng(latLng.lng);
                    u.setGeohash(GeoHashExtensions.encode(latLng.lat, latLng.lng));
                    universityRepository.save(u);
                    logger.info(index + "/" + all + ": " + u.getName() + " : " + u.getLat() + ", " + u.getLng());
                } else {
                    throw new InterruptedException();
                }
            } catch (ApiException | InterruptedException | IOException e) {
                logger.info(index + "/" + all + ": Get GPS Of " + u.getName() + " Failed!");
            }
        }
        */
        return "";
    }
}
