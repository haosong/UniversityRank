package com.shawnsong.universityrank.entity;

import java.util.List;

public class CrimeEachYear {
    private String year;
    private List<CriminalOffense> crime;
    private List<HateCrimes> hate;
    private List<Arrests> arrests;
    private List<VawaOffenses> vawa;
    private List<FireStatistic> fire;

    public CrimeEachYear() {

    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<CriminalOffense> getCrime() {
        return crime;
    }

    public void setCrime(List<CriminalOffense> crime) {
        this.crime = crime;
    }

    public List<HateCrimes> getHate() {
        return hate;
    }

    public void setHate(List<HateCrimes> hate) {
        this.hate = hate;
    }

    public List<Arrests> getArrests() {
        return arrests;
    }

    public void setArrests(List<Arrests> arrests) {
        this.arrests = arrests;
    }

    public List<VawaOffenses> getVawa() {
        return vawa;
    }

    public void setVawa(List<VawaOffenses> vawa) {
        this.vawa = vawa;
    }

    public List<FireStatistic> getFire() {
        return fire;
    }

    public void setFire(List<FireStatistic> fire) {
        this.fire = fire;
    }
}
